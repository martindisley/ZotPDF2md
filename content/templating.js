var Templating = {
  buildMetadataBlock(context) {
    return [
      "<!-- ZotPDF2md v" + context.version + " -->",
      "<!-- created: " + context.timestamp + " -->",
      "<!-- attachmentKey: " + context.attachmentKey + " -->",
      "<!-- sha256: " + context.hash + " -->",
      "<!-- model: " + context.model + " -->",
      "<!-- pages: " + context.pagesHuman + " -->"
    ].join("\n") + "\n\n";
  },

  buildHeaderFromTemplate(template, context) {
    return template
      .replace(/\{itemTitle\}/g, context.itemTitle)
      .replace(/\{itemKey\}/g, context.itemKey)
      .replace(/\{attachmentFilename\}/g, context.attachmentFilename)
      .replace(/\{timestamp\}/g, context.timestamp)
      .replace(/\{model\}/g, context.model)
      .replace(/\{pagesHuman\}/g, context.pagesHuman);
  },

  buildFilename(template, context) {
    let result = template
      .replace(/\{attachmentBasename\}/g, context.attachmentBasename)
      .replace(/\{attachmentFilename\}/g, context.attachmentFilename)
      .replace(/\{itemTitle\}/g, context.itemTitle)
      .replace(/\{year\}/g, context.year || "")
      .replace(/\{citekey\}/g, context.citekey)
      .replace(/\{itemKey\}/g, context.itemKey)
      .replace(/\{attachmentKey\}/g, context.attachmentKey);

    result = FileUtils.sanitizeFilename(result);
    result = FileUtils.ensureMdExtension(result);
    result = FileUtils.truncateFilename(result, 200);
    return result;
  }
};
