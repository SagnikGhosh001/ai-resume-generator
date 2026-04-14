const cloneTemplate = () =>
  document.querySelector("#tpl-work-entry").content.cloneNode(true)
    .querySelector(".entry");

const bindToggleEndDate = (entry) => {
  const checkbox = entry.querySelector(".we-current");
  const endDateField = entry.querySelector(".end-date-field");
  checkbox.addEventListener("change", () => {
    endDateField.style.display = checkbox.checked ? "none" : "";
  });
};

const bindRemove = (entry) =>
  entry.querySelector(".remove-btn").addEventListener(
    "click",
    () => entry.remove(),
  );

export const createWorkEntry = (count) => {
  const entry = cloneTemplate();
  entry.querySelector(".entry-label").textContent = `Work Experience #${count}`;
  bindToggleEndDate(entry);
  bindRemove(entry);
  return entry;
};

const readEntry = (entry) => ({
  company_name: entry.querySelector(".we-company").value.trim(),
  job_title: entry.querySelector(".we-title").value.trim(),
  employment_type: entry.querySelector(".we-type").value,
  start_date: entry.querySelector(".we-start").value,
  end_date: entry.querySelector(".we-current").checked
    ? null
    : entry.querySelector(".we-end").value,
  currently_working: entry.querySelector(".we-current").checked,
  description: entry.querySelector(".we-desc").value.trim(),
});

export const collectWorkExperience = () =>
  Array.from(document.querySelectorAll("#work-entries .entry"))
    .map(readEntry)
    .filter((e) => e.company_name || e.job_title);
