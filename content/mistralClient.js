var MistralClient = {
  API_BASE: "https://api.mistral.ai/v1",
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: [1000, 3000, 7000],

  async processDocument(options) {
    let { fileBytes, mimeType, filename, model, pages, extractImages, apiKey } = options;
    let documentRef;

    if (mimeType === "application/pdf") {
      let fileId = await this.uploadFile(fileBytes, filename, apiKey);
      documentRef = { type: "file", file_id: fileId };
    } else {
      let base64 = this.bytesToBase64(fileBytes);
      documentRef = {
        type: "image_url",
        image_url: { url: "data:" + mimeType + ";base64," + base64 }
      };
    }

    let payload = {
      model,
      document: documentRef
    };

    if (pages !== null) {
      payload.pages = pages;
    }

    if (extractImages) {
      payload.include_image_base64 = true;
      payload.image_limit = 20;
      payload.image_min_size = 64;
    }

    return await this.callOcrWithRetry(payload, apiKey, 1);
  },

  async uploadFile(fileBytes, filename, apiKey) {
    let domWindow = Services.appShell.hiddenDOMWindow;
    let FormDataCtor = domWindow.FormData;
    let BlobCtor = domWindow.Blob;
    let formData = new FormDataCtor();
    let blob = new BlobCtor([fileBytes], { type: "application/pdf" });
    formData.append("purpose", "ocr");
    formData.append("file", blob, filename || "document.pdf");

    let response = await this.fetchWithTimeout(
      this.API_BASE + "/files",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey
        },
        body: formData
      }
    );

    if (!response.ok) {
      let errorText = await this.safeReadText(response);
      throw this.buildHttpError(response.status, errorText || "File upload failed");
    }

    let data = await response.json();
    if (!data || !data.id) {
      throw new Error("File upload response missing file id");
    }

    return data.id;
  },

  async callOcrWithRetry(payload, apiKey, attempt) {
    try {
      return await this.callOcr(payload, apiKey);
    } catch (error) {
      let status = error.status;
      if (status === 401 || status === 403) {
        throw new Error("Invalid API key");
      }

      let shouldRetry = status === 429 || (status >= 500 && status < 600) || error.isTimeout;
      if (shouldRetry && attempt < this.MAX_ATTEMPTS) {
        await this.sleep(this.BACKOFF_MS[attempt - 1]);
        return this.callOcrWithRetry(payload, apiKey, attempt + 1);
      }

      throw error;
    }
  },

  async callOcr(payload, apiKey) {
    let response = await this.fetchWithTimeout(
      this.API_BASE + "/ocr",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      let errorText = await this.safeReadText(response);
      throw this.buildHttpError(response.status, errorText || "OCR request failed");
    }

    return await response.json();
  },

  async fetchWithTimeout(url, options) {
    let domWindow = Services.appShell.hiddenDOMWindow;
    let AbortControllerCtor = domWindow.AbortController;
    let controller = new AbortControllerCtor();
    let timeoutId = setTimeout(() => controller.abort(), 60000);
    let opts = Object.assign({}, options, { signal: controller.signal });

    try {
      return await fetch(url, opts);
    } catch (error) {
      if (error.name === "AbortError") {
        let timeoutError = new Error("Request timed out");
        timeoutError.isTimeout = true;
        throw timeoutError;
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  bytesToBase64(bytes) {
    let uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    let chunkSize = 0x8000;
    let binary = "";
    for (let i = 0; i < uint8.length; i += chunkSize) {
      let chunk = uint8.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binary);
  },

  buildHttpError(status, message) {
    let error = new Error(message);
    error.status = status;
    return error;
  },

  async safeReadText(response) {
    try {
      return await response.text();
    } catch (e) {
      return "";
    }
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
