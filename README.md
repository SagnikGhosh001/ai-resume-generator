# 🤖 AI Resume Generator (GitHub-Based)

An AI-powered resume generator that builds professional resumes using data from
a GitHub profile.

---

## 🚀 Features

- 🔍 Fetch GitHub user data
- 🧠 Extract top programming languages
- 📦 Analyze repositories and projects
- ⭐ Calculate total stars, forks, and contributions
- 📝 Generate AI-based resume summaries
- 📄 Export resume (PDF / Markdown / JSON)

---

## 🛠️ Tech Stack

- Backend: Node.js / Python
- APIs: GitHub REST API + GraphQL API
- AI: OpenAI / LLM
- Frontend: React (optional)

---

## 📡 GitHub API Endpoints Used

### 👤 User Profile

https://api.github.com/users/{username}

---

### 📦 Repositories

https://api.github.com/users/{username}/repos?per_page=100&type=owner&sort=updated

---

### 🧠 Languages (per repo)

https://api.github.com/repos/{username}/{repo}/languages

---

### ⭐ Starred Repositories

https://api.github.com/users/{username}/starred

---

### 🔥 User Activity (Events)

https://api.github.com/users/{username}/events

---

### 📊 Commits (per repo)

https://api.github.com/repos/{username}/{repo}/commits

---

### 🔀 Pull Requests (Search API)

https://api.github.com/search/issues?q=author:{username}+type:pr

---

### 🐛 Issues Created

https://api.github.com/search/issues?q=author:{username}+type:issue

---

### 🏢 Organizations

https://api.github.com/users/{username}/orgs

---

### 👥 Followers

https://api.github.com/users/{username}/followers

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/sagnikghosh001/ai-resume-generator.git
cd ai-resume-generator
```

---

### 2. Install dependencies

```bash
npm install
# or
pip install -r requirements.txt
```

---

### 3. Add GitHub Token (Recommended)

Create a `.env` file:

```
GITHUB_TOKEN=your_personal_access_token
```

---

### 4. Run the project

```bash
npm start
# or
python app.py
```

---

## ⚠️ Rate Limits

- Unauthenticated: 60 requests/hour
- Authenticated: 5000 requests/hour

Use a token to avoid hitting limits.

---

## 🧠 How It Works

1. Fetch user profile data
2. Fetch repositories
3. Aggregate languages across repos
4. Calculate stats (stars, forks, commits)
5. Use AI to generate resume content
6. Export formatted resume

---

## 📌 Future Improvements

- 📄 Resume templates
- 🌐 Portfolio website generator
- 🔗 LinkedIn integration
- 📊 Contribution graphs
- 🤖 Better AI summarization

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues for suggestions or bugs.

---

## 📜 License

MIT License
