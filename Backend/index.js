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
// import dotenv from 'dotenv';
// dotenv.config({path: 'Backend/.env'});
import session from 'express-session';
import MongoStore from 'connect-mongo';


//idk if it's better to put this in the .env file
// const frontEndLocalHost = "http://localhost:5173"

// app.use(cors({ origin: frontEndLocalHost }))
const app = express()

const allowedOrigins = ['http://localhost:5173', 'https://www.quizslayer.com/']
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const tempClient = await DatabaseConnection(); // Ensure DatabaseConnection is an async function that connects to MongoDB

dotenv.config();

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: "sessions"
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    secure:false,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use("/users", userRoutes)
app.use("/quizzes", quizRoutes)
app.use("/questions", questionRoutes)


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

export const handler = serverless(app);

//For local testing
// const port = 5173;

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
