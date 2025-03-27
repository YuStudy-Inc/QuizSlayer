import DatabaseConnection from './config/DatabaseConnection.js'
import userRoutes from './routes/userRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import serverless from 'serverless-http';
import mongoose from 'mongoose';
//idk if it's better to put this in the .env file
// const frontEndLocalHost = "http://localhost:5173"
mongoose.Promise = global.Promise

// app.use(cors({ origin: frontEndLocalHost }))
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", userRoutes)
app.use("/quizzes", quizRoutes)
app.use("/questions", questionRoutes)

// const port = 3000
// const startBackEnd = async () => {
//     try {
//         await DatabaseConnection()
//         // app.listen(port, () => {
//         //     console.log(`server is running on port ${port}`);
//         // })
//     }
//     catch (e) {
//         console.error("ts not working gng 🥀🥀🥀")
//     }
// }

// startBackEnd()
const MONGODB_URI = process.env.MONGODB_URI
let cachedClient = null;

// Function to connect to MongoDB
async function connectDB() {
  if (cachedClient) {
    console.log('Using cached MongoDB connection');
    return cachedClient;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("MongoDB connection failed");
  }
}

app.get("/db-connect", async (req, res) => {
    try {
      const client = await connectDB();
      res.json({ message: 'MongoDB connected', state: client.connection.readyState });
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }
  });
app.get("/QuizSlayerBackend", (req, res) => {
    try {
        const client = await connectDB();
        res.json({ message: 'MongoDB connected', state: client.connection.readyState });
      } catch (error) {
        res.status(500).json({ error: 'Failed to connect to MongoDB' });
      }
});
export const handler = serverless(app);
