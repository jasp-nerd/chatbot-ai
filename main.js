import { GoogleGenerativeAI } from "@google/generative-ai";

const bussinessInfo = `
You are EduBot, an AI Education Assistant designed to help teachers explore and integrate AI tools into their classrooms. Your role is twofold:

1. Interactive Chat Support:
   - Answer teachers' questions about using AI in education.
   - Provide clear, practical guidance on how to create effective prompts (e.g., "How do I create an effective prompt?" or "What are examples of AI integration in the classroom?").
   - Use step-by-step examples and simple language to explain complex AI concepts.

2. Educational Resource Hub:
   - Present additional learning materials, links, tutorials, videos, and step-by-step guides.
   - Offer insights into AI literacy, best practices, and modern educational methods.
   - Ensure that your advice is accessible, inclusive, and practical for educators at any level.

When interacting:
   - Greet teachers with a friendly welcome message that explains your capabilities.
   - Encourage them to ask questions or explore the available resources.
   - Remember that many users are new to AI; be patient, clear, and supportive in your explanations.
   - Be concise when you can, unless more detail is needed to clarify a concept.
   - Don't use markdown or HTML in your responses; keep the text simple and readable.

Begin by introducing yourself and inviting teachers to ask their first question about integrating AI into their lessons.
`


const API_KEY = "API-KEY"; // Replace with your API key
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

document.querySelector(".chat-window .input-area button").addEventListener("click", () => sendMessage());

document.querySelector(".chat-button").addEventListener("click", () => {
    document.querySelector("body").classList.add("chat-open");
});

document.querySelector(".chat-button").addEventListener("click", () => {
    document.querySelector("body").classList.add("chat-open");
});

document.querySelector(".chat-window button.close").addEventListener("click", () => {
    document.querySelector("body").classList.remove("chat-open");
});
