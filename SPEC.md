# ZotPDF2md - Complete Implementation Specification

Build a Zotero 7 plugin that converts PDF and image attachments to Markdown using the Mistral AI OCR API. This specification provides all details needed to implement the plugin from scratch.

## Overview

**Plugin Name:** ZotPDF2md  
**Platform:** Zotero 7.x (strict version requirement: 7.0 to 7.*)  
**Extension ID:** `zotpdf2md@zotero.org`  
**Purpose:** One-click OCR conversion of PDF/image attachments to Markdown files using Mistral's OCR API

## Project Structure

```
ZotPDF2md/
├── manifest.json              # Zotero plugin manifest
├── bootstrap.js               # Plugin lifecycle (install/startup/shutdown/uninstall)
├── prefs.js                   # Default preference values
├── preferences.js             # Preferences pane controller logic
├── preferences.xhtml          # Preferences UI (XUL/XHTML)
└── content/
    ├── pdf2markdown.js        # Main plugin orchestrator
    ├── mistralClient.js       # Mistral API client with retry logic
    ├── cache.js               # LRU cache for OCR results
    ├── pagesParser.js         # Page selection configuration parser
    ├── fileUtils.js           # File system utilities (SHA256, path handling)
    ├── templating.js          # Filename and metadata templating
    └── progressManager.js     # Progress window UI wrapper
```

## File Specifications

### 1. manifest.json

```json
{
  "manifest_version": 2,
  "name": "ZotPDF2md",
  "version": "0.1.0",
  "description": "Convert PDF/image attachments to Markdown using Mistral OCR",
  "background": {
    "scripts": ["bootstrap.js"]
  },
  "applications": {
    "zotero": {
      "id": "zotpdf2md@zotero.org",
      "update_url": "https://example.com/updates.json",
      "strict_min_version": "7.0",
      "strict_max_version": "7.*"
    }
  }
}
```

### 2. bootstrap.js

Implements Zotero plugin lifecycle hooks:

- `install()`: Log installation
- `startup({ id, version, rootURI })`: 
  - Register preference pane via `Zotero.PreferencePanes.register()`
  - Load main module via `Services.scriptloader.loadSubScript()`
  - Call `ZotPDF2md.init()` and `ZotPDF2md.addToAllWindows()`
- `onMainWindowLoad({ window })`: Call `ZotPDF2md.addToWindow(window)`
- `onMainWindowUnload({ window })`: Call `ZotPDF2md.removeFromWindow(window)`
- `shutdown()`: Call cleanup methods, unset global
- `uninstall()`: Log uninstallation

### 3. prefs.js

Default preferences using `pref()` function:

| Preference Key | Default Value | Type |
|----------------|---------------|------|
| `extensions.zotpdf2md.mistral.apiKey` | `""` | string |
| `extensions.zotpdf2md.ocr.model` | `"mistral-ocr-latest"` | string |
| `extensions.zotpdf2md.ocr.pagesMode` | `"all"` | string (all/firstN/range/list) |
| `extensions.zotpdf2md.ocr.firstN` | `2` | integer |
| `extensions.zotpdf2md.ocr.rangeStart` | `0` | integer |
| `extensions.zotpdf2md.ocr.rangeEnd` | `0` | integer |
| `extensions.zotpdf2md.ocr.list` | `""` | string |
| `extensions.zotpdf2md.ocr.extractImages` | `false` | boolean |
| `extensions.zotpdf2md.output.exportDir` | `""` | string |
| `extensions.zotpdf2md.output.fileNameTemplate` | `"{citekey}_{attachmentBasename}.md"` | string |
| `extensions.zotpdf2md.note.template` | (see below) | string |
| `extensions.zotpdf2md.cache.enabled` | `true` | boolean |
| `extensions.zotpdf2md.cache.maxEntries` | `200` | integer |
| `extensions.zotpdf2md.cache.data` | `"{\"entries\":{}}"` | string (JSON) |
| `extensions.zotpdf2md.debug.enabled` | `false` | boolean |

**Default note template:**
```
# {itemTitle}

* Zotero item: {itemKey}
* Attachment: {attachmentFilename}
* Created: {timestamp}
* Model: {model}
* Pages: {pagesHuman}

---

```

### 4. preferences.xhtml

XUL/XHTML preferences UI with the following sections:

**Mistral API Section:**
- Password input for API key (preference binding)
- Text input for model name

**Pages Section:**
- Radiogroup with 4 options: All, First N (with number input), Range (start/end inputs), List (text input with placeholder "0,1,4-6")

**Output Section:**
- Text input for export directory with Browse button
- Text input for filename template

**OCR Options Section:**
- Checkbox for "Extract images (placeholders only)"

**Cache Section:**
- Checkbox to enable/disable cache
- Number input for max entries
- "Clear Cache" button

