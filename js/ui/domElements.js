/**
 * domElements.js
 *
 * Nagy, this module queries the DOM once and exports the results.
 * Every other module imports from here instead of calling
 * querySelector themselves. This keeps DOM access in one place
 * and makes changes easy — update the selector here, fixed everywhere.
 */

export const messagesContainer = document.getElementById("messages");
export const messageInput = document.getElementById("message-input");
export const sendButton = document.getElementById("send-button");
export const imageButton = document.getElementById("image-button");
export const modelSelect = document.getElementById("model-select");
export const imageModelSelect = document.getElementById("image-model-select");
