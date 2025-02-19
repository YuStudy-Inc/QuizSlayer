import DatabaseConnection from './DatabaseConnection.js';
import { Character, Quiz } from './schemas/Schemas.js';
import express from 'express';

const app = express();
const port = 3001;

let dbReady = await DatabaseConnection();

app.get("/Characters", async (req, res) => {
    // console.log("asdf")
    console.log("DB Connection: ");
    if (!dbReady) {
        res.json(-1);
    }
    else {
        try {
            let characters = await Character.find();
            res.json(characters);
        }
        catch (error) {
            console.log("An error occured while connecting to the database: ");
            console.log(error)
        }
    }
});

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
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})