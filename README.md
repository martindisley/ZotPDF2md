# ZotPDF2md

Zotero 7 plugin that converts selected PDF/image attachments to Markdown using the Mistral OCR API and exports `.md` files to a chosen directory.

## Features
- One-click OCR to Markdown for PDFs and images
- Batch processing with progress and cancel
- Page selection (all, first N, range, list)
- Filename templating with Better BibTeX citekey fallback
- Optional image extraction placeholders
- Local cache for repeated runs

## Requirements
- Zotero 7.x
- Mistral API key (`mistral-ocr-latest`)

## Install (XPI)
1. In Zotero: Tools -> Plugins
2. Gear icon -> Install Add-on From File...
3. Select `dist/ZotPDF2md-0.1.0.xpi`
4. Restart Zotero

## Install (Dev proxy)
1. Create a file in your Zotero profile extensions folder named `zotpdf2md@zotero.org`
2. File contents should be the absolute path to this repo, e.g.:
   `/Users/you/workspace/ZotPDF2md`
3. Restart Zotero

## Configure
Open Zotero Preferences -> ZotPDF2md:
- Set your Mistral API key
- Choose an export directory
- Adjust page selection and filename template as needed

## Usage
1. Select one or more PDF/image attachments
2. Right-click -> OCR to Markdown (Mistral)
3. Markdown files are written to the export directory

## Filename Template Variables
- `{attachmentBasename}`
- `{attachmentFilename}`
- `{itemTitle}`
- `{year}`
- `{citekey}` (Better BibTeX if available, else item key)
- `{itemKey}`
- `{attachmentKey}`

## Notes
- Pages are joined without page headers
- Export paths are validated before processing
- The API key is stored in Zotero preferences (not in this repo)

## Test Script (API)
There is a standalone script to test OCR directly:

```bash
MISTRAL_API_KEY=... python3 scripts/mistral_ocr.py "/path/to/file.pdf"
```

Optional pages:

```bash
MISTRAL_API_KEY=... python3 scripts/mistral_ocr.py "/path/to/file.pdf" --pages "[0,1,2]"
```
