# AI Resume Generator

Generate professional, ATS-friendly resumes from your GitHub profile using an AI agent.

The app fetches your repositories, languages, and contribution stats via GitHub tools, passes them to an LLM (via OpenRouter), and produces a structured resume. You can review and edit the result in the browser before downloading as PDF.

---

## Features

- Fetches real GitHub data — profile, repos, languages, stats
- AI agent orchestrates tool calls before generating the resume
- Resume preview page with inline editing (click any field to edit)
- Download as PDF (server-side, via PDFKit)
- Accepts user-supplied data — phone, email, LinkedIn, work experience, education — which always takes priority over inferred data
- Fast, lightweight backend (Deno + Hono)

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Runtime   | Deno                              |
| Backend   | Hono                              |
| AI        | OpenRouter SDK (free LLM tier)    |
| PDF       | PDFKit                            |
| APIs      | GitHub REST API                   |
| Frontend  | Vanilla JS (ES modules)           |

---

## Project Structure

```
.
├── main.js                        # Entry point
├── deno.json                      # Deno config + dependencies
│
├── data/
│   └── resume.json                # JSON schema defining resume shape
│
├── src/
│   ├── app.js                     # Hono app + route definitions
│   ├── handler.js                 # POST /generate — runs agent, returns JSON
│   │
│   ├── resume/
│   │   ├── messages.js            # System prompt + initial message builder
│   │   ├── context.js             # Formats user-provided data for the prompt
│   │   ├── form_parser.js         # Parses multipart form → userInfo object
│   │   └── parser.js              # Strips markdown fences, parses AI JSON output
│   │
│   ├── download/
│   │   └── pdf.js                 # POST /download/pdf — PDFKit resume builder
│   │
│   └── open-router/
│       ├── open_router.js         # OpenRouter client
│       ├── agent/
│       │   └── tool_runner.js     # Agent loop — LLM + tool execution
│       └── tools/
│           ├── github.js          # GitHub API functions
│           └── index.js           # Tool definitions (function calling schema)
│
└── public/                        # Static frontend (served by Hono)
    ├── index.html                 # Input form
    ├── resume.html                # Resume preview + edit + download
    │
    ├── scripts/
    │   ├── main.js                # Form page init
    │   ├── submit.js              # POST /generate, redirect to /resume
    │   ├── entries/
    │   │   ├── work.js            # Work experience entry (create + collect)
    │   │   └── education.js       # Education entry (create + collect)
    │   └── resume/
    │       ├── main.js            # Resume page init
    │       ├── renderer.js        # Renders JSON sections as editable DOM
    │       ├── collector.js       # Reads edited DOM back into JSON
    │       └── downloader.js      # POST /download/pdf + trigger download
    │
    └── styles/
        ├── style.css              # Input form styles
        └── resume.css             # Resume preview styles
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/sagnikghosh001/ai-resume-generator.git
cd ai-resume-generator
```

### 2. Set environment variables

Create a `.env` file in the project root:

```env
OPEN_ROUTER_API_KEY=your_openrouter_api_key
GITHUB_TOKEN=your_github_token
```

`GITHUB_TOKEN` is optional but increases the GitHub API rate limit from 60 to 5000 requests/hour.

### 3. Run

```bash
deno task dev
```

Server starts at `http://localhost:8000`.

---

## Usage

1. Open `http://localhost:8000`
2. Enter your GitHub username
3. Optionally fill in contact info, work experience, and education
4. Click **Download Resume**
5. Wait while the AI agent fetches your GitHub data and generates the resume
6. You are redirected to the resume preview page
7. Click any field to edit it inline
8. Click **Download PDF** to get the final PDF

---

## How It Works

```
Form submit
  → POST /generate
    → Agent loop (tool_runner.js)
        Phase 1: call GitHub tools
          get_user_profile → get_repositories → get_stats → get_languages
        Phase 2: LLM generates filled resume JSON
  → JSON returned to browser
  → Stored in sessionStorage, redirect to /resume

/resume page
  → Renders JSON as editable HTML (renderer.js)
  → User edits fields inline
  → Click Download PDF
      → collectResume() reads edited DOM back to JSON
      → POST /download/pdf
          → PDFKit builds PDF server-side
      → PDF downloaded
```

---

## API Endpoints

| Method | Path            | Description                                      |
|--------|-----------------|--------------------------------------------------|
| POST   | `/generate`     | Accepts form data, returns resume JSON           |
| POST   | `/download/pdf` | Accepts `{ resume }` JSON body, returns PDF file |
| GET    | `/resume`       | Serves the resume preview page                   |
| GET    | `*`             | Serves static files from `public/`               |

---

## Rate Limits

### GitHub API
- 60 requests/hour without a token
- 5000 requests/hour with `GITHUB_TOKEN`

### OpenRouter (free tier)
- Each resume generation makes several API calls (one per tool call + one final call)
- Free models have daily/per-minute request limits

---

## Planned Improvements

- Resume templates / themes
- Additional download formats (DOCX, Markdown)
- LinkedIn profile integration
- GitHub data caching to reduce API calls
- Multi-language resume support
