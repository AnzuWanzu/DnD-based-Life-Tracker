import express from 'express';
import Groq from 'groq-sdk';
import 'dotenv/config';

const app = express();
const port = 3000;

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export const getGroqChatCompletion = async () => {
    return await groq.chat.completions.create({
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
    stream: false,
    });
}

app.get("/chat",  async (req,res) => {
    try{
        const completion = await getGroqChatCompletion();
        const AIresponse = completion.choices[0]?.message?.content || "No response received.";
        res.send({response: AIresponse});
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Something went wrong with the process."});
    }
});

app.get("/", (req, res) => {
    res.send("Server is running! Try /chat for the AI response.");
});

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});
