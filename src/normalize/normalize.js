export const normalizeToolSkill = (skills) =>
  skills.tools
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => ({ name: item }));

export const normalizeLanguageSkill = (skills) =>
  skills.languages
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      name: item.name ?? "",
      proficiency: item.proficiency ?? "Intermediate",
    })).filter((item) => item.name);

const ensureArray = (value) => Array.isArray(value) ? value : [];

const normalizeSkills = (resume) => {
  const skills = resume.skills ?? {};
  skills.technical_skills = ensureArray(skills.technical_skills);
  skills.soft_skills = ensureArray(skills.soft_skills);
  skills.tools = ensureArray(skills.tools);
  skills.languages = ensureArray(skills.languages);

  if (!skills.technical_skills.length) {
    const createFallback = newFunction(skills);
    skills.technical_skills = createFallback;
  }

  resume.skills = skills;
  return resume;
};

const normalizeProjects = (resume) => {
  const projects = ensureArray(resume.projects);
  if (projects.length) {
    resume.projects = projects;
    return resume;
  }

  const summaryText = resume.summary?.professional_summary || "";
  const technologies = (resume.skills?.languages ?? [])
    .map((lang) => lang?.name)
    .filter(Boolean);

  resume.projects = [{
    title: "Featured Projects",
    description: summaryText ||
      "Built and maintained software projects using the listed technologies.",
    technologies,
  }];

  return resume;
};

const normalizePersonalInfo = (resume) => {
  const personalInfo = resume.personal_info ?? {};
  const fullName = personalInfo.full_name ||
    [personalInfo.first_name, personalInfo.last_name].join(" ").trim();

  personalInfo.full_name = fullName || "Unknown";
  personalInfo.links = personalInfo.links ?? {};
  personalInfo.address = personalInfo.address ?? {};
  resume.personal_info = personalInfo;
  return resume;
};

export const normalizeResume = (resume) => {
  if (!resume || typeof resume !== "object") return resume;
  return normalizeProjects(normalizeSkills(normalizePersonalInfo(resume)));
};

const newFunction = (skills) => {
  const languageSkills = normalizeLanguageSkill(skills);
  const toolSkills = normalizeToolSkill(skills);
  const fallback = [];
  fallback.push({
    category: "Programming Languages",
    skills: languageSkills,
  });

  fallback.push({ category: "Tools", skills: toolSkills });
  return fallback;
};
