import Groq from "groq-sdk";
import 'dotenv/config';
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export const main = async () =>{
    const stream = await getGroqChatCompletion();
    // console.log(chatCompletion.choices[0]?.message?.content || ""
    // );
    for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

export const getGroqChatCompletion = async () => {
    return groq.chat.completions.create({
        messages: [
            {
            role: "system",
            content: "You are a well-known DM named Matt Mercer. Giving scenarios about Rath Zalothar's (a Red Dragonborn Fighter) current scenario asking questions like: You encountered..., what do you do?",
            },
            {
            role: "user",
            content: "DM, what is it I'm facing?",
            },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    max_completion_tokens: 1024,
    top_p: 1,
    stop: null,
    stream: true,
    });
}

main();