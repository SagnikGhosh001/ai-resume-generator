// Strips markdown code fences the AI sometimes wraps JSON in
export const parseResumeJson = (text) => {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/, "")
    .replace(/```\s*$/, "")
    .trim();
  return JSON.parse(cleaned);
};
