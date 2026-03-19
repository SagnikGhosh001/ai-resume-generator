export const getUserProfile = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
      Accept: "application/vnd.github+json",
    },
  });
  return res.json();
};

export const getRepositories = async (username) => {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  return res.json();
};

export const getLanguages = async (username, repo) => {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/languages`,
    {
      headers: {
        Authorization: `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  return res.json();
};

export const getStats = async (username) => {
  const res = await fetch(
    `https://api.github.com/users/${username}/events`,
    {
      headers: {
        Authorization: `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  return res.json();
};
