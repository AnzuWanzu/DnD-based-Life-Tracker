import Groq from "groq-sdk";
import 'dotenv/config';
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function main(){
    const chatCompletion = await getGroqChatCompletion();
    console.log(chatCompletion.choices[0]?.message?.content || ""
    );
}

async function getGroqChatCompletion(){
    return groq.chat.completions.create({
        messages: [
            {
            role: "user",
            content: "Can you give me a short lore for a Red Dragonborn Fighter named Rath Zalothar.",
            },
    ],
    model: "llama-3.3-70b-versatile",
    });
}

main();