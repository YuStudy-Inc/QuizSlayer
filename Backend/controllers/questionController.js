import Schemas from '../schemas/Schemas.js';
import OpenAI from "openai";
import mongoose from 'mongoose';
import pdf from 'pdf-parse';
const Question = Schemas.Question
const Quiz = Schemas.Quiz

export const createQuestions = async(req, res) => {
    try {
        const questions = req.body.questions
        console.log(questions)

        const createdQuestions = []

        for (const question of questions) {
            if (!question.quizId)
                return res.status(404).json({ message: "Quiz not found" })
    
            if (!question.questionPrompt || !question.answer || question.questionPrompt === "" || question.answer === "")
                return res.status(404).json({ message: "Not all fields filled out" })
    
            const newQuestion = new Question({
                quizId: question.quizId,
                questionPrompt: question.questionPrompt,
                answer: question.answer,
            }) 
            await newQuestion.save()
            createdQuestions.push(newQuestion)
        }

        res.status(200).json({
            "message": "Questions Created Successfully",
            "question": createQuestions
        })

    }
    catch (e) {
        console.error("error creating question: ", e)
        res.status(500).json({"message": "Error creating question", e})
    }
}

export const createQuestionsFromPDF = async (err, req, res) => {
    try {
        if(err != null){
            if(err.code === 'LIMIT_FILE_SIZE'){
                return res.status(413).json({error: 'File too large'});
            }
        }
        if(!req.file){
            return res.status(400).json({error: 'No file uploaded.'});
        }
        if(req.file.mimetype !== 'application/pdf') {
            return res.status(415).json({error: "Invalid file type. Only PDFS are allowed"});
        }
        
        const dataBuffer = req.file.buffer;
        const api = process.env.OPENAI_API_KEY;
        const client = new OpenAI(api);
        var data; 
        try{
            data = await pdf(dataBuffer);
        }
        catch(e) {
            return res.status(415).json({error: "Invalid PDF structure"})
        }
        
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
                            text: data.text
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

        return res.status(200).json(JSON.parse(response.output_text));
    } catch (e) {
        return res.status(500).json({error: "Could not create questions"});
        
    }

}

export const editQuestion = async (req,res) => {
    try {
        const questionId = req.params.id
        
        //Only changes the parameter that was included in the json req
        const result = await Question.findOneAndUpdate({_id: questionId}, {$set: req.body}, {new: true})
        if(result == null){
            res.status(404).json({error: 'No Question with that ID'})
            return;
        }

        console.log(result);
        res.status(200).json({
            message: "Question updated Successfully",
            object: result
        }) 

    } catch (e) {
        res.status(500).json({error: "Question not modified"})
        console.log(e)
    }
}

export const deleteQuestion = async(req, res)=>{
    const{id} = req.params;
    try{
        const deleteQuestion  = await Question.findByIdAndDelete(id);
        if(!deleteQuestion){
            console.log("Could not find question");
            return;
        }
        console.log("Deleted Quiz question successfully!");
    }
    catch(err){
        console.log("Error occured while connecting to database");
        console.log(err);
    }
}