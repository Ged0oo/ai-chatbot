/**
 * modelManager.js
 *
 * Nagy, this module owns the "currently selected chat model" state.
 * It fetches the list from the API, populates the <select> in the
 * header, and always knows which model chatApi.js should use.
 *
 * The pattern here is the same as memoryStore — a private variable
 * with public getters/setters so nothing else can corrupt the state.
 */

import { modelSelect, imageModelSelect } from "../ui/domElements.js";
import { getAvailableChatModels, getAvailableImageModels } from "../api/modelsApi.js";
import CONFIG from "../config.js";

// Private state — only readable via the exported getters
let selectedModel = CONFIG.CHAT_MODEL;
let selectedImageModel = CONFIG.IMAGE_MODEL;

/** Returns the currently selected chat model ID. */
function getSelectedModel() {
  return selectedModel;
}

/** Returns the currently selected image model ID. */
function getSelectedImageModel() {
  return selectedImageModel;
}

/**
 * Fetches chat models, populates the header dropdown, wires change event.
 * Call once from main.js.
 */
async function initModelSelector() {
  setSelectLoading(modelSelect, true);

  try {
    const models = await getAvailableChatModels();
    populateSelect(modelSelect, models, CONFIG.CHAT_MODEL);
    selectedModel = modelSelect.value;
  } catch (error) {
    console.error("Could not load chat models:", error.message);
    populateSelect(modelSelect, [CONFIG.CHAT_MODEL], CONFIG.CHAT_MODEL);
  } finally {
    setSelectLoading(modelSelect, false);
  }

  modelSelect.addEventListener("change", () => {
    selectedModel = modelSelect.value;
  });
}

/**
 * Fetches image models, populates the footer dropdown, wires change event.
 * Call once from main.js.
 */
async function initImageModelSelector() {
  setSelectLoading(imageModelSelect, true);

  try {
    const models = await getAvailableImageModels();
    // Fall back to config default if the API returns nothing
    populateSelect(imageModelSelect, models.length ? models : [CONFIG.IMAGE_MODEL], CONFIG.IMAGE_MODEL);
    selectedImageModel = imageModelSelect.value;
  } catch (error) {
    console.error("Could not load image models:", error.message);
    populateSelect(imageModelSelect, [CONFIG.IMAGE_MODEL], CONFIG.IMAGE_MODEL);
  } finally {
    setSelectLoading(imageModelSelect, false);
  }

  imageModelSelect.addEventListener("change", () => {
    selectedImageModel = imageModelSelect.value;
  });
}

// ─── Private helpers ──────────────────────────────────────────

/**
 * Fills a <select> element with one <option> per model ID.
 * Pre-selects `preferredId` if it exists in the list.
 * @param {HTMLSelectElement} selectEl
 * @param {string[]} models
 * @param {string} preferredId
 */
function populateSelect(selectEl, models, preferredId) {
  selectEl.innerHTML = "";

  models.forEach((modelId) => {
    const option = document.createElement("option");
    option.value = modelId;
    option.textContent = modelId;
    if (modelId === preferredId) option.selected = true;
    selectEl.appendChild(option);
  });

  // If preferred wasn't in the list, default to first available
  if (!models.includes(preferredId) && models.length > 0) {
    selectEl.value = models[0];
  }
}

/**
 * Disables the select and shows a placeholder while loading.
 * @param {HTMLSelectElement} selectEl
 * @param {boolean} isLoading
 */
function setSelectLoading(selectEl, isLoading) {
  selectEl.disabled = isLoading;
  if (isLoading) selectEl.innerHTML = "<option>Loading…</option>";
}

export { getSelectedModel, getSelectedImageModel, initModelSelector, initImageModelSelector };
