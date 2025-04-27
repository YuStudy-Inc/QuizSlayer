import OpenAI from "openai";
import fs from "fs";
import dotenv from 'dotenv';
import path from 'path';
import pdf from 'pdf-parse';
dotenv.config({path: 'Backend/.env'});
//Default location of API key is in .env under OPENAI_API_KEY
const api = process.env.OPENAI_API_KEY;
const client = new OpenAI(api);

const __dirname = path.resolve();
const inputPath = path.join(__dirname, "/Backend/CS 3800 intro.pdf");

async function myReadFile() {
    const dataBuffer = fs.readFileSync(inputPath, (err,data) => {});
    const data = await pdf(dataBuffer)
    return data.text;
}

const input = await myReadFile();
//const base64String = buf.toString("base64");

const prompt = "You are a teacher creating a quiz." +
    " Use the user inputted slide or text information to create 10 questions with a corresponding answers." +
    " Similar to a flashcard. Do not assume anything outside of the slides"
    
const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: [
        {
            "role": "system",
            "content":
                prompt,
        },
        {
            "role": "user", 
            "content": [{
                    type: "input_text",
                    text: input
                    // type : "input_file",
                    // filename : "/Backend/Cs 3800 intro.pdf",
                    // file_data: `data:application/pdf;base64,${base64String}`,
                },
            ], 
        },
    ],
    text: {
        format: {
            type: "json_schema",
            name: "Get_Quiz",
            schema: {
                type: 'object',
                properties: {
                    questions: {
                        type: "array",
                        items: {
                            type: 'object',
                            properties: {
                                question: {"type": "string"},
                                answer: {"type": "string"},
                            },
                            required: ['question', 'answer'],
                            additionalProperties: false,
                        },
                    },
                },
                required: ['questions'],
                additionalProperties: false,
            },
        }
    }
});


console.log(response.output_text);