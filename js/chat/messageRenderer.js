/**
 * messageRenderer.js
 *
 * Nagy, this module is responsible for one thing: take a message
 * object and turn it into visible HTML inside the chat window.
 * It knows nothing about APIs or user input — it just renders.
 *
 * This separation of concerns is the key principle to understand here.
 */

import { messagesContainer } from "../ui/domElements.js";

/**
 * Renders a message object as a chat bubble in the messages area.
 * @param {{ role: string, type: string, content: string, timestamp: Date }} message
 */
function renderMessage(message) {
  const messageEl = createMessageWrapper(message.role);
  const bubbleEl = createBubble(message);
  const timestampEl = createTimestamp(message.timestamp);

  messageEl.appendChild(bubbleEl);
  messageEl.appendChild(timestampEl);
  messagesContainer.appendChild(messageEl);
}

// ─── Private helpers ──────────────────────────────────────────

/**
 * Creates the outer wrapper div with the correct alignment class.
 * @param {"user" | "assistant"} role
 * @returns {HTMLDivElement}
 */
function createMessageWrapper(role) {
  const div = document.createElement("div");
  div.classList.add("message", role);
  return div;
}

/**
 * Creates the bubble element containing either text or an image.
 * @param {{ type: string, content: string }} message
 * @returns {HTMLDivElement}
 */
function createBubble(message) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  if (message.type === "image") {
    bubble.appendChild(createImageElement(message.content));
  } else {
    bubble.textContent = message.content;
  }

  return bubble;
}

/**
 * Creates an <img> element for image messages.
 * @param {string} url
 * @returns {HTMLImageElement}
 */
function createImageElement(url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Generated image";
  img.loading = "lazy";
  return img;
}

/**
 * Creates a timestamp element showing the time the message was sent.
 * @param {Date} date
 * @returns {HTMLSpanElement}
 */
function createTimestamp(date) {
  const span = document.createElement("span");
  span.classList.add("timestamp");
  span.textContent = formatTime(date);
  return span;
}

/**
 * Formats a Date object to a short HH:MM string.
 * @param {Date} date
 * @returns {string}
 */
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export { renderMessage };
