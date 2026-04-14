const buildWorkExperienceContext = (workExperience) => {
  const lines = ["\nWork Experience (use these exactly):"];
  workExperience.forEach((w, i) => {
    lines.push(
      `  [${i + 1}] ${w.job_title} at ${w.company_name} (${w.employment_type})`,
    );
    if (w.start_date) lines.push(`      Start: ${w.start_date}`);
    if (w.currently_working) lines.push(`      Currently working here`);
    else if (w.end_date) lines.push(`      End: ${w.end_date}`);
    if (w.description) lines.push(`      Description: ${w.description}`);
  });
  return lines.join("\n");
};

const buildEducationContext = (education) => {
  const lines = ["\nEducation (use these exactly):"];
  education.forEach((e, i) => {
    lines.push(
      `  [${i + 1}] ${e.education_level} — ${e.degree || ""} in ${
        e.field_of_study || ""
      } at ${e.institution_name}`,
    );
    if (e.start_date) lines.push(`      Start: ${e.start_date}`);
    if (e.end_date) lines.push(`      End: ${e.end_date}`);
  });
  return lines.join("\n");
};

export const buildUserContext = (userInfo) => {
  const parts = [];

  if (userInfo.email) parts.push(`Email: ${userInfo.email}`);
  if (userInfo.phone) parts.push(`Phone: ${userInfo.phone}`);
  if (userInfo.linkedin) parts.push(`LinkedIn: ${userInfo.linkedin}`);
  if (userInfo.workExperience.length > 0) {
    parts.push(buildWorkExperienceContext(userInfo.workExperience));
  }
  if (userInfo.education.length > 0) {
    parts.push(buildEducationContext(userInfo.education));
  }

  return parts.join("\n");
};
