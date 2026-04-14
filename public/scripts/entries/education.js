const cloneTemplate = () =>
  document.querySelector("#tpl-education-entry").content.cloneNode(true)
    .querySelector(".entry");

const bindRemove = (entry) =>
  entry.querySelector(".remove-btn").addEventListener(
    "click",
    () => entry.remove(),
  );

export const createEducationEntry = (count) => {
  const entry = cloneTemplate();
  entry.querySelector(".entry-label").textContent = `Education #${count}`;
  bindRemove(entry);
  return entry;
};

const readEntry = (entry) => ({
  institution_name: entry.querySelector(".ed-institution").value.trim(),
  education_level: entry.querySelector(".ed-level").value,
  degree: entry.querySelector(".ed-degree").value.trim(),
  field_of_study: entry.querySelector(".ed-field").value.trim(),
  start_date: entry.querySelector(".ed-start").value,
  end_date: entry.querySelector(".ed-end").value,
});

export const collectEducation = () =>
  Array.from(document.querySelectorAll("#education-entries .entry"))
    .map(readEntry)
    .filter((e) => e.institution_name);
