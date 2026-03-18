export const getUserProfile = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  return res.json();
};

export const getRepositories = async (username) => {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos`,
  );
  return res.json();
};

export const getLanguages = async (username, repo) => {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/languages`,
  );
  return res.json();
};

export const getStats = async (username) => {
  const res = await fetch(
    `https://api.github.com/users/${username}/events`,
  );
  return res.json();
};
