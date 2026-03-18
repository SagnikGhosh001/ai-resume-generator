export const tools = [
  {
    type: "function",
    function: {
      name: "get_user_profile",
      description: "Get the User Profile Data",
      parameters: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "Username of the user",
          },
        },
        required: ["username"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_repositories",
      description: "Get the User Repositories data",
      parameters: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "Username of the user",
          },
        },
        required: ["username"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_languages",
      description: "Get the Language used in the Repo",
      parameters: {
        type: "object",
        properties: {
          repo: {
            type: "string",
            description: "name of the repository",
          },
          username: {
            type: "string",
            description: "username of the user",
          },
        },
        required: ["username", "repo"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_stats",
      description: "Get the Stats of a user",
      parameters: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "username of the user",
          },
        },
        required: ["username"],
      },
    },
  },
];
