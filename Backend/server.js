import DatabaseConnection from './config/DatabaseConnection.js'
import userRoutes from './routes/userRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

//idk if it's better to put this in the .env file
const frontEndLocalHost = "http://localhost:5173"

const app = express()

app.use(cors({ origin: frontEndLocalHost }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", userRoutes)
app.use("/quizzes", quizRoutes)
app.use("/questions", questionRoutes)

const port = 3000
const startBackEnd = async () => {
    try {
        await DatabaseConnection()
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    }
    catch (e) {
        console.error("ts not working gng 🥀🥀🥀")
    }
}

startBackEnd()