class ProgressManager {
  constructor(total) {
    this.total = total;
    this.current = 0;
    this.cancelled = false;
    this.window = new Zotero.ProgressWindow({ closeOnClick: false });
    this.window.changeHeadline("ZotPDF2md");
    this.window.addDescription("Processing " + total + " attachment(s)...");
    this.window.show();

    if (typeof this.window.addButton === "function") {
      this.window.addButton("Cancel", () => {
        this.cancelled = true;
        this.window.addDescription("Cancelling after current item...");
      });
    }
  }

  startItem(filename) {
    this.current += 1;
    this.itemProgress = new this.window.ItemProgress("attachment-pdf", "OCR " + this.current + "/" + this.total + ": " + filename);
    this.itemProgress.setProgress(0);
  }

  updateStatus(status) {
    if (this.itemProgress) {
      this.itemProgress.setText(status);
    }
  }

  completeItem() {
    if (this.itemProgress) {
      this.itemProgress.setProgress(100);
    }
  }

  failItem() {
    if (this.itemProgress) {
      this.itemProgress.setError();
    }
  }

  isCancelled() {
    return this.cancelled;
  }

  showSummary(successCount, failCount, skipCount, errors) {
    let summary = "Done: " + successCount + " success, " + failCount + " failed, " + skipCount + " skipped";
    this.window.addDescription(summary);

    if (errors && errors.length && typeof this.window.addButton === "function") {
      this.window.addButton("Copy error report", () => {
        let lines = errors.map(e => e.filename + ": " + e.message).join("\n");
        Zotero.Utilities.Internal.copyTextToClipboard(lines);
      });
    } else if (errors && errors.length) {
      let maxLines = Math.min(3, errors.length);
      for (let i = 0; i < maxLines; i++) {
        this.window.addDescription("Error: " + errors[i].filename + ": " + errors[i].message);
      }
    }

    this.window.startCloseTimer(5000);
  }
}