**Privacy Section:**
- Description text: "Documents are sent to Mistral AI for OCR processing."

### 5. preferences.js

Controller object `ZotPDF2mdPrefs` with:

- `init()`: Attach event listener to clear cache button
- `pickExportDir()`: Open folder picker using `FilePicker` from `chrome://zotero/content/modules/filePicker.mjs` (with fallback to `Zotero.FilePicker`)
- `applyExportDir(path)`: Normalize path and set to input + preference
- `clearCache()`: Reset cache data preference to empty JSON

Initialize on DOMContentLoaded or immediately if document ready.

### 6. content/pdf2markdown.js

Main orchestrator object `ZotPDF2md` with:

**Properties:**
- `rootURI`: Plugin root URI
- `version`: Plugin version string
- `windows`: Map to track window menu items/listeners
- `isRunning`: Boolean flag to prevent concurrent runs

**Methods:**

`init({ version, rootURI })`: Store version/rootURI, call `loadModules()`

`loadModules()`: Load all content/*.js modules via `Services.scriptloader.loadSubScript()`

`addToAllWindows()`: Iterate `Zotero.getMainWindows()`, call `addToWindow()` for each

`addToWindow(window)`: 
- Create XUL menuitem for context menu (`zotero-itemmenu`) with label "OCR to Markdown (Mistral)"
- Create XUL menuitem for Tools menu (`menu_ToolsPopup`) with label "ZotPDF2md"
- Add popupshowing listener to update context menu state
- Store references in windows Map

`removeFromWindow(window)`: Clean up menu items and listeners

`updateContextMenuState(window, menuItem)`: Disable menu if no valid attachments selected

`handleCommand(window)`: 
- Check `isRunning` flag, show alert if already running
- Set flag, call `runOcr()`, clear flag in finally block

`runOcr(window)`:
1. Get selected items via `Zotero.getActiveZoteroPane().getSelectedItems()`
2. Filter attachments by supported MIME types
3. Validate API key exists
4. Validate export directory via `FileUtils.validateExportDir()`
5. Parse page configuration via `PagesParser.parse()`
6. Create `ProgressManager` instance
7. Loop through attachments:
   - Check cancellation
   - Call `processAttachment()`
   - Track success/fail counts and errors
8. Show summary via progress manager

`processAttachment(attachment, pagesResult, progress, apiKey)`:
1. Get file path, verify file exists
2. Read file bytes via `Zotero.File.getBinaryContentsAsync()`
3. Compute SHA256 hash
4. Check cache (if enabled)
5. If cache miss: call `MistralClient.processDocument()`
6. Join page markdown content
7. Normalize line endings (CRLF/CR to LF)
8. Build output content with metadata block and header
9. Export markdown file
10. Cache result (if enabled)

`joinPages(pages)`: Join array of page objects by extracting `.markdown` and joining with `\n\n`

`normalizeLineEndings(text)`: Replace `\r\n` and `\r` with `\n`

`buildOutputContent(attachment, markdown, hash, pagesHuman, model)`: 
- Get parent item
- Build context object with version, timestamp, keys, title, filename, hash, model, pages
- Generate metadata block via `Templating.buildMetadataBlock()`
- Generate header via `Templating.buildHeaderFromTemplate()`
- Return concatenated content

`exportMarkdown(attachment, content, hash, pagesHuman, model)`:
- Get export directory and filename template from prefs
- Get citekey via `getCitekey()`
- Build filename via `Templating.buildFilename()`
- Write file via `FileUtils.exportMarkdown()`

`getBasename(filename)`: Extract filename without extension

`getCitekey(item)`: Check for Better BibTeX integration (`Zotero.BetterBibTeX.KeyManager.get()`), fall back to item.key

`filterAttachments(items)`: 
- Supported MIME types: `application/pdf`, `image/png`, `image/jpeg`, `image/tiff`, `image/webp`
- Return `{ attachments, skipped }` arrays

`openPreferences(window)`: Open plugin preferences via `window.ZoteroPane.openPreferences("zotpdf2md")`

### 7. content/mistralClient.js

API client object `MistralClient` with:

**Constants:**
- `API_BASE`: `"https://api.mistral.ai/v1"`
- `MAX_ATTEMPTS`: `3`
- `BACKOFF_MS`: `[1000, 3000, 7000]`

**Methods:**

`processDocument(options)`:
- For PDFs: Upload file, get file_id, use `{ type: "file", file_id }` reference
- For images: Base64 encode, use `{ type: "image_url", image_url: { url: "data:..." } }` reference
- Build payload with model, document reference, optional pages array, optional image extraction settings
- Call `callOcrWithRetry()`

`uploadFile(fileBytes, filename, apiKey)`:
- Use `Services.appShell.hiddenDOMWindow` to get FormData/Blob constructors
- POST to `/files` endpoint with multipart form (purpose="ocr")
- Return file ID from response

`callOcrWithRetry(payload, apiKey, attempt)`:
- Try `callOcr()`
- On 401/403: throw "Invalid API key"
- On 429 or 5xx or timeout: retry with exponential backoff
- Max 3 attempts

`callOcr(payload, apiKey)`:
- POST JSON to `/ocr` endpoint
- Return parsed JSON response

`fetchWithTimeout(url, options)`:
- Use AbortController with 60 second timeout
- Throw timeout error with `isTimeout` flag on abort

`bytesToBase64(bytes)`:
- Convert Uint8Array to base64 string
- Process in 32KB chunks to avoid call stack limits

`buildHttpError(status, message)`: Create Error with status property

`safeReadText(response)`: Safely read response text, return empty string on error

`sleep(ms)`: Promise-based delay

### 8. content/cache.js

LRU cache object `OcrCache` with:

**Constants:**
- `PREF_KEY`: `"extensions.zotpdf2md.cache.data"`

**Methods:**

`buildKey(hash, model, pagesSpec, extractImages)`:
- Format: `"{hash}|{model}|{pagesSpec}|{0|1}"`

`get(key)`:
- Load cache data
- Update `lastAccess` timestamp on hit
- Return entry or null

`set(key, value)`:
- Add entry with `lastAccess` timestamp
- Enforce max entries limit by removing least recently accessed
- Save cache

`clear()`: Reset cache to empty state

`load()`: Parse JSON from preference, handle errors gracefully

`save(data)`: Stringify and save to preference

### 9. content/pagesParser.js

Page selection parser object `PagesParser` with:

`parse()`:
- Read `pagesMode` preference
- Return `{ pages, human, spec }` where:
  - `pages`: null (all) or array of 0-indexed page numbers
  - `human`: Human-readable description
  - `spec`: Specification string for cache key

**Modes:**
- `all`: pages=null, human="all"
- `firstN`: pages=[0,1,...,n-1], human="0-{n-1}"
- `range`: pages=[start,...,end], human="{start}-{end}"
- `list`: Parse comma/space-separated values with range support (e.g., "0,1,4-6")

`parseListString(str)`:
- Split on commas/spaces
- Parse individual numbers and ranges
- Return sorted unique array

### 10. content/fileUtils.js

File utilities object `FileUtils` with:

`computeSHA256(bytes)`:
- Use `crypto.subtle.digest("SHA-256", ...)`
- Return lowercase hex string

`toUint8Array(bytes)`:
- Handle Uint8Array, ArrayBuffer, ArrayBufferView, and binary string inputs

`validateExportDir(dir)`:
- Normalize path
- Check existence via `IOUtils.stat()`
- Verify it's a directory
- Return `{ valid, message, path }`

`exportMarkdown(exportDir, filename, content)`:
- Join path via `PathUtils.join()`
- Write via `Zotero.File.putContentsAsync()`

`normalizePath(path)`:
- Handle tilde expansion for home directory (non-Windows)
- Handle escaped characters

`sanitizeFilename(name)`:
- Replace invalid characters (`\/:*?"<>|` and control chars) with underscore
- Collapse whitespace

`ensureMdExtension(name)`: Add `.md` if not present

`truncateFilename(name, maxLength)`: Truncate base name while preserving extension

### 11. content/templating.js

Template engine object `Templating` with:

`buildMetadataBlock(context)`:
- Generate HTML comment block with version, timestamp, attachmentKey, sha256, model, pages
- Format:
```
<!-- ZotPDF2md v{version} -->
<!-- created: {timestamp} -->
<!-- attachmentKey: {key} -->
<!-- sha256: {hash} -->
<!-- model: {model} -->
<!-- pages: {pages} -->

```

`buildHeaderFromTemplate(template, context)`:
- Replace placeholders: `{itemTitle}`, `{itemKey}`, `{attachmentFilename}`, `{timestamp}`, `{model}`, `{pagesHuman}`

`buildFilename(template, context)`:
- Replace placeholders: `{attachmentBasename}`, `{attachmentFilename}`, `{itemTitle}`, `{year}`, `{citekey}`, `{itemKey}`, `{attachmentKey}`
- Sanitize, ensure .md extension, truncate to 200 chars

### 12. content/progressManager.js

Progress window class `ProgressManager`:

**Constructor(total):**
- Store total count
- Create `Zotero.ProgressWindow` with `closeOnClick: false`
- Set headline "ZotPDF2md"
- Add description "Processing {n} attachment(s)..."
- Show window
- Add Cancel button (if supported) that sets cancelled flag

**Methods:**

`startItem(filename)`:
- Increment current counter
- Create `ItemProgress` with PDF icon and status text "OCR {n}/{total}: {filename}"

`updateStatus(status)`: Update item progress text

`completeItem()`: Set item progress to 100%

`failItem()`: Call `setError()` on item progress

`isCancelled()`: Return cancelled flag

`showSummary(successCount, failCount, skipCount, errors)`:
- Add summary description
- If errors: add "Copy error report" button or show first 3 errors
- Start 5 second close timer

## Mistral OCR API Integration

### Endpoints

1. **File Upload** (`POST /files`)
   - Headers: `Authorization: Bearer {apiKey}`
   - Body: multipart/form-data with `purpose=ocr` and `file` blob
   - Response: `{ id: "file_id" }`

2. **OCR Processing** (`POST /ocr`)
   - Headers: `Authorization: Bearer {apiKey}`, `Content-Type: application/json`
   - Body:
     ```json
     {
       "model": "mistral-ocr-latest",
       "document": { "type": "file", "file_id": "..." },
       "pages": [0, 1, 2],
       "include_image_base64": true,
       "image_limit": 20,
       "image_min_size": 64
     }
     ```
   - Response: `{ pages: [{ markdown: "..." }, ...], model: "..." }`

### Error Handling

- 401/403: Invalid API key (no retry)
- 429: Rate limited (retry with backoff)
- 5xx: Server error (retry with backoff)
- Timeout: 60 seconds (retry with backoff)
- Exponential backoff: 1s, 3s, 7s

## Key Implementation Details

### Zotero APIs Used

- `Zotero.Prefs.get(key, true)` / `Zotero.Prefs.set(key, value, true)`
- `Zotero.File.getBinaryContentsAsync(path)` / `Zotero.File.putContentsAsync(path, content)`
- `Zotero.getActiveZoteroPane().getSelectedItems()`
- `Zotero.getMainWindows()`
- `Zotero.ProgressWindow`
- `Zotero.PreferencePanes.register()`
- `Zotero.alert(window, title, message)`
- `Zotero.logError(error)`
- `Zotero.debug(message)`
- `Zotero.Utilities.Internal.copyTextToClipboard(text)`

### Mozilla/Browser APIs Used

- `Services.scriptloader.loadSubScript(uri)`
- `Services.appShell.hiddenDOMWindow` (for FormData, Blob, AbortController)
- `Services.dirsvc.get("Home", Ci.nsIFile)`
- `IOUtils.stat(path)`
- `PathUtils.join(base, filename)`
- `crypto.subtle.digest("SHA-256", data)`
- `fetch(url, options)`
- `btoa(string)`
- `ChromeUtils.importESModule(...)`

### XUL Elements

- `menuitem`: Menu items with id, label, command event
- `vbox`, `hbox`, `groupbox`: Layout containers
- `radiogroup`, `radio`: Radio button groups
- `checkbox`: Checkboxes
- `label`, `description`: Text elements
- `button`: Buttons with oncommand handlers
- `html:input`: HTML input elements within XUL

### Better BibTeX Integration

Optional integration to get citation keys:
```javascript
if (typeof Zotero.BetterBibTeX !== "undefined" && Zotero.BetterBibTeX.KeyManager) {
  let record = Zotero.BetterBibTeX.KeyManager.get(item.id);
  if (record && record.citationKey) {
    return record.citationKey;
  }
}
return item.key; // fallback
```

## Output Format

Generated Markdown files contain:

1. **Metadata block** (HTML comments):
   ```
   <!-- ZotPDF2md v0.1.0 -->
   <!-- created: 2024-01-15T10:30:00.000Z -->
   <!-- attachmentKey: ABC123 -->
   <!-- sha256: abcdef... -->
   <!-- model: mistral-ocr-latest -->
   <!-- pages: all -->
   ```

2. **Header** (from template):
   ```markdown
   # Paper Title

   * Zotero item: ITEM123
   * Attachment: document.pdf
   * Created: 2024-01-15T10:30:00.000Z
   * Model: mistral-ocr-latest
   * Pages: all

   ---

   ```

3. **OCR content**: Pages joined with double newlines

## Installation & Build

- No build system required (no bundler/transpiler)
- Modules loaded via `loadSubScript()` at runtime
- Package as `.xpi` (ZIP archive containing all files)
- Development: Create proxy file in Zotero profile pointing to source directory

## Testing Checklist

1. API key validation and error messages
2. Export directory validation
3. All page selection modes (all, firstN, range, list)
4. PDF upload and OCR
5. Image base64 encoding and OCR
6. Cache hit/miss scenarios
7. Retry logic for rate limits and server errors
8. Progress window with cancel functionality
9. Better BibTeX integration (with and without)
10. Filename templating with all variables
11. Path normalization (tilde expansion, escaped chars)
12. Concurrent run prevention
