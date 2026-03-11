/**
 * imageApi.js
 *
 * Nagy, this module handles image generation for two different OpenAI APIs:
 *
 *   • dall-e-2 / dall-e-3  → POST /v1/images/generations
 *     Response: { data: [{ url: "..." }] }
 *
 *   • gpt-image-1 / gpt-image-1-mini → POST /v1/responses
 *     Response: { output: [{ type: "image_generation_call", result: "<base64>" }] }
 *     We convert the base64 to a data: URL so the <img> tag renders it directly.
 *
 * The model is read from the image dropdown via getSelectedImageModel().
 */

import CONFIG from "../config.js";
import { getSelectedImageModel } from "../chat/modelManager.js";

/**
 * Generates an image from a text prompt using the selected model.
 * Returns either a remote URL (dall-e) or a base64 data URL (gpt-image).
 *
 * @param {string} prompt
 * @returns {Promise<string>} URL or data URL for the generated image
 */
async function getImageUrl(prompt) {
  const model = getSelectedImageModel();
  const effectivePrompt = prompt || "A beautiful landscape, digital art";

  if (isGptImageModel(model)) {
    return generateWithResponsesApi(model, effectivePrompt);
  }

  return generateWithImagesApi(model, effectivePrompt);
}

// ─── Private: /v1/responses (gpt-image-* models) ─────────────

async function generateWithResponsesApi(model, prompt) {
  const response = await fetch(CONFIG.RESPONSES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
      tools: [{ type: "image_generation" }],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `OpenAI Image API error ${response.status}: ${error?.error?.message ?? response.statusText}`
    );
  }

  const data = await response.json();

  // Find the image_generation_call output item
  const imageOutput = data.output?.find(
    (item) => item.type === "image_generation_call"
  );

  if (!imageOutput?.result) {
    throw new Error("No image was returned by the API.");
  }

  // result is raw base64 — wrap it in a data URL so <img src> works
  return `data:image/png;base64,${imageOutput.result}`;
}

// ─── Private: /v1/images/generations (dall-e models) ─────────

async function generateWithImagesApi(model, prompt) {
  const response = await fetch(CONFIG.IMAGE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      prompt,
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

// ─── Helpers ─────────────────────────────────────────────────

/** Returns true for models that use /v1/responses instead of /v1/images/generations */
function isGptImageModel(modelId) {
  return modelId.startsWith("gpt-image");
}

export { getImageUrl };
