#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: MISTRAL_API_KEY=... $0 /path/to/file.pdf [pages]" >&2
  echo "pages: optional JSON array, e.g. '[0,1,2]'" >&2
  exit 1
fi

if [[ -z "${MISTRAL_API_KEY:-}" ]]; then
  echo "MISTRAL_API_KEY env var is required" >&2
  exit 1
fi

FILE_PATH="$1"
PAGES_JSON="${2:-}"

if [[ ! -f "$FILE_PATH" ]]; then
  echo "File not found: $FILE_PATH" >&2
  exit 1
fi

FILENAME="$(basename "$FILE_PATH")"
MIME_TYPE="application/pdf"

case "$FILE_PATH" in
  *.png) MIME_TYPE="image/png" ;;
  *.jpg|*.jpeg) MIME_TYPE="image/jpeg" ;;
  *.tif|*.tiff) MIME_TYPE="image/tiff" ;;
  *.webp) MIME_TYPE="image/webp" ;;
esac

upload_response=$(curl -sS -X POST "https://api.mistral.ai/v1/files" \
  -H "Authorization: Bearer $MISTRAL_API_KEY" \
  -F "file=@${FILE_PATH};type=${MIME_TYPE};filename=${FILENAME}")

file_id=$(python3 - <<'PY'
import json,sys
data=json.loads(sys.stdin.read())
print(data.get("id", ""))
PY
<<< "$upload_response")

if [[ -z "$file_id" ]]; then
  echo "Failed to upload file. Response:" >&2
  echo "$upload_response" >&2
  exit 1
fi

payload=$(python3 - <<'PY'
import json,sys
file_id=sys.argv[1]
pages_json=sys.argv[2]
payload={
  "model": "mistral-ocr-latest",
  "document": {"type":"file","file_id":file_id}
}
if pages_json:
  try:
    payload["pages"]=json.loads(pages_json)
  except Exception:
    print("Invalid pages JSON", file=sys.stderr)
    sys.exit(2)
print(json.dumps(payload))
PY
"$file_id" "$PAGES_JSON")

ocr_response=$(curl -sS -X POST "https://api.mistral.ai/v1/ocr" \
  -H "Authorization: Bearer $MISTRAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$payload")

echo "$ocr_response"
