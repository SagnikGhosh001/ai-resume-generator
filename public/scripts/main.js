globalThis.window.onload = () => {
  const form = document.querySelector("form");
  const downloadBtn = document.querySelector("#download-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    downloadBtn.disabled = true;
    downloadBtn.innerText = "Generating...";

    try {
      const formData = new FormData(form);

      const res = await fetch("/download", { method: "POST", body: formData });

      const blob = await res.blob();

      const url = globalThis.window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.md";
      a.click();
      globalThis.window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    downloadBtn.disabled = false;
    downloadBtn.innerText = "Download Resume";
  });
};
