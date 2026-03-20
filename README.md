# 🤖 AI Resume Generator (GitHub-Based)

Generate professional, ATS-friendly resumes instantly using your GitHub profile.

This project analyzes your repositories, languages, and contributions, then uses
AI to create a clean, structured resume — ready to download.

---

## 🚀 Features

- 🔍 Fetch GitHub user data
- 🧠 Analyze top programming languages
- 📦 Extract project insights from repositories
- ⭐ Calculate stars, forks, and activity
- 📝 Generate AI-powered resume summaries
- 📄 Download resume (Markdown, extendable to PDF)
- ⚡ Fast and lightweight backend (Deno + Hono)

---

## 🛠️ Tech Stack

### Backend

- 🦕 Deno
- 🔥 Hono

### AI

- 🤖 OpenRouter SDK

### APIs

- 📡 GitHub REST API

### Frontend

- 🌐 Vanilla JavaScript

---

## 📂 Project Structure

```
.
├── main.js              # Entry point
├── deno.json            # Deno config
├── src/
│   ├── app.js           # Hono app setup
│   ├── handler.js       # Route handlers (download logic)
│   └── open-router/
│       ├── open_router.js     # OpenRouter client setup
│       ├── agent/
│       │   └── tool_runner.js # Agent loop (LLM + tools)
│       └── tools/
│           ├── github.js      # GitHub API functions
│           └── index.js       # Tool definitions
│
├── public/              # Frontend
│   ├── index.html
│   ├── scripts/
│   │   └── main.js
│   └── styles/
│       └── style.css
│
├── hooks/               # Git hooks (pre-commit)
└── setup/               # Setup scripts (optional)
```

---

## ⚙️ Setup

### 1. Clone the repository

```
git clone https://github.com/sagnikghosh001/ai-resume-generator.git
cd ai-resume-generator
```

---

### 2. Run the project

```
deno task dev
```

---

### 3. Environment Variables

Create a `.env` file:

```
OPEN_ROUTER_API_KEY=your_api_key
GITHUB_TOKEN=your_github_token
```

---

## 🌐 Usage

1. Open `http://localhost:8000`
2. Enter your GitHub username
3. Click **Download Resume**
4. Resume is generated and downloaded automatically

---

## 🧠 How It Works

1. Frontend sends username via form
2. Backend (Hono) receives request
3. GitHub data is fetched using tools
4. Agent (`tool_runner`) orchestrates LLM + tools
5. Resume is generated using AI
6. File is returned with download headers

---

## ⚠️ Rate Limits

### GitHub API

- 60 requests/hour (unauthenticated)
- 5000 requests/hour (with token)

### OpenRouter

- Free tier has strict daily limits
- Multiple agent steps = multiple API calls

👉 Optimize by minimizing LLM calls

---

## 🔮 Future Improvements

- 📄 PDF export with styling
- 🎨 Resume templates
- 🌐 Portfolio generator
- 🔗 LinkedIn integration
- ⚡ Caching GitHub data
- 🧠 Single-call AI optimization (reduce cost)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch
3. Submit a pull request

---

## 💡 Note

This project uses an **agent-based architecture**, combining:

- Tool calling (GitHub APIs)
- LLM reasoning (OpenRouter)

For production use, consider reducing multiple LLM calls to avoid rate limits.

---
