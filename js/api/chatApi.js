/**
 * chatApi.js
 *
 * Nagy, this module calls the real OpenAI Chat Completions API.
 * It receives the full conversation history so the model has context
 * of everything said so far — that's what makes it feel like a real
 * conversation instead of a stateless Q&A.
 */

import CONFIG from "../config.js";
import { getSelectedModel } from "../chat/modelManager.js";

/**
 * Sends the conversation history to OpenAI and returns the reply text.
 * Uses whichever model the user has selected in the header dropdown.
 *
 * @param {Array<{ role: string, content: string }>} history
 *   Array of { role: "user"|"assistant", content: string } objects
 * @returns {Promise<string>} The assistant's reply
 */
async function getChatResponse(history) {
  const model = getSelectedModel();

  const response = await fetch(CONFIG.CHAT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: history,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `OpenAI Chat API error ${response.status}: ${error?.error?.message ?? response.statusText}`
    );
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export { getChatResponse };
