import { callOpenRouter } from "../open_router.js";
import {
  getLanguages,
  getRepositories,
  getStats,
  getUserProfile,
} from "../tools/github.js";

const TOOL_CALLS = {
  get_user_profile: (args) => getUserProfile(args.username),
  get_repositories: (args) => getRepositories(args.username),
  get_languages: (args) => getLanguages(args.username, args.repo),
  get_stats: (args) => getStats(args.username),
};

export const runAgent = async (messages, tools) => {
  while (true) {
    const message = await callOpenRouter(messages, tools);
    messages.push(message);

    if (!message.toolCalls) return message.content;

    for (const toolCall of message.toolCalls) {
      const { name, arguments: argsStr } = toolCall.function;
      const args = JSON.parse(argsStr);

      console.log("Tool called:", name, args) ;
      if (!TOOL_CALLS[name]) throw new Error(`Unknown tool: ${name}`);

      const result = await TOOL_CALLS[name](args);

      messages.push({
        role: "tool",
        toolCallId: toolCall.id,
        name,
        content: JSON.stringify(result),
      });
    }
  }
};
