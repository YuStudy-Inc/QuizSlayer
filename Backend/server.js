import DatabaseConnection from './DatabaseConnection.js'
import { Character, User } from './schemas/Schemas.js';
import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'

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
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/
    return passwordRegex.test(password)
})

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
        
        if (username === null || email === null || password === null || passwordAgain === null)
            res.status(404).json({"message": "Not all information filled out"})
        
        const listOfUsernames = new Set(await user.find("username"))
        if (!listOfUsernames.includes(username))
            res.status(400).json({"message": "Username already exists"})

        if (!validEmail(email))
            res.status(400).json({"message": "This is not a valid email"})

        if (!validPassword(password))
            res.status(400).json({"message": "The password is weak"})

        if (password !== passwordAgain)
            res.status(400).json({"message": "The passwords do not match"})

        const newUser = new user(
            username,
            email,
            hashPassword(password),
            "", //pfp string url, save a temp one for now after creation
            "", //description, empty for now (could default to "" in the schema)
            [], //we need to store at least one character in the inventory list
            [], //or can we have another list for characters ?
            1, //selected character will be the first one
            0, //xp
            0 //coins
        )
        await newUser.save()
        res.status(200).json({
            "message": "new user created",
            "user": newUser
        })
    }
    catch (e) {
        console.error("error creating user: ", e)
        res.status(500).json({"message": "Error creating user", e})
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
        res.status(500).json({"message": "Error logging in", e})
    }
})

app.post("/createQuiz", async(req, res) => {
    try {
        const { title, description } = req.body
    
        if (title === null || description === null || title === "" || description === "")
            res.status(404).json({ message: "Not all fields filled out" })
    
        const newQuiz = new Quiz(
            title,
            description,
            [] // list of question objects
        )
        await newQuiz.save()
        res.status(200).json({
            "message": "Quiz Created Successfully",
            "quiz": newQuiz
        })
    } 
    catch (e) {
        console.error("error creating quiz: ", e)
        res.status(500).json({"message": "Error creating quiz", e})
    }
})

app.post("/createQuestion", async(req, res) => {
    try {
        const { quizID, question, answer, difficulty, right, wrong } = req.body

        //difficulty will be drop down menu for easy, medium, hard
        if (question === null || answer === null || difficulty === null || right === null || wrong === null)
            res.status(404).json({ message: "Not all fields filled out" })

        if (question === "" || answer === "")
            res.status(404).json({ message: "Question and/or answer not filled out" })

        if (!isInt(right) || !isInt(wrong))
            res.status(400).json({ message: "points right or points wrong is not a valid number" })

        const newQuestion = new Question(
            quizID,
            question,
            answer, 
            difficulty,
            right,
            wrong
        ) 
        
        const quizAssociatedWithTheQuestion = await Quiz.find(quizID)
        if (!quizAssociatedWithTheQuestion)
            res.status(404).json({ message: "Quiz not found" })
        
        quiz.questions.push(newQuestion)
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})