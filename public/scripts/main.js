globalThis.window.onload = () => {
  const form = document.querySelector("form");
  const downloadBtn = document.querySelector("#download-btn");

  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const formdata = new FormData(form);
    fetch("/download", { method: "POST", body: formdata });
  });
};
