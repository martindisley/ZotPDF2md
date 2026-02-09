#!/usr/bin/env python3
import argparse
import json
import mimetypes
import os
import sys
import uuid
import urllib.request
import urllib.error


API_BASE = "https://api.mistral.ai/v1"


def build_multipart(file_path, filename, mime_type, boundary):
    with open(file_path, "rb") as f:
        file_bytes = f.read()

    lines = []
    lines.append(f"--{boundary}\r\n")
    lines.append('Content-Disposition: form-data; name="purpose"\r\n\r\n')
    lines.append("ocr\r\n")
    lines.append(f"--{boundary}\r\n")
    lines.append(
        f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'
    )
    lines.append(f"Content-Type: {mime_type}\r\n\r\n")
    body_start = "".join(lines).encode("utf-8")
    body_end = f"\r\n--{boundary}--\r\n".encode("utf-8")
    return body_start + file_bytes + body_end


def http_post(url, headers, body):
    req = urllib.request.Request(url, method="POST", headers=headers, data=body)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")


def upload_file(file_path, api_key):
    filename = os.path.basename(file_path)
    mime_type = mimetypes.guess_type(filename)[0] or "application/pdf"
    boundary = uuid.uuid4().hex
    body = build_multipart(file_path, filename, mime_type, boundary)

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": f"multipart/form-data; boundary={boundary}",
    }
    status, text = http_post(f"{API_BASE}/files", headers, body)
    if status < 200 or status >= 300:
        raise RuntimeError(f"File upload failed: HTTP {status} {text}")

    data = json.loads(text)
    file_id = data.get("id")
    if not file_id:
        raise RuntimeError("File upload response missing file id")
    return file_id


def ocr_file(file_id, api_key, pages):
    payload = {
        "model": "mistral-ocr-latest",
        "document": {"type": "file", "file_id": file_id},
    }
    if pages is not None:
        payload["pages"] = pages

    body = json.dumps(payload).encode("utf-8")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    status, text = http_post(f"{API_BASE}/ocr", headers, body)
    if status < 200 or status >= 300:
        raise RuntimeError(f"OCR failed: HTTP {status} {text}")
    return json.loads(text)


def combine_markdown(pages):
    parts = []
    for page in pages:
        index = page.get("index", 0)
        markdown = page.get("markdown", "")
        parts.append(f"## Page {index + 1}\n\n{markdown}")
    return "\n\n---\n\n".join(parts)


def parse_pages(pages_json):
    if pages_json is None:
        return None
    return json.loads(pages_json)


def main():
    parser = argparse.ArgumentParser(description="Mistral OCR to combined markdown")
    parser.add_argument("pdf", help="Path to PDF file")
    parser.add_argument("--pages", help="JSON array of 0-indexed pages (e.g. '[0,1,2]')")
    args = parser.parse_args()

    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        print("MISTRAL_API_KEY env var is required", file=sys.stderr)
        return 1

    file_path = args.pdf
    if not os.path.isfile(file_path):
        print(f"File not found: {file_path}", file=sys.stderr)
        return 1

    pages = parse_pages(args.pages)
    file_id = upload_file(file_path, api_key)
    result = ocr_file(file_id, api_key, pages)
    markdown = combine_markdown(result.get("pages", []))
    sys.stdout.write(markdown)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
