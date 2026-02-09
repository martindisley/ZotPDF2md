var ZotPDF2mdPrefs = {
  init() {
    let clearCacheButton = document.getElementById("zotpdf2md-cache-clear");
    if (clearCacheButton) {
      clearCacheButton.addEventListener("command", () => this.clearCache());
    }
  },

  async pickExportDir() {
    try {
      let ownerWindow = window;
      try {
        let { FilePicker } = ChromeUtils.importESModule("chrome://zotero/content/modules/filePicker.mjs");
        let fp = new FilePicker();
        fp.init(ownerWindow, "Select export directory", fp.modeGetFolder);
        let rv = await fp.show();
        if (rv === fp.returnOK) {
          this.applyExportDir(fp.file?.path || fp.filePath || fp.path || "");
          return;
        }
      } catch (innerError) {
        Zotero.logError(innerError);
      }

      if (typeof Zotero.FilePicker === "function") {
        let fp = new Zotero.FilePicker();
        fp.init(ownerWindow, "Select export directory", fp.modeGetFolder);
        let rv = await fp.show();
        if (rv === fp.returnOK) {
          this.applyExportDir(fp.file?.path || fp.filePath || fp.path || "");
          return;
        }
      }

      throw new Error("File picker unavailable");
    } catch (e) {
      Zotero.logError(e);
      Zotero.alert(null, "ZotPDF2md", "Could not open folder picker. Please paste the path manually.\n\n" + e.message);
    }
  },

  applyExportDir(path) {
    if (!path) {
      throw new Error("Selected folder path unavailable");
    }
    let normalized = path;
    if (!Zotero.isWin) {
      normalized = normalized.replace(/\\([\\'"~ ])/g, "$1");
    }
    let input = document.getElementById("zotpdf2md-export-dir");
    if (input) {
      input.value = normalized;
    }
    Zotero.Prefs.set("extensions.zotpdf2md.output.exportDir", normalized, true);
  },

  clearCache() {
    Zotero.Prefs.set("extensions.zotpdf2md.cache.data", "{\"entries\":{}}", true);
    Zotero.alert(null, "ZotPDF2md", "Cache cleared.");
  }
};

function initPrefs() {
  try {
    ZotPDF2mdPrefs.init();
  } catch (e) {
    Zotero.logError(e);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPrefs);
} else {
  initPrefs();
}
