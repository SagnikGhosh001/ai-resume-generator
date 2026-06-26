import { normalizeResume } from "../normalize/normalize.js";

export const parseResumeJson = (text) => {
  const cleaned = String(text ?? "").trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("No JSON object found in model output");
  }

  const parsed = JSON.parse(jsonMatch[0]);
  return normalizeResume(parsed);
};
