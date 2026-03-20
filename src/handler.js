import { runAgent } from "./open-router/agent/tool_runner.js";
import { tools } from "./open-router/tools/index.js";

const createInitialMessages = (username) => [
  {
    role: "system",
    content: `
You are a professional resume writer.
Generate a clean, concise, ATS-friendly resume.
Output in markdown format.
`,
  },
  {
    role: "user",
    content: `Generate a resume for GitHub username: ${username}`,
  },
];

export const downlaodResume = async (c) => {
  const formData = await c.req.formData();
  const username = formData.get("username");
  if (!username) {
    return c.text("Provide Your Username", 400);
  }
  const messages = createInitialMessages(username);
  const resume = await runAgent(messages, tools);
  return new Response(resume, {
    headers: {
      "Content-Type": "text/markdown",
      "Content-Disposition": `attachment; filename="${username}-resume.md"`,
    },
  });
};
