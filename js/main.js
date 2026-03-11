/**
 * main.js
 *
 * Nagy, this is the entry point of the entire application.
 * It should stay thin — its only jobs are:
 *   1. Wait for the DOM to be ready
 *   2. Initialize modules
 *   3. Show a welcome message so the chat doesn't start empty
 *
 * If you ever add routing, themes, or settings panels, wire them
 * here — but keep the actual logic in their own modules.
 */

import { initInputHandler } from "./ui/inputHandler.js";
import { initModelSelector, initImageModelSelector } from "./chat/modelManager.js";
import { renderMessage } from "./chat/messageRenderer.js";
import { addMessage } from "./chat/memoryStore.js";
import { scrollToBottom } from "./ui/scrollManager.js";
import CONFIG from "./config.js";

// Wait for the HTML to finish loading before touching the DOM
document.addEventListener("DOMContentLoaded", () => {
  initInputHandler();
  initModelSelector();       // populate header chat-model dropdown
  initImageModelSelector();  // populate footer image-model dropdown
  showWelcomeMessage();
  scrollToBottom();
});

// ─── Welcome message ─────────────────────────────────────────

function showWelcomeMessage() {
  const welcome = {
    role: "assistant",
    type: "text",
    content: `👋 Hi Nagy! I'm ${CONFIG.BOT_NAME}. Type a message and press Send, or click 🖼️ Image to generate a picture!`,
    timestamp: new Date(),
  };

  addMessage(welcome);
  renderMessage(welcome);
}
