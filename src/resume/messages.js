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
- Output ONLY a single valid JSON object.
- Do not wrap it in markdown fences.
- Do not add any explanation, commentary, preamble, or trailing text.
- Do not continue the JSON with extra sentences or fragments.
- Do not output the schema itself — use it only to know which fields exist.
- The output must contain at least these top-level sections: personal_info, summary, skills, work_experience, education, projects.
- personal_info must include at least full_name, email, phone, links, and address.
- summary must include professional_summary.
- skills must include technical_skills, soft_skills, tools, and languages.
- projects must be an array and should not be empty when repository data exists.
- Use the real GitHub data you gathered; fill unknowns with sensible defaults instead of null when appropriate.
- For text fields such as names, titles, and locations, prefer "Unknown" or an empty string if no data is available.
- For phone numbers and similar contact fields, prefer "Not provided" or an empty string.
- For arrays and lists, prefer [].
- Do not leave important sections empty when the data is available from GitHub.
- If repository and language data is available, populate skills.technical_skills and skills.languages with the detected languages and technologies.
- If repository data is available, populate projects with meaningful project summaries using repo names, descriptions, technologies, and URLs(When Possible).
- If the user provided personal details, use them for personal_info and summary sections.
- Output must be directly parseable by JSON.parse().
- Never invent usernames, repository names, IDs, or parameters.
- If a value was provided by the user, reuse it exactly.
- Use tool outputs as the source of truth.
- The GitHub username from the user request is authoritative and must be used for every GitHub tool call exactly as provided.
- If there is enough data not found mark it null, no need to call the tools again and again.
- If you are unsure about a field, use null or [] instead of guessing.
- The final answer must be the JSON object and nothing else.

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
Only use the tools that are needed. Do not call any tool if you do not need it.
Important: use the GitHub username from the request exactly for every GitHub tool call. Do not substitute or invent a different username.
When filling the final resume JSON, prioritize these sections using the available GitHub data: skills, projects, summary, and personal_info.
Do not leave skills.languages or skills.technical_skills empty if repository language or technology data was retrieved.
Do not leave projects empty if repository data exists; create project entries from the repositories.
Always include a projects array, even if it contains one or two simple entries derived from the repositories.
${
        userContext
          ? `\nUser-provided details (these take priority over GitHub data):\n${userContext}`
          : ""
      }`,
    },
  ];
};
