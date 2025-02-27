import DatabaseConnection from './DatabaseConnection.js'
import { Character, Quiz, Question, User } from './schemas/Schemas.js';
import express from 'express'
import bodyParser from 'body-parser'
/* added bcrypt as the library */
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000

let dbReady = await DatabaseConnection();

const validEmail = ((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
})

const validPassword = ((password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{9,}$/
    return passwordRegex.test(password)
})

/* created methods that uses library */
const hashPassword = ((password) => {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
})

const passwordMatch = (async(passwordFromUser, savedPasswordFromDB) => {
    return await bcrypt.compare(passwordFromUser, savedPasswordFromDB)
})

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

//route to grab all characters from DB
app.get("/getCharacters", async(req, res) => {
    try {
        const characters = await Character.find()
        res.status(200).json({
            "message": "characters retrieved",
            "characters": characters
        })
    }
    catch (e) {
        console.error("error retrieving Characters: ", e)
        res.status(500).json({"message": "Error retrieving Characters", e})
    }
})

app.post("/createUser", async(req, res) => {
    try {
        const { username, email, password, passwordAgain } = req.body
        
        if (!username || !email || !password || !passwordAgain)
            return res.status(404).json({"message": "Not all information filled out"})
        
        const users = await User.find({}, "username")
        const listOfUsernames = new Set(users.map(user => user.username))
        console.log(listOfUsernames)
        if (listOfUsernames.has(username))
            return res.status(400).json({"message": "Username already exists"})

        if (!validEmail(email))
            return res.status(400).json({"message": "This is not a valid email"})

        if (!validPassword(password))
            return res.status(400).json({"message": "The password is weak"})

        if (password !== passwordAgain)
            return res.status(400).json({"message": "The passwords do not match"})

        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            pfp: "", //pfp string url, save a temp one for now after creation
            description: "", //description, empty for now (could default to "" in the schema)
            inventory: [], //we need to store at least one character in the inventory list
            //[], //or can we have another list for characters ?
            selectedCharacter: 1, //selected character will be the first one
            xp: 0, //xp
            coins: 0 //coins
        })
        await newUser.save()
        res.status(201).json({
            "message": "new user created",
            "user": newUser
        })
    }
    catch (e) {
        console.error("error creating user: ", e)
        res.status(500).json({"message": "Error creating user", "e": e})
    }
})

app.post("/loginUser", async(req, res) => {
    try {
        const {username, password} = req.body
        
        const user = await User.findOne( {username} )
        if (!user)
            res.status(404).json({ message: "User not found" })
        
        const passwordValidated = await passwordMatch(password, user.password) 
        if (!passwordValidated)
            res.status(400).json({ message: "Invalid Password" })
        
        res.status(200).json({
            "message": "Login Successful",
            "user": user
        })
    } 
    catch (e) {
        console.error("error logging in: ", e)
        res.status(500).json({"message": "Error logging in", "e": e})
    }
})

app.delete("/user/:id", async(req, res)=>{
    const {id} = req.params;
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            console.log("Could not find User");
            return;
        }
        console.log("User Deleted Succesfully!");
    }
    catch(error){
        console.log("Error trying to delete user")
        console.log(error);
    }
})

app.put('/editUser/:id', async (req,res) => {
    try {
        const userId = req.params.id
        
        //need to check if username is taken. 
        const tempUser = await User.findOne({username: req.body.username})
        if(tempUser){
            res.status(404).json({error: 'Username taken'})
            return; 
        }
        //Only changes the parameter that was included in the json req
        const result = await User.findOneAndUpdate({_id: userId}, {$set: req.body})
        console.log(result);

        res.status(200).json({updatedCount: result.modifiedCount}) 
    } catch (e) {
        res.status(500).json({error: 'User not modified'})
    }
})

app.put('/editUser/password/:id', async (req,res) => {
    try {
        const {oldPassword, newPassword, newPasswordAgain} = req.body
        const user = await User.findOne({_id: req.params.id})
        if(newPassword != newPasswordAgain) {
            res.status(400).json({error: "New Passwords do not match!"})
            return;
        }
        if (!validPassword(newPassword)) {
            res.status(400).json({error: "The password is weak"})
            return;
        }
        const passwordValidated = await passwordMatch(oldPassword, user.password)
        if(!passwordValidated) {
            res.status(404).json({error: 'Old Password Incorrect'})
            return;
        }
        user.password = await hashPassword(newPassword);
        user.save();

        res.status(200).json({message: 'Password updated!'})
    }
    catch (e) {
        res.status(500).json({error: 'Password not modified'})
        console.log(e)
    } 
})

app.put('/editQuestion/:id', async (req,res) => {
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
})

app.put('/editQuiz/:id', async (req,res) => {
    try {
        const quizId = req.params.id
        
        //Only changes the parameter that was included in the json req
        const result = await Quiz.findOneAndUpdate({_id: quizId}, {$set: req.body}, {new: true})
        if(result == null){
            res.status(404).json({error: 'No Quiz with that ID'})
            return;
        }
        
        console.log(result);
        res.status(200).json({
            message: 'Quiz edited successfullly',
            object: result
        }) 

    } catch (e) {
        res.status(500).json({error: "Quiz not modified"})
        console.log(e)
    }
})

app.post("/createQuiz", async(req, res) => {
    try {
        const { title, description } = req.body
    
        if (!title || !description || title === "" || description === "")
            return res.status(404).json({ message: "Not all fields filled out" })
    
        const newQuiz = new Quiz({
            title,
            description,
            questions: [] // list of question objects

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
})

app.delete("/quizzes/:id", async(req, res)=>{
    const{id} = req.params;
    try{
        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if(!deletedQuiz){
            console.log("Quiz was not found")
            return;
        }
        console.log("Quiz deleted successfully!")
    }
    catch(err){
        console.log("An error occured while connecting to the database: ");
        console.log(err)
    }
})

app.post("/createQuestion", async(req, res) => {
    try {
        const { quizID, question, choices, answer, difficulty, right, wrong } = req.body

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
})

app.delete("/Questions/:id", async(req, res)=>{
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
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})