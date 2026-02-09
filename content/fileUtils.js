var FileUtils = {
  async computeSHA256(bytes) {
    let uint8 = this.toUint8Array(bytes);
    let hashBuffer = await crypto.subtle.digest("SHA-256", uint8);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  },

  toUint8Array(bytes) {
    if (bytes instanceof Uint8Array) {
      return bytes;
    }
    if (bytes instanceof ArrayBuffer) {
      return new Uint8Array(bytes);
    }
    if (ArrayBuffer.isView(bytes)) {
      return new Uint8Array(bytes.buffer);
    }
    if (typeof bytes === "string") {
      let arr = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        arr[i] = bytes.charCodeAt(i) & 0xff;
      }
      return arr;
    }
    throw new Error("Unsupported binary data type");
  },

  async validateExportDir(dir) {
    let normalized = this.normalizePath(dir);
    if (!normalized) {
      return { valid: false, message: "Export directory not configured", path: "" };
    }

    let stat = await IOUtils.stat(normalized).catch(() => null);
    if (!stat) {
      return { valid: false, message: "Export directory does not exist", path: normalized };
    }

    let isDir = stat.type ? stat.type === "directory" : stat.isDir === true;
    if (!isDir) {
      return { valid: false, message: "Export path is not a directory", path: normalized };
    }

    return { valid: true, path: normalized };
  },

  async exportMarkdown(exportDir, filename, content) {
    let normalized = this.normalizePath(exportDir);
    let filePath = PathUtils.join(normalized, filename);
    await Zotero.File.putContentsAsync(filePath, content);
    return filePath;
  },

  normalizePath(path) {
    if (!path) {
      return path;
    }

    let normalized = path;
    if (!Zotero.isWin) {
      normalized = normalized.replace(/\\([\\'"~ ])/g, "$1");
      if (normalized.startsWith("~")) {
        try {
          let home = Services.dirsvc.get("Home", Ci.nsIFile).path;
          if (normalized === "~") {
            normalized = home;
          } else if (normalized.startsWith("~/")) {
            normalized = PathUtils.join(home, normalized.slice(2));
          }
        } catch (e) {
          return normalized;
        }
      }
    }

    return normalized;
  },

  sanitizeFilename(name) {
    let sanitized = (name || "")
      .replace(/[\\/:*?"<>|\x00-\x1F]/g, "_")
      .replace(/\s+/g, " ")
      .trim();
    return sanitized;
  },

  ensureMdExtension(name) {
    if (name.toLowerCase().endsWith(".md")) {
      return name;
    }
    return name + ".md";
  },

  truncateFilename(name, maxLength) {
    if (name.length <= maxLength) {
      return name;
    }

    let ext = "";
    let dotIndex = name.lastIndexOf(".");
    if (dotIndex > 0) {
      ext = name.slice(dotIndex);
    }
    let base = ext ? name.slice(0, dotIndex) : name;
    let allowedBaseLength = Math.max(1, maxLength - ext.length);
    return base.slice(0, allowedBaseLength) + ext;
  }
};
