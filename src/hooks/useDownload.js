// useDownload.js
import { useCallback } from "react";

function useDownload() {
  // built-in transform functions
  const transforms = {
    json: (data) => JSON.stringify(data, null, 2),
    tsv: (data) => {
      if (!Array.isArray(data) || data.length === 0) return "";
      const header = Object.keys(data[0]).join("\t");

      // Build rows with tab separator
      const rows = data.map(row => Object.values(row).join("\t"));

      return [header, ...rows].join("\n");
    },
    text: (data) => data.toString(),
    png: (data) => data,
    fasta: (data) => data,
  };

  /**
   * @param {any} data - The content to download
   * @param {string} filename - Name of the file
   * @param {string} type - 'json' | 'csv' | 'text' (default: 'json')
   */
    const downloadFile = useCallback((data, filename, type = "json") => {
        const mimeTypes = {
            json: "application/json",
            tsv: "text/tab-separated-values",
            text: "text/plain",
            png: "image/png"
        };
        if (type === "png") {
            // PNG uses dataUrl directly
            const link = document.createElement("a");
            link.href = data;
            link.download = filename;
            link.click();
            return;
        }

        const transform = transforms[type] || transforms.json;
        const content = transform(data);
        const blob = new Blob([content], { type: mimeTypes[type] || "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);

    }, []);

    return { downloadFile };
}

export default useDownload;
