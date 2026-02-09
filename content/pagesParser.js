var PagesParser = {
  parse() {
    let mode = Zotero.Prefs.get("extensions.zotpdf2md.ocr.pagesMode", true);
    let pages = null;
    let human = "all";

    if (mode === "all") {
      pages = null;
      human = "all";
    } else if (mode === "firstN") {
      let n = Zotero.Prefs.get("extensions.zotpdf2md.ocr.firstN", true);
      if (!Number.isInteger(n) || n <= 0) {
        throw new Error("First N must be a positive integer");
      }
      pages = Array.from({ length: n }, (_, i) => i);
      human = "0-" + (n - 1);
    } else if (mode === "range") {
      let start = Zotero.Prefs.get("extensions.zotpdf2md.ocr.rangeStart", true);
      let end = Zotero.Prefs.get("extensions.zotpdf2md.ocr.rangeEnd", true);
      if (!Number.isInteger(start) || !Number.isInteger(end)) {
        throw new Error("Range start/end must be integers");
      }
      if (start < 0 || end < start) {
        throw new Error("Invalid page range");
      }
      pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      human = start + "-" + end;
    } else if (mode === "list") {
      let listStr = Zotero.Prefs.get("extensions.zotpdf2md.ocr.list", true);
      pages = this.parseListString(listStr);
      human = pages.join(",");
    } else {
      throw new Error("Unknown pages mode: " + mode);
    }

    let spec = pages === null ? "all" : pages.join(",");
    return { pages, human, spec };
  },

  parseListString(str) {
    if (!str || !str.trim()) {
      throw new Error("Page list is empty");
    }

    let pages = new Set();
    let parts = str.split(/[\s,]+/).filter(Boolean);

    for (let part of parts) {
      if (part.includes("-")) {
        let pieces = part.split("-");
        if (pieces.length !== 2) {
          throw new Error("Invalid range: " + part);
        }
        let start = Number(pieces[0]);
        let end = Number(pieces[1]);
        if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start) {
          throw new Error("Invalid range: " + part);
        }
        for (let i = start; i <= end; i++) {
          pages.add(i);
        }
      } else {
        let num = Number(part);
        if (!Number.isInteger(num) || num < 0) {
          throw new Error("Invalid page number: " + part);
        }
        pages.add(num);
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  }
};
