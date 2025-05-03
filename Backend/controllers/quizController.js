import { Schema } from 'mongoose';
import Schemas from '../schemas/Schemas.js';
const Quiz = Schemas.Quiz
const Question = Schemas.Question

export const createQuiz = async(req, res) => {
    try {
        const { userId, title, description, completed } = req.body
    
        if (!userId || !title || !description || userId === "" || title === "" || description === "")
            return res.status(404).json({ message: "Not all fields filled out" })
    
        const newQuiz = new Quiz({
            user: userId,
            title,
            description,
            completed
        })

        await newQuiz.save()

        res.status(200).json({
            "message": "Quiz Created Successfully",
            "quiz": newQuiz
        })
    } 
    catch (e) {
        console.error("error creating quiz: ", e)
        res.status(500).json({"message": "Error creating quiz", "e": e})
    }
}

export const editQuiz = async (req,res) => {
    try {
        const quizId = req.params.id
        
        //Only changes the parameter that was included in the json req
        const updatedQuiz = await Quiz.findOneAndUpdate({_id: quizId}, {$set: req.body}, {new: true})
        if(updatedQuiz == null){
            res.status(404).json({error: 'No Quiz with that ID'})
            return;
        }
        
        res.status(200).json({
            message: 'Quiz edited successfullly',
            quiz: updatedQuiz
        }) 
    } catch (e) {
        res.status(500).json({error: "Quiz not modified"})
        console.log(e)
    }
}

export const deleteQuiz = async(req, res) => {
    try {
        const quizId = req.body.quizId
        console.log(quizId)

        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
        if (!deletedQuiz) {
            res.status(500).json({error: "Quiz was not found"})
            return;
        }
        res.status(200).json({message: 'Quiz deleted successfullly' }) 
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Quiz not found"})
    }
}

export const getQuiz = async(req, res) => {
    try {
        const quizId = req.params.id
        const quizzes = await Quiz.findOne({_id : quizId})
        res.status(200).json({quizzes})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving quiz'})
        console.log(e)
    }
}

export const getQuizzes = async(req, res) => {
    try {
        const userId = req.params.id
        const quizzes = await Quiz.find({user: userId})
        console.log(quizzes)
        res.status(200).json({quizzes})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving quizzes'})
        console.log(e)
    }
}

export const getToDoQuizzes = async(req, res) => {
    try {
        const userId = req.params.id
        const quizzesStillLeftToDo = await Quiz.find({user: userId, completed: false})
        res.status(200).json({quizzesStillLeftToDo})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving quizzes under TODO status'})
        console.log(e)
    }
}

export const getQuestionsFromQuiz = async(req, res) => {
    const quizId = req.params.id;
    if (!quizId)
        res.status(404).json({error: "Quiz not found"})
    try {
        const result = await Question.find({ quizId: quizId })
        res.status(200).json({message: "questions retreived successfully", "questions": result})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({error: "Error finding questions for that quiz"})
    }
}