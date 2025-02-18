import DatabaseConnection from './DatabaseConnection.js'
import character from './schemas/character.js'
import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000

await DatabaseConnection()

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

//route to grab all characters from DB
app.get("/getCharacters", async(req, res) => {
    try {
        const characters = await character.find()
        res.status(200).json(characters)
    }
    catch (e) {
        console.error("error retrieving Characters: ", e)
        res.status(500).json({"message": "Error retrieving Characters"})
    }
})

app.post("/createUser", async(req, res) => {
    try {
        const { username, email, password, passwordAgain } = req.body
        
        if (username === null || email === null || password === null || passwordAgain === null)
            return res.status(404).json({"message": "Not all information filled out"})
        
        const listOfUsernames = new Set(await user.find("username"))
        if (!listOfUsernames.includes(username))
            return res.status(400).json({"message": "Username already exists"})

        if (!validEmail(email))
            return res.status(400).json({"message": "This is not a valid email"})

        if (!validPassword(password))
            return res.status(400).json({"message": "The password is weak"})

        if (password !== passwordAgain)
            return res.status(400).json({"message": "The passwords do not match"})

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
        return res.status(200).json({"message": "new user created"})
    }
    catch (e) {
        console.error("error creating user: ", e)
        res.status(500).json({"message": "Error creating user"})
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
