import { buildUserContext } from "./context.js";

const SYSTEM_PROMPT = (resumeSchema) => `
You are a professional resume data generator. You work in two phases:

PHASE 1 — Gather data using tools:
Call these tools before generating anything:
1. get_user_profile    — basic profile (name, bio, location, email, website)
2. get_repositories    — list of repos with descriptions and topics
3. get_stats           — contribution stats
4. get_languages       — call this for each major repo to identify skills

PHASE 2 — Generate the resume JSON:
Only after gathering data from all tools, output a single filled JSON object.

Rules for the JSON output:
- Output ONLY the JSON object — no markdown, no explanation, no extra text
- Do NOT output the schema itself — use it only to know which fields exist
- Use the real GitHub data you gathered; fill unknowns with null or []
- Output must be directly parseable by JSON.parse()

Schema (defines available fields — fill them with real values):
${resumeSchema}
`;

export const createInitialMessages = (username, resumeSchema, userInfo) => {
  const userContext = buildUserContext(userInfo);

  return [
    {
      role: "system",
      content: SYSTEM_PROMPT(resumeSchema),
    },
    {
      role: "user",
      content: `Generate a resume for GitHub username: ${username}.

Step 1: Call get_user_profile, get_repositories, get_stats, and get_languages on the key repos.
Step 2: Once you have the GitHub data, produce the final resume JSON.
${
        userContext
          ? `\nUser-provided details (these take priority over GitHub data):\n${userContext}`
          : ""
      }`,
    },
  ];
};
