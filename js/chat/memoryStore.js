/**
 * memoryStore.js
 *
 * Nagy, this is the single source of truth for chat history.
 * Messages are stored in a private array — no other module can
 * access it directly. They must go through the exported functions.
 * This pattern is called "encapsulation" — a key concept to learn.
 */

// Private array — not exported, not accessible from outside
const messages = [];

/**
 * Adds a message object to the history.
 * @param {{ role: string, type: string, content: string, timestamp: Date }} message
 */
function addMessage(message) {
  messages.push(message);
}

/**
 * Returns a copy of all stored messages.
 * We return a copy so callers can't accidentally mutate the store.
 * @returns {Array}
 */
function getMessages() {
  return [...messages];
}

export { addMessage, getMessages };
