/**
 * config.js
 *
 * Nagy, this file is the single place for all app-wide constants.
 * The API key is imported from env.js which is gitignored — so this
 * file stays safe to commit.
 */

import { OPENAI_API_KEY } from "./env.js";

const CONFIG = Object.freeze({
  APP_NAME: "AI Chatbot",
  BOT_NAME: "Nagy's Bot",

  // Your OpenAI API key — loaded from the gitignored env.js
  OPENAI_API_KEY,

  // OpenAI endpoints
  CHAT_API_URL: "https://api.openai.com/v1/chat/completions",
  IMAGE_API_URL: "https://api.openai.com/v1/images/generations",  // dall-e-2, dall-e-3
  RESPONSES_API_URL: "https://api.openai.com/v1/responses",        // gpt-image-* models

  // Model choices — easy to upgrade in one place
  CHAT_MODEL: "gpt-5-nano",
  IMAGE_MODEL: "gpt-image-1-mini",
  IMAGE_SIZE: "1024x1024",  // used only for dall-e models
});

export default CONFIG;
