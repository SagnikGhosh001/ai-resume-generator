import { runAgent } from "./open-router/agent/tool_runner.js";
import { tools } from "./open-router/tools/index.js";
import { parseUserInfo } from "./resume/form_parser.js";
import { createInitialMessages } from "./resume/messages.js";
import { parseResumeJson } from "./resume/parser.js";

const getResumeSchema = () => Deno.readTextFileSync("./data/resume.json");

export const generateResume = async (c) => {
  const formData = await c.req.formData();
  const username = formData.get("username");

  if (!username) return c.text("Provide Your Username", 400);

  const userInfo = parseUserInfo(formData);
  const resumeSchema = getResumeSchema();
  const messages = createInitialMessages(username, resumeSchema, userInfo);
  const resumeText = await runAgent(messages, tools);

  try {
    const resume = parseResumeJson(resumeText);
    return c.json(resume);
  } catch (e) {
    console.log(e.message);
    return c.text("Failed to parse AI response as JSON. Try again.", 500);
  }
};
