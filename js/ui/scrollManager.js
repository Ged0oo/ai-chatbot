/**
 * scrollManager.js
 *
 * Nagy, this tiny module has one job: scroll the chat window to the
 * bottom so the newest message is always visible.
 * Small, focused functions like this are easy to test and reuse.
 */

import { messagesContainer } from "./domElements.js";

/**
 * Scrolls the messages container to the very bottom.
 * Called every time a new message is rendered.
 */
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export { scrollToBottom };
