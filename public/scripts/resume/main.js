import { renderResume } from "./renderer.js";
import { collectResume } from "./collector.js";
import { downloadPdf } from "./downloader.js";

const loadResume = () => {
  const data = sessionStorage.getItem("resume");
  if (!data) {
    globalThis.window.location.href = "/";
    return null;
  }
  return JSON.parse(data);
};

const withButton = async (btn, label, fn) => {
  btn.disabled = true;
  btn.textContent = "Generating...";
  try {
    await fn();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  btn.disabled = false;
  btn.textContent = label;
};

globalThis.window.addEventListener("DOMContentLoaded", () => {
  const resume = loadResume();
  if (!resume) return;

  document.querySelector("#resume-content").appendChild(renderResume(resume));

  document.querySelector("#btn-pdf").addEventListener("click", (e) => {
    withButton(
      e.currentTarget,
      "Download PDF",
      () => downloadPdf(collectResume(resume)),
    );
  });
});
