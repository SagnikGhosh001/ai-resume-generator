export const parseUserInfo = (formData) => ({
  email: formData.get("email") || "",
  phone: formData.get("phone") || "",
  linkedin: formData.get("linkedin") || "",
  workExperience: JSON.parse(formData.get("work_experience") || "[]"),
  education: JSON.parse(formData.get("education") || "[]"),
});
