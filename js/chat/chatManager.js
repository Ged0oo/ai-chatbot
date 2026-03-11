/**
 * chatManager.js
 *
 * Nagy, this is the coordinator module. It connects all the pieces:
 * memory, rendering, scrolling, and API calls. It doesn't know about
 * the DOM input — that's inputHandler's job. It just receives text
 * or a request and orchestrates the full send → respond → render flow.
 *
 * Notice the async/await pattern: each step waits for the previous
 * one to finish, making the logic easy to read top-to-bottom.
 */

import { addMessage, getMessages } from "./memoryStore.js";
import { renderMessage } from "./messageRenderer.js";
import { scrollToBottom } from "../ui/scrollManager.js";
import { getChatResponse } from "../api/chatApi.js";
import { getImageUrl } from "../api/imageApi.js";

/**
 * Handles the full lifecycle of sending a text message:
 * 1. Store and render the user message
 * 2. Build the conversation history and send to OpenAI
 * 3. Store and render the bot reply
 * 4. Scroll to bottom
 *
 * @param {string} text - The user's input text
 */
async function sendTextMessage(text) {
  const userMessage = buildMessage("user", "text", text);
  addMessage(userMessage);
  renderMessage(userMessage);
  scrollToBottom();

  try {
    // Build history in the shape OpenAI expects: [{ role, content }]
    // Only include text messages — images can't be sent as history context
    const history = getMessages()
      .filter((m) => m.type === "text")
      .map((m) => ({ role: m.role, content: m.content }));

    const replyText = await getChatResponse(history);

    const botMessage = buildMessage("assistant", "text", replyText);
    addMessage(botMessage);
    renderMessage(botMessage);
  } catch (error) {
    const errorMessage = buildMessage("assistant", "text", `⚠️ Error: ${error.message}`);
    renderMessage(errorMessage);
  }

  scrollToBottom();
}

/**
 * Handles the full lifecycle of an image generation request:
 * 1. Store and render the user trigger message
 * 2. Send the prompt to DALL-E
 * 3. Store and render the bot image reply
 * 4. Scroll to bottom
 *
 * @param {string} [prompt] - Optional custom image description
 */
async function sendImageRequest(prompt = "A beautiful landscape, digital art") {
  const userMessage = buildMessage("user", "text", `Generate image: ${prompt}`);
  addMessage(userMessage);
  renderMessage(userMessage);
  scrollToBottom();

  try {
    const imageUrl = await getImageUrl(prompt);

    const botMessage = buildMessage("assistant", "image", imageUrl);
    addMessage(botMessage);
    renderMessage(botMessage);
  } catch (error) {
    const errorMessage = buildMessage("assistant", "text", `⚠️ Image error: ${error.message}`);
    renderMessage(errorMessage);
  }

  scrollToBottom();
}

// ─── Helpers ─────────────────────────────────────────────────

/**
 * Builds a message object following the standard structure.
 * @param {"user" | "assistant"} role
 * @param {"text" | "image"} type
 * @param {string} content
 * @returns {{ role: string, type: string, content: string, timestamp: Date }}
 */
function buildMessage(role, type, content) {
  return { role, type, content, timestamp: new Date() };
}

export { sendTextMessage, sendImageRequest };
