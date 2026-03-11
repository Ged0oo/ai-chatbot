/**
 * modelsApi.js
 *
 * Nagy, this module fetches the list of models available for your
 * API key from OpenAI and splits them into two groups:
 *
 *   • Chat models  → work with /v1/chat/completions
 *   • Image models → work with /v1/images/generations
 *
 * The key lesson here: not every model that starts with "gpt-" is a
 * chat model. "gpt-image-*" models use a different endpoint entirely,
 * so we must exclude them from the chat list.
 */

import CONFIG from "../config.js";

const MODELS_URL = "https://api.openai.com/v1/models";

// Patterns that identify models that do NOT work with /v1/chat/completions
const NON_CHAT_PATTERNS = [
  "gpt-image",          // e.g. gpt-image-1, gpt-image-1-mini → /v1/responses only
  "-instruct",          // e.g. gpt-3.5-turbo-instruct → old /v1/completions only
  "dall-e",             // image generation
  "tts",                // text-to-speech
  "whisper",            // speech-to-text
  "embedding",          // embeddings
  "moderation",         // moderation
];

// Patterns that identify image generation models supported by /v1/images/generations
// Note: gpt-image-* uses /v1/responses (a different endpoint), so excluded here
const IMAGE_PATTERNS = ["dall-e"];

/**
 * Returns a sorted list of model IDs that support /v1/chat/completions.
 * @returns {Promise<string[]>}
 */
async function getAvailableChatModels() {
  const allModels = await fetchAllModelIds();
  return allModels
    .filter((id) => id.startsWith("gpt-") && !matchesAny(id, NON_CHAT_PATTERNS))
    .sort();
}

/**
 * Returns a sorted list of model IDs that support /v1/images/generations.
 * @returns {Promise<string[]>}
 */
async function getAvailableImageModels() {
  const allModels = await fetchAllModelIds();
  return allModels
    .filter((id) => matchesAny(id, IMAGE_PATTERNS))
    .sort();
}

// ─── Private helpers ──────────────────────────────────────────

/**
 * Fetches the raw list of model IDs from the OpenAI API.
 * @returns {Promise<string[]>}
 */
async function fetchAllModelIds() {
  const response = await fetch(MODELS_URL, {
    headers: {
      Authorization: `Bearer ${CONFIG.OPENAI_API_KEY}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Failed to load models (${response.status}): ${error?.error?.message ?? response.statusText}`
    );
  }

  const data = await response.json();
  return data.data.map((m) => m.id);
}

/**
 * Returns true if the model ID contains any of the given pattern strings.
 * @param {string} id
 * @param {string[]} patterns
 * @returns {boolean}
 */
function matchesAny(id, patterns) {
  return patterns.some((pattern) => id.includes(pattern));
}

export { getAvailableChatModels, getAvailableImageModels };
