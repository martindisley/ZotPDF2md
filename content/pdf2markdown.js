var ZotPDF2md = {
  rootURI: null,
  version: "0.0.0",
  windows: new Map(),
  isRunning: false,

  init({ version, rootURI }) {
    this.version = version;
    this.rootURI = rootURI;
    this.loadModules();
  },

  loadModules() {
    Services.scriptloader.loadSubScript(this.rootURI + "content/mistralClient.js");
    Services.scriptloader.loadSubScript(this.rootURI + "content/cache.js");
    Services.scriptloader.loadSubScript(this.rootURI + "content/pagesParser.js");
    Services.scriptloader.loadSubScript(this.rootURI + "content/fileUtils.js");
    Services.scriptloader.loadSubScript(this.rootURI + "content/templating.js");
    Services.scriptloader.loadSubScript(this.rootURI + "content/progressManager.js");
  },

  addToAllWindows() {
    for (let win of Zotero.getMainWindows()) {
      this.addToWindow(win);
    }
  },

  removeFromAllWindows() {
    for (let win of Zotero.getMainWindows()) {
      this.removeFromWindow(win);
    }
  },

  addToWindow(window) {
    if (this.windows.has(window)) {
      return;
    }

    let doc = window.document;
    let itemMenu = doc.getElementById("zotero-itemmenu");
    let toolsMenu = doc.getElementById("menu_ToolsPopup");

    if (!itemMenu || !toolsMenu) {
      return;
    }

    let contextItem = doc.createXULElement("menuitem");
    contextItem.id = "zotpdf2md-context-menu";
    contextItem.setAttribute("label", "OCR to Markdown (Mistral)");
    contextItem.addEventListener("command", () => this.handleCommand(window));
    itemMenu.appendChild(contextItem);

    let toolsItem = doc.createXULElement("menuitem");
    toolsItem.id = "zotpdf2md-tools-menu";
    toolsItem.setAttribute("label", "ZotPDF2md");
    toolsItem.addEventListener("command", () => this.handleCommand(window));
    toolsMenu.appendChild(toolsItem);

    let popupListener = () => this.updateContextMenuState(window, contextItem);
    itemMenu.addEventListener("popupshowing", popupListener);

    this.windows.set(window, { contextItem, toolsItem, popupListener, itemMenu });
  },

  removeFromWindow(window) {
    let entry = this.windows.get(window);
    if (!entry) {
      return;
    }

    let { contextItem, toolsItem, popupListener, itemMenu } = entry;
    if (itemMenu && popupListener) {
      itemMenu.removeEventListener("popupshowing", popupListener);
    }
    if (contextItem && contextItem.parentNode) {
      contextItem.parentNode.removeChild(contextItem);
    }
    if (toolsItem && toolsItem.parentNode) {
      toolsItem.parentNode.removeChild(toolsItem);
    }

    this.windows.delete(window);
  },

  shutdown() {
    this.windows.clear();
  },

  updateContextMenuState(window, menuItem) {
    let items = Zotero.getActiveZoteroPane().getSelectedItems();
    let hasValid = this.filterAttachments(items).attachments.length > 0;
    menuItem.disabled = !hasValid;
  },

  async handleCommand(window) {
    if (this.isRunning) {
      Zotero.alert(window, "ZotPDF2md", "A run is already in progress.");
      return;
    }

    this.isRunning = true;
    try {
      await this.runOcr(window);
    } finally {
      this.isRunning = false;
    }
  },

  async runOcr(window) {
    let selectedItems = Zotero.getActiveZoteroPane().getSelectedItems();
    let { attachments, skipped } = this.filterAttachments(selectedItems);

    if (attachments.length === 0) {
      Zotero.alert(window, "ZotPDF2md", "No valid PDF or image attachments selected.");
      return;
    }

    let apiKey = Zotero.Prefs.get("extensions.zotpdf2md.mistral.apiKey", true);
    if (!apiKey) {
      Zotero.alert(window, "ZotPDF2md", "Mistral API key not configured.");
      this.openPreferences(window);
      return;
    }

    let exportDir = Zotero.Prefs.get("extensions.zotpdf2md.output.exportDir", true);
    let dirCheck = await FileUtils.validateExportDir(exportDir);
    if (!dirCheck.valid) {
      let msg = dirCheck.message;
      if (dirCheck.path) {
        msg += ": " + dirCheck.path;
      }
      Zotero.alert(window, "ZotPDF2md", msg);
      this.openPreferences(window);
      return;
    }

    let pagesResult;
    try {
      pagesResult = PagesParser.parse();
    } catch (error) {
      Zotero.alert(window, "ZotPDF2md", "Invalid pages configuration: " + error.message);
      this.openPreferences(window);
      return;
    }

    let progress = new ProgressManager(attachments.length);
    let successCount = 0;
    let failCount = 0;
    let errors = [];

    for (let attachment of attachments) {
      if (progress.isCancelled()) {
        break;
      }

      progress.startItem(attachment.attachmentFilename);
      try {
        await this.processAttachment(attachment, pagesResult, progress, apiKey);
        successCount++;
      } catch (error) {
        Zotero.logError(error);
        failCount++;
        progress.updateStatus("Failed: " + (error.message || "Unknown error"));
        errors.push({ filename: attachment.attachmentFilename, message: error.message });
        progress.failItem();
      }
    }

    progress.showSummary(successCount, failCount, skipped.length, errors);
  },

  async processAttachment(attachment, pagesResult, progress, apiKey) {
    let filePath = attachment.getFilePath();
    let exists = await attachment.fileExists();
    if (!exists || !filePath) {
      throw new Error("Attachment file not found");
    }

    progress.updateStatus("Reading...");
    let fileBytes = await Zotero.File.getBinaryContentsAsync(filePath);
    let fileData = FileUtils.toUint8Array(fileBytes);

    progress.updateStatus("Hashing...");
    let hash = await FileUtils.computeSHA256(fileData);

    let model = Zotero.Prefs.get("extensions.zotpdf2md.ocr.model", true);
    let extractImages = Zotero.Prefs.get("extensions.zotpdf2md.ocr.extractImages", true);
    let cacheEnabled = Zotero.Prefs.get("extensions.zotpdf2md.cache.enabled", true);
    let cacheKey = OcrCache.buildKey(hash, model, pagesResult.spec, extractImages);

    if (cacheEnabled) {
      let cached = OcrCache.get(cacheKey);
      if (cached && cached.markdown) {
        progress.updateStatus("Using cache...");
        await this.exportMarkdown(attachment, cached.markdown, hash, pagesResult.human, model);
        progress.completeItem();
        return;
      }
    }

    progress.updateStatus("Uploading...");
    let ocrResult = await MistralClient.processDocument({
      fileBytes: fileData,
      mimeType: attachment.attachmentContentType,
      filename: attachment.attachmentFilename,
      model,
      pages: pagesResult.pages,
      extractImages,
      apiKey
    });

    progress.updateStatus("Formatting...");
    let markdown = this.joinPages(ocrResult.pages || []);
    markdown = this.normalizeLineEndings(markdown);

    let fullContent = this.buildOutputContent(attachment, markdown, hash, pagesResult.human, ocrResult.model || model);

    progress.updateStatus("Saving...");
    await this.exportMarkdown(attachment, fullContent, hash, pagesResult.human, model);

    if (cacheEnabled) {
      OcrCache.set(cacheKey, { markdown: fullContent, timestamp: new Date().toISOString() });
    }

    progress.completeItem();
  },

  joinPages(pages) {
    let parts = [];
    for (let page of pages) {
      let content = page.markdown || "";
      if (content) {
        parts.push(content);
      }
    }
    return parts.join("\n\n");
  },

  normalizeLineEndings(text) {
    return (text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  },

  buildOutputContent(attachment, markdown, hash, pagesHuman, model) {
    let parentItem = attachment.parentItem || attachment;
    let timestamp = new Date().toISOString();
    let template = Zotero.Prefs.get("extensions.zotpdf2md.note.template", true);

    let context = {
      version: this.version,
      timestamp,
      attachmentKey: attachment.key,
      itemKey: parentItem.key,
      itemTitle: parentItem.getField("title") || attachment.attachmentFilename,
      attachmentFilename: attachment.attachmentFilename,
      hash,
      model,
      pagesHuman
    };

    let metadataBlock = Templating.buildMetadataBlock(context);
    let header = Templating.buildHeaderFromTemplate(template, context);
    return metadataBlock + header + markdown;
  },

  async exportMarkdown(attachment, content, hash, pagesHuman, model) {
    let exportDir = Zotero.Prefs.get("extensions.zotpdf2md.output.exportDir", true);
    let template = Zotero.Prefs.get("extensions.zotpdf2md.output.fileNameTemplate", true);
    let parentItem = attachment.parentItem || attachment;
    let citekey = this.getCitekey(parentItem);

    let context = {
      attachmentBasename: this.getBasename(attachment.attachmentFilename),
      attachmentFilename: attachment.attachmentFilename,
      itemTitle: parentItem.getField("title") || "",
      year: parentItem.getField("year") || "",
      citekey,
      itemKey: parentItem.key,
      attachmentKey: attachment.key
    };

    let filename = Templating.buildFilename(template, context);
    await FileUtils.exportMarkdown(exportDir, filename, content);
  },

  getBasename(filename) {
    let dotIndex = filename.lastIndexOf(".");
    if (dotIndex > 0) {
      return filename.slice(0, dotIndex);
    }
    return filename;
  },

  getCitekey(item) {
    if (typeof Zotero.BetterBibTeX !== "undefined" && Zotero.BetterBibTeX.KeyManager) {
      let record = Zotero.BetterBibTeX.KeyManager.get(item.id);
      if (record && record.citationKey) {
        return record.citationKey;
      }
    }
    return item.key;
  },

  filterAttachments(items) {
    let supported = new Set([
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/tiff",
      "image/webp"
    ]);

    let attachments = [];
    let skipped = [];

    for (let item of items) {
      if (item.isAttachment() && supported.has(item.attachmentContentType)) {
        attachments.push(item);
      } else {
        skipped.push(item);
      }
    }

    return { attachments, skipped };
  },

  openPreferences(window) {
    try {
      if (window && window.ZoteroPane && typeof window.ZoteroPane.openPreferences === "function") {
        window.ZoteroPane.openPreferences("zotpdf2md");
        return;
      }
    } catch (e) {
      Zotero.logError(e);
    }
  }
};
