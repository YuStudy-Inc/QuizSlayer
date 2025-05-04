import Schemas from '../schemas/Schemas.js';
import OpenAI from "openai";
import mongoose from 'mongoose';
import pdf from 'pdf-parse';
const Question = Schemas.Question
const User = Schemas.User
const Quiz = Schemas.Quiz

export const createQuestions = async(req, res) => {
    try {
        const questions = req.body.questions
        
        for (const question of questions) {
            if (!question.quizId)
                return res.status(400).json({ message: "Missing quizId in question" });

            if (!question.questionPrompt?.trim() || !question.answer?.trim())
                return res.status(400).json({ message: "All fields must be filled out" });
        }
        
        const newQuestions = questions.map(question => ({
            quizId: question.quizId,
            questionPrompt: question.questionPrompt,
            answer: question.answer,
        }))

        const createdQuestions = await Question.insertMany(newQuestions)

        res.status(200).json({
            "message": "Questions Created Successfully",
            "question": createdQuestions
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


        const userId = req.session.userID
        const user = await User.findOne({_id: userId})
        const dataBuffer = req.file.buffer;
        const api = process.env.OPENAI_API_KEY;
        const client = new OpenAI(api);

        if(user.xp > 2) {
            return res.status(403).json({error: "User has used too many AICreations today"})
        }
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

        
        user.xp += 1
        await user.save();
        return res.status(200).json(JSON.parse(response.output_text));
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: "Could not create questions"});
        
    }

}

export const editQuestions = async (req,res) => {
    try {
        const questions = req.body.questions

        const updatedQuestions = questions.map(question => ({
            updateOne: {
                filter: { _id: question._id },
                update: { $set: question }
            }
        }));

        const editedQuestions = await Question.bulkWrite(updatedQuestions);

        res.status(200).json({
            message: "Question updated Successfully",
            questions: editedQuestions
        }) 

    } 
    catch (e) {
        res.status(500).json({error: "Question not modified"})
        console.log(e)
    }
}

export const deleteQuestions = async(req, res)=>{
    try {
        const questions = req.body.questions

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "No questions deleted" });
        }

        const getOuttaHere = await Question.deleteMany({ _id: { $in: questions } })
        res.status(200).json({
            message: "Questions deleted successfully",
            deletedQuestions : getOuttaHere
        });
    }
    catch(e) {
        console.log("error deleting questions", e)
        res.status(500).json({ message: "Internal server error", error: e});
    }
}