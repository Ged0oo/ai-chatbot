/**
 * inputHandler.js
 *
 * Nagy, this module is responsible only for user input events.
 * It reads from the input field, validates (non-empty), calls
 * chatManager, and resets the field. Nothing else happens here.
 *
 * We disable the buttons while waiting for the bot reply to prevent
 * duplicate sends — a common UX detail beginners often forget.
 */

import { messageInput, sendButton, imageButton } from "./domElements.js";
import { sendTextMessage, sendImageRequest } from "../chat/chatManager.js";

/**
 * Attaches all input-related event listeners.
 * Call this once from main.js after the DOM is ready.
 */
function initInputHandler() {
  sendButton.addEventListener("click", handleSend);
  imageButton.addEventListener("click", handleImageGenerate);

  // Allow pressing Enter to send (Shift+Enter is left as plain text)
  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  });
}

// ─── Private handlers ─────────────────────────────────────────

async function handleSend() {
  const text = messageInput.value.trim();

  if (!text) return; // Ignore empty sends

  clearInput();
  setButtonsDisabled(true);

  await sendTextMessage(text);

  setButtonsDisabled(false);
  messageInput.focus();
}

async function handleImageGenerate() {
  // Use whatever is typed as the image prompt; fall back to a default
  const prompt = messageInput.value.trim() || "A beautiful landscape, digital art";

  clearInput();
  setButtonsDisabled(true);

  await sendImageRequest(prompt);

  setButtonsDisabled(false);
  messageInput.focus();
}

// ─── Helpers ─────────────────────────────────────────────────

function clearInput() {
  messageInput.value = "";
}

function setButtonsDisabled(isDisabled) {
  sendButton.disabled = isDisabled;
  imageButton.disabled = isDisabled;
}

export { initInputHandler };
