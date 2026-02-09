var ZotPDF2md;

function log(message) {
  Zotero.debug("ZotPDF2md: " + message);
}

function install() {
  log("Installed");
}

async function startup({ id, version, rootURI }) {
  log("Starting");

  Zotero.PreferencePanes.register({
    pluginID: "zotpdf2md@zotero.org",
    src: rootURI + "preferences.xhtml",
    scripts: [rootURI + "preferences.js"]
  });

  Services.scriptloader.loadSubScript(rootURI + "content/pdf2markdown.js");
  ZotPDF2md.init({ id, version, rootURI });
  ZotPDF2md.addToAllWindows();
}

function onMainWindowLoad({ window }) {
  ZotPDF2md.addToWindow(window);
}

function onMainWindowUnload({ window }) {
  ZotPDF2md.removeFromWindow(window);
}

function shutdown() {
  log("Shutting down");
  if (ZotPDF2md) {
    ZotPDF2md.removeFromAllWindows();
    ZotPDF2md.shutdown();
    ZotPDF2md = undefined;
  }
}

function uninstall() {
  log("Uninstalled");
}
