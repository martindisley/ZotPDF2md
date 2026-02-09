var OcrCache = {
  PREF_KEY: "extensions.zotpdf2md.cache.data",

  buildKey(hash, model, pagesSpec, extractImages) {
    return hash + "|" + model + "|" + pagesSpec + "|" + (extractImages ? "1" : "0");
  },

  get(key) {
    let data = this.load();
    let entry = data.entries[key];
    if (entry) {
      entry.lastAccess = Date.now();
      this.save(data);
    }
    return entry || null;
  },

  set(key, value) {
    let data = this.load();
    data.entries[key] = Object.assign({}, value, { lastAccess: Date.now() });

    let maxEntries = Zotero.Prefs.get("extensions.zotpdf2md.cache.maxEntries", true);
    let entries = Object.entries(data.entries);
    if (entries.length > maxEntries) {
      entries.sort((a, b) => a[1].lastAccess - b[1].lastAccess);
      let toRemove = entries.slice(0, entries.length - maxEntries);
      for (let [k] of toRemove) {
        delete data.entries[k];
      }
    }

    this.save(data);
  },

  clear() {
    this.save({ entries: {} });
  },

  load() {
    let raw = Zotero.Prefs.get(this.PREF_KEY, true) || "{\"entries\":{}}";
    try {
      let data = JSON.parse(raw);
      if (!data.entries) data.entries = {};
      return data;
    } catch (e) {
      return { entries: {} };
    }
  },

  save(data) {
    Zotero.Prefs.set(this.PREF_KEY, JSON.stringify(data), true);
  }
};
