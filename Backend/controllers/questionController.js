import Schemas from '../schemas/Schemas.js';
import OpenAI from "openai";
import mongoose from 'mongoose';
import pdf from 'pdf-parse';
const Question = Schemas.Question
const Quiz = Schemas.Quiz
function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

export const createQuestion = async(req, res) => {
    try {
        const { quizID, question, answer, difficulty, right, wrong } = req.body

        //difficulty will be drop down menu for easy, medium, hard
        if (!question || !answer || !difficulty || !right || !wrong)
            return res.status(404).json({ message: "Not all fields filled out" })

        if (question === "" || answer === "")
            return res.status(404).json({ message: "Question and/or answer not filled out" })

        if (!isInt(right) || !isInt(wrong))
            return res.status(400).json({ message: "points right or points wrong is not a valid number" })

        const turnQuizStringIntoAIDObjectBecauseGodKnowsWhyIHaveToConvertIt = new mongoose.Types.ObjectId(quizID);
        const quizAssociatedWithTheQuestion = await Quiz.findById(turnQuizStringIntoAIDObjectBecauseGodKnowsWhyIHaveToConvertIt)
        if (!quizAssociatedWithTheQuestion)
            return res.status(404).json({ message: "Quiz not found" })

        const newQuestion = new Question({
            quizId: turnQuizStringIntoAIDObjectBecauseGodKnowsWhyIHaveToConvertIt,
            question,
            answer, 
            difficulty,
            right,
            wrong
        }) 

        //we gonna remove the list of questions in the Quiz object because that just makes everything harder.
        /* const turnQuizStringIntoAIDObjectBecauseGodKnowsWhyIHaveToConvertIt = new mongoose.Types.ObjectId(quizID);
        const quizAssociatedWithTheQuestion = await Quiz.findById(turnQuizStringIntoAIDObjectBecauseGodKnowsWhyIHaveToConvertIt)
        if (!quizAssociatedWithTheQuestion)
            return res.status(404).json({ message: "Quiz not found" })
        
        quizAssociatedWithTheQuestion.questions.push(newQuestion) */
        await newQuestion.save()

        res.status(200).json({
            "message": "Question Created Successfully",
            "question": newQuestion
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


//need a get all questions from quiz id