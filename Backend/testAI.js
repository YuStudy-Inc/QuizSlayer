import OpenAI from "openai";

//Default location of API key is in .env under OPENAI_API_KEY
const client = new OpenAI();

const response = await client.responses.create({
    model: 'gpt-4-mini',
    input: [

    ],
    text: {
        format: {
            type: "json_schema",
            name: "Get_Quiz",
            schema: {
                type: 'object',
                    properties: {
                        type: "array",
                        items: {
                            type: 'object',
                            properties: {
                                
                            },
                        },
                    },
                },

        }
    }
});

console.log(response.output_text);