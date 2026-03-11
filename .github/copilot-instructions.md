You must strictly follow the rules defined in the **copilot-instructions.md** file in this project.

We are building a **simple AI chatbot web application with a WhatsApp-like UI**.

Your task is to **generate the complete initial project structure and implementation** according to the rules in `copilot-instructions.md`.

Requirements:

1. Use **only HTML, CSS, and Vanilla JavaScript**.
2. Use **ES Modules** for all JavaScript files.
3. Do **not use any frameworks or external libraries**.
4. Keep the code **simple, clean, and beginner-friendly**.
5. Follow the **modular architecture defined in the copilot instructions**.

Project features:

• WhatsApp-like chat interface
• User messages appear on the right
• Bot messages appear on the left
• Chat bubbles UI
• Message input + send button
• Image generation button
• Chat history memory stored in a JavaScript array
• Messages rendered dynamically
• Auto scroll to the latest message

Message structure must be:

{
role: "user" | "assistant",
type: "text" | "image",
content: string,
timestamp: Date
}

Project structure must be:

/project
index.html

/css
style.css

/js
main.js
config.js

/js/api
chatApi.js
imageApi.js

/js/chat
chatManager.js
messageRenderer.js
memoryStore.js

/js/ui
domElements.js
inputHandler.js
scrollManager.js

Implementation steps:

1. Generate the **HTML layout** with a WhatsApp-like chat UI.
2. Implement **CSS styling** for chat bubbles, layout, and input area.
3. Create all **JavaScript modules** using ES modules.
4. Implement a **chat memory store** that keeps messages in an array.
5. Implement a **message renderer** that displays messages in the chat window.
6. Implement **input handling** for sending messages.
7. Implement **auto scroll to bottom** when new messages appear.
8. Implement **mock AI responses** for now (no real API yet).
9. Implement **image message rendering** for generated images.

Important rules:

• Keep functions small and readable
• Avoid global variables
• Separate logic into modules
• Use clear variable names
• Prefer async/await over promises
• Avoid deeply nested code

When generating the code:

* Explain each file briefly
* Then generate the full code for that file
* Ensure everything works together
* Keep the code beginner-friendly for learning

Address explanations to **Nagy**.
