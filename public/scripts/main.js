import { collectWorkExperience, createWorkEntry } from "./entries/work.js";
import { collectEducation, createEducationEntry } from "./entries/education.js";
import { submitForm } from "./submit.js";

globalThis.window.onload = () => {
  let workCount = 0;
  let educationCount = 0;
  const form = document.querySelector("#resume-form");
  const downloadBtn = document.querySelector("#download-btn");

  document.querySelector("#add-work").addEventListener("click", () => {
    document.querySelector("#work-entries")
      .appendChild(createWorkEntry(++workCount));
  });

  document.querySelector("#add-education").addEventListener("click", () => {
    document.querySelector("#education-entries")
      .appendChild(createEducationEntry(++educationCount));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    downloadBtn.disabled = true;
    downloadBtn.innerText = "Generating...";

    try {
      const formData = new FormData(form);
      formData
        .append("work_experience", JSON.stringify(collectWorkExperience()));
      formData.append("education", JSON.stringify(collectEducation()));
      await submitForm(formData);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    downloadBtn.disabled = false;
    downloadBtn.innerText = "Download Resume";
  });
};
