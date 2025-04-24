// import { GoogleGenerativeAI } from "@google/generative-ai";

/*
const bussinessInfo = `
You are EduBot, an AI Education Assistant from Vrije Universiteit Amsterdam, designed to help teachers integrate AI into their classrooms.  Your role is to:

1.  **Answer Questions:** Provide clear, practical guidance on using AI in education, focusing on creating effective prompts and integrating AI tools.  Use step-by-step examples and simple language, especially for complex concepts. Be concise when possible, but provide detailed explanations when needed for clarity.

2.  **Offer Resources:** Suggest relevant learning materials, links, tutorials, and guides related to AI literacy and modern educational methods.

Be patient, supportive, and encourage questions.  Remember, many users are new to AI.  Greet users with a friendly welcome, explaining your capabilities and inviting them to ask questions. Avoid using markdown or HTML in your responses. Focus on accessibility, inclusivity, and practicality for educators at all levels.
`

const API_KEY = "API-KEY";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: bussinessInfo
});

let messages = {
    history: [],
}

async function sendMessage() {

    console.log(messages);
    const userMessage = document.querySelector(".chat-window input").value;

    if (userMessage.length) {

        try {
            document.querySelector(".chat-window input").value = "";
            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
            <div class="user">
                <p>${userMessage}</p>
            </div>
        `);

            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
            <div class="loader"></div>
        `);

            const chat = model.startChat(messages);

            let result = await chat.sendMessageStream(userMessage);

            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
                   <div class="model">
                       <p></p>
                   </div>
               `);
            let modelMessages = ''
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                modelMessages = document.querySelectorAll(".chat-window .chat div.model");
                modelMessages[modelMessages.length - 1].querySelector("p").insertAdjacentHTML("beforeend", `
                    ${chunkText}
                `);
            }

            messages.history.push({
                role: "user",
                parts: [{ text: userMessage }],

            });

            messages.history.push({
                role: "model",
                parts: [{ text: modelMessages[modelMessages.length - 1].querySelector("p").innerHTML }],

            });
        }
        catch (error) {
            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `
            <div class="error">
                <p>Sorry, I didn't understand that. Can you try again?</p> 
            </div>
            `);
        }

        document.querySelector(".chat-window .chat .loader").remove();

    }
}

// document.querySelector(".chat-window .input-area button").addEventListener("click", () => sendMessage());

// document.querySelector(".chat-button").addEventListener("click", () => {
//     document.querySelector("body").classList.add("chat-open");
// });

// document.querySelector(".chat-button").addEventListener("click", () => {
//     document.querySelector("body").classList.add("chat-open");
// });

// document.querySelector(".chat-window button.close").addEventListener("click", () => {
//     document.querySelector("body").classList.remove("chat-open");
// });
*/

// New JavaScript for the AI Literacy & Prompt Engineering site
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Literacy & Prompt Engineering site loaded');
    
    // Add any necessary JavaScript functionality for the new site here
});
