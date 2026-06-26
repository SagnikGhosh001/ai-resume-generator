import { callModel } from "../open_router.js";
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

const summarizeUserProfile = (result) => ({
  login: result.login,
  name: result.name,
  bio: result.bio,
  public_repos: result.public_repos,
  followers: result.followers,
  following: result.following,
  location: result.location,
  blog: result.blog,
  company: result.company,
});

const summarizeRepositories = (result) => {
  const repos = Array.isArray(result) ? result : [];

  return repos
    .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
    .slice(0, 8)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      topics: repo.topics ?? [],
    }));
};

const summarizeStats = (result) => {
  const events = Array.isArray(result) ? result : [];

  return {
    total_events: events.length,
    push_events: events.filter((event) => event.type === "PushEvent").length,
    pull_request_events: events.filter(
      (event) => event.type === "PullRequestEvent",
    ).length,
    issue_events: events.filter((event) => event.type === "IssuesEvent").length,
    last_activity: events[0]?.created_at ?? null,
  };
};

const summarizeToolResult = (name, result) => {
  switch (name) {
    case "get_user_profile":
      return summarizeUserProfile(result);
    case "get_repositories":
      return summarizeRepositories(result);
    case "get_languages":
      return result;
    case "get_stats":
      return summarizeStats(result);
    default:
      return result;
  }
};

export const runAgent = async (messages, tools) => {
  while (true) {
    const message = await callModel(messages, tools);

    messages.push(message);

    if (!message.tool_calls) {
      return message.content;
    }

    for (const toolCall of message["tool_calls"]) {
      const { name, arguments: args } = toolCall.function;

      console.log("Tool called:", name, args);
      if (!TOOL_CALLS[name]) throw new Error(`Unknown tool: ${name}`);

      const result = await TOOL_CALLS[name](args);
      const summary = summarizeToolResult(name, result);

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        tool_name: name,
        content: JSON.stringify(summary),
      });
    }
  }
};
