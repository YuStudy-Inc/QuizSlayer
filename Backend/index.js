import DatabaseConnection from './config/DatabaseConnection.js'
import userRoutes from './routes/userRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import serverless from 'serverless-http';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';
import MongoStore from 'connect-mongo';


//idk if it's better to put this in the .env file
// const frontEndLocalHost = "http://localhost:5173"

// app.use(cors({ origin: frontEndLocalHost }))
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", userRoutes)
app.use("/quizzes", quizRoutes)
app.use("/questions", questionRoutes)

const tempClient = await DatabaseConnection();

const sessionStore = new MongoStore({
  mongooseConnection: await tempClient,
  collection: "session"
})

console.log(process.env.SESSION_SECRET);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));


app.get("/QuizSlayerBackend", async(req, res) => {
    try {
        const client = tempClient;
        res.json({ message: 'MongoDB connected', state: client.connection.readyState });
      } catch (error) {
        res.status(500).json({ error: 'Failed to connect to MongoDB' });
      }
});
app.get("/", async(req, res) => {
    res.json({ message: 'Welcome to the backend bitch!'});
});

// export const handler = serverless(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})