const el = (tag, className, ...children) => {
  const elem = document.createElement(tag);
  if (className) elem.className = className;
  for (const child of children) {
    if (child == null) continue;
    elem.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child,
    );
  }
  return elem;
};

export const editable = (value, path) => {
  const span = document.createElement("span");
  span.className = "editable";
  span.contentEditable = "true";
  span.dataset.path = path;
  span.textContent = String(value ?? "");
  return span;
};

const sectionHeader = (title) => {
  const div = el("div", "section-header");
  div.appendChild(el("h2", "section-title", title));
  return div;
};

const renderPersonalInfo = (info = {}) => {
  const section = el("div", "resume-header");
  section.appendChild(
    el(
      "div",
      "resume-name",
      editable(info.full_name, "personal_info.full_name"),
    ),
  );
  if (info.headline) {
    section.appendChild(
      el(
        "div",
        "resume-headline",
        editable(info.headline, "personal_info.headline"),
      ),
    );
  }
  const contacts = el("div", "resume-contacts");
  const contactFields = [
    [info.email, "personal_info.email"],
    [info.phone, "personal_info.phone"],
    [info.links?.linkedin, "personal_info.links.linkedin"],
    [info.links?.github, "personal_info.links.github"],
  ];
  contactFields.forEach(([val, path]) => {
    if (val) {
      contacts.appendChild(el("span", "contact-item", editable(val, path)));
    }
  });
  if (contacts.children.length) section.appendChild(contacts);
  return section;
};

const renderSummary = (summary = {}) => {
  if (!summary.professional_summary) return null;
  const section = el("div", "resume-section");
  section.appendChild(sectionHeader("Summary"));
  section.appendChild(
    el(
      "p",
      "summary-text",
      editable(summary.professional_summary, "summary.professional_summary"),
    ),
  );
  return section;
};

const renderWorkExperience = (workExp = []) => {
  if (!workExp.length) return null;
  const section = el("div", "resume-section");
  section.appendChild(sectionHeader("Work Experience"));
  workExp.forEach((w, i) => {
    const base = `work_experience[${i}]`;
    const entry = el("div", "entry-block");

    const row1 = el("div", "entry-row");
    row1.appendChild(
      el(
        "span",
        "entry-primary",
        editable(w.company_name, `${base}.company_name`),
      ),
    );
    const dates = el("span", "entry-dates");
    dates.appendChild(editable(w.start_date, `${base}.start_date`));
    dates.appendChild(document.createTextNode(" – "));
    dates.appendChild(
      w.currently_working
        ? document.createTextNode("Present")
        : editable(w.end_date, `${base}.end_date`),
    );
    row1.appendChild(dates);
    entry.appendChild(row1);

    entry.appendChild(
      el(
        "div",
        "entry-secondary",
        editable(w.job_title, `${base}.job_title`),
        "  ·  ",
        editable(w.employment_type, `${base}.employment_type`),
      ),
    );
    if (w.description) {
      entry.appendChild(
        el("p", "entry-desc", editable(w.description, `${base}.description`)),
      );
    }
    section.appendChild(entry);
  });
  return section;
};

const renderEducation = (education = []) => {
  if (!education.length) return null;
  const section = el("div", "resume-section");
  section.appendChild(sectionHeader("Education"));
  education.forEach((e, i) => {
    const base = `education[${i}]`;
    const entry = el("div", "entry-block");

    const row1 = el("div", "entry-row");
    row1.appendChild(
      el(
        "span",
        "entry-primary",
        editable(e.institution_name, `${base}.institution_name`),
      ),
    );
    const dates = el("span", "entry-dates");
    dates.appendChild(editable(e.start_date, `${base}.start_date`));
    dates.appendChild(document.createTextNode(" – "));
    dates.appendChild(editable(e.end_date, `${base}.end_date`));
    row1.appendChild(dates);
    entry.appendChild(row1);

    entry.appendChild(
      el(
        "div",
        "entry-secondary",
        editable(e.education_level, `${base}.education_level`),
        " · ",
        editable(e.degree, `${base}.degree`),
        " in ",
        editable(e.field_of_study, `${base}.field_of_study`),
      ),
    );
    section.appendChild(entry);
  });
  return section;
};

const renderSkills = (skills = {}) => {
  const hasTech = skills.technical_skills?.length;
  const hasSoft = skills.soft_skills?.length;
  if (!hasTech && !hasSoft) return null;
  const section = el("div", "resume-section");
  section.appendChild(sectionHeader("Skills"));

  if (hasTech) {
    skills.technical_skills.forEach((cat, i) => {
      const base = `skills.technical_skills[${i}]`;
      const row = el("div", "skill-row");
      row.appendChild(
        el(
          "span",
          "skill-category",
          editable(cat.category, `${base}.category`),
          ": ",
        ),
      );
      const names = cat.skills?.map((s) => s.name).join(", ") || "";
      row.appendChild(
        el("span", "skill-list", editable(names, `${base}._display`)),
      );
      section.appendChild(row);
    });
  }
  if (hasSoft) {
    const row = el("div", "skill-row");
    row.appendChild(el("span", "skill-category", "Soft Skills: "));
    row.appendChild(
      el(
        "span",
        "skill-list",
        editable(skills.soft_skills.join(", "), "skills._soft_display"),
      ),
    );
    section.appendChild(row);
  }
  return section;
};

const renderProjects = (projects = []) => {
  if (!projects.length) return null;
  const section = el("div", "resume-section");
  section.appendChild(sectionHeader("Projects"));
  projects.forEach((p, i) => {
    const base = `projects[${i}]`;
    const entry = el("div", "entry-block");

    const row1 = el("div", "entry-row");
    row1.appendChild(
      el("span", "entry-primary", editable(p.title, `${base}.title`)),
    );
    if (p.start_date) {
      const dates = el("span", "entry-dates");
      dates.appendChild(editable(p.start_date, `${base}.start_date`));
      if (p.end_date) {
        dates.appendChild(document.createTextNode(" – "));
        dates.appendChild(editable(p.end_date, `${base}.end_date`));
      }
      row1.appendChild(dates);
    }
    entry.appendChild(row1);

    if (p.description) {
      entry.appendChild(
        el("p", "entry-desc", editable(p.description, `${base}.description`)),
      );
    }
    if (p.technologies?.length) {
      entry.appendChild(
        el(
          "div",
          "entry-tech",
          el("span", "skill-category", "Tech: "),
          editable(p.technologies.join(", "), `${base}._tech_display`),
        ),
      );
    }
    section.appendChild(entry);
  });
  return section;
};

export const renderResume = (resume) => {
  const container = document.createElement("div");
  container.className = "resume-document";

  [
    renderPersonalInfo(resume.personal_info),
    renderSummary(resume.summary),
    renderWorkExperience(resume.work_experience),
    renderEducation(resume.education),
    renderSkills(resume.skills),
    renderProjects(resume.projects),
  ].forEach((s) => {
    if (s) container.appendChild(s);
  });

  return container;
};
