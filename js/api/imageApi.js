/**
 * imageApi.js
 *
 * Nagy, this module calls the real OpenAI Image Generation API (DALL-E).
 * It takes a text prompt and returns a URL to the generated image.
 */

import CONFIG from "../config.js";
import { getSelectedImageModel } from "../chat/modelManager.js";

/**
 * Generates an image from a text prompt using the selected DALL-E model.
 *
 * @param {string} prompt - A description of the image to generate
 * @returns {Promise<string>} A URL pointing to the generated image
 */
async function getImageUrl(prompt) {
  const model = getSelectedImageModel();

  const response = await fetch(CONFIG.IMAGE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      prompt: prompt || "A beautiful landscape, digital art",
      n: 1,
      size: CONFIG.IMAGE_SIZE,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `OpenAI Image API error ${response.status}: ${error?.error?.message ?? response.statusText}`
    );
  }

  const data = await response.json();
  return data.data[0].url;
}

export { getImageUrl };
