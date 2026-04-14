const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadPdf = async (resume) => {
  const res = await fetch("/download/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `PDF generation failed: ${res.status}`);
  }

  const blob = await res.blob();
  const name = (resume.personal_info?.full_name || "resume").replace(
    /\s+/g,
    "_",
  );
  triggerDownload(blob, `${name}_resume.pdf`);
};
