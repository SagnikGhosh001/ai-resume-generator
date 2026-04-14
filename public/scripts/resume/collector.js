const setByPath = (obj, pathStr, value) => {
  const keys = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".");
  const last = keys.pop();
  const target = keys.reduce((curr, key) => curr?.[key], obj);
  if (target != null) target[last] = value;
};

export const collectResume = (original) => {
  const resume = structuredClone(original);

  document.querySelectorAll("[data-path]").forEach((elem) => {
    const path = elem.dataset.path;
    const value = elem.textContent.trim();

    if (path.endsWith("._display")) {
      // skills.technical_skills[i]._display → update skills array
      const base = path.replace(/\._display$/, "");
      const names = value.split(",").map((s) => s.trim()).filter(Boolean);
      setByPath(resume, `${base}.skills`, names.map((name) => ({ name })));
    } else if (path === "skills._soft_display") {
      if (resume.skills) {
        resume.skills.soft_skills = value.split(",").map((s) => s.trim())
          .filter(Boolean);
      }
    } else if (path.endsWith("._tech_display")) {
      // projects[i]._tech_display → update technologies array
      const base = path.replace(/\._tech_display$/, "");
      const techs = value.split(",").map((s) => s.trim()).filter(Boolean);
      setByPath(resume, `${base}.technologies`, techs);
    } else {
      setByPath(resume, path, value);
    }
  });

  return resume;
};
