# 🤖 Nagy's AI Chatbot

A **WhatsApp-style AI chatbot** web application built with pure HTML, CSS, and Vanilla JavaScript (ES Modules). No frameworks, no bundlers — just clean, beginner-friendly modular code.

---

## ✨ Features

- 💬 **WhatsApp-like chat UI** — chat bubbles, left/right alignment, timestamps
- 🧠 **Real AI responses** via OpenAI Chat Completions API (`gpt-*` models)
- 🖼️ **Image generation** via OpenAI DALL-E (`dall-e-2` / `dall-e-3`)
- 🔀 **Dynamic model selector** — fetches all available models from your API key at runtime
- 🗂️ **Chat memory** — full conversation history sent on every message for context-aware replies
- 📜 **Auto-scroll** to the latest message
- 🔒 **API key protection** — key stored in a gitignored `env.js` file

---

## 🗂️ Project Structure

```
/
├── index.html                  # App shell & layout
├── css/
│   └── style.css               # WhatsApp-style UI
└── js/
    ├── main.js                 # Entry point — wires all modules
    ├── config.js               # App-wide constants & model defaults
    ├── env.js                  # 🔒 API key (gitignored — never committed)
    ├── env.example.js          # Template — copy this to env.js
    ├── api/
    │   ├── chatApi.js          # OpenAI Chat Completions fetch
    │   ├── imageApi.js         # OpenAI Image Generation fetch
    │   └── modelsApi.js        # Fetches available models from the API
    ├── chat/
    │   ├── chatManager.js      # Coordinates send → respond → render flow
    │   ├── messageRenderer.js  # Builds chat bubble DOM elements
    │   ├── memoryStore.js      # Stores chat history in a private array
    │   └── modelManager.js     # Selected model state + dropdown init
    └── ui/
        ├── domElements.js      # Cached DOM references
        ├── inputHandler.js     # Input events (send, Enter, image button)
        └── scrollManager.js    # Auto-scroll to bottom
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ged0oo/ai-chatbot.git
cd ai-chatbot
```

### 2. Set up your API key

```bash
cp js/env.example.js js/env.js
```

Open `js/env.js` and replace the placeholder with your real OpenAI API key:

```js
export const OPENAI_API_KEY = "sk-proj-YOUR_KEY_HERE";
```

> ⚠️ **`js/env.js` is listed in `.gitignore` and will never be committed.** Never paste your real key anywhere else.

### 3. Open in browser

No build step or server required. Just open `index.html` directly in any modern browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html
```

> **Note:** Because the app uses ES Modules with `fetch()`, some browsers require a local server context. If you see CORS or module errors when opening as a `file://` URL, serve it with:
> ```bash
> npx serve .
> # or
> python3 -m http.server 8080
> ```

---

## 🔑 API Key Requirements

This app uses the [OpenAI API](https://platform.openai.com/). You need:

- An OpenAI account with a valid API key
- Access to at least one `gpt-*` chat model (e.g. `gpt-3.5-turbo`)
- Access to a DALL-E image model (`dall-e-2` or `dall-e-3`) for image generation

> The model dropdowns are populated **dynamically** based on what your API key can access.

---

## 🧱 Architecture

Each module has a single responsibility:

| Layer | Module | Job |
|---|---|---|
| **API** | `chatApi.js` | POST to `/v1/chat/completions` |
| **API** | `imageApi.js` | POST to `/v1/images/generations` |
| **API** | `modelsApi.js` | GET `/v1/models`, filter by capability |
| **Chat** | `chatManager.js` | Orchestrate user→API→render flow |
| **Chat** | `messageRenderer.js` | Build bubble DOM nodes |
| **Chat** | `memoryStore.js` | Private array of message history |
| **Chat** | `modelManager.js` | Hold selected model state, init dropdowns |
| **UI** | `domElements.js` | Cached `getElementById` calls |
| **UI** | `inputHandler.js` | Click & keydown listeners |
| **UI** | `scrollManager.js` | `scrollTop = scrollHeight` |

---

## 💬 Message Structure

Every message in the history follows this shape:

```js
{
  role:      "user" | "assistant",
  type:      "text" | "image",
  content:   string,       // text or image URL
  timestamp: Date
}
```

---

## ⚠️ Known Limitations

- **Image generation** requires a DALL-E-enabled API key. Some project tiers only have access to `dall-e-2`. See [issue #1](../../issues/1).
- The app runs entirely in the browser — the API key is visible to anyone who opens DevTools. For production use, route API calls through a backend proxy.
- ES Modules opened as `file://` may be blocked by some browsers' CORS policy — use a local server in that case.

---

## 🛠️ Tech Stack

| | |
|---|---|
| HTML5 | Semantic markup |
| CSS3 | Flexbox layout, WhatsApp color palette |
| JavaScript | Vanilla ES Modules, async/await, Fetch API |
| OpenAI API | Chat Completions + Image Generation |

---

## 📄 License

MIT
