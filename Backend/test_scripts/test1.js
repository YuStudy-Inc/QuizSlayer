// Add a character to the database.
import dotenv from 'dotenv';
import { Character, Quiz, Question} from '../schemas/Schemas.js';
import mongoose from 'mongoose';

dotenv.config({path: '../.env'})

const URI = process.env.MONGODB_URI;
console.log(URI);

mongoose.Promise = global.Promise;

try {
    await mongoose.connect(URI);
}
catch (error) {
    console.log("An error occured while connecting to the database: ");
    console.log(error)
}

let newCharacter = new Character({
    _id: 6,
    name: "Test",
    health: 111,
    hat: 0,
    weapon: 0,
    isAlive: false,
    picture: "test",
});
newCharacter.save().catch(err => {
    console.log("An error occured while adding character to the database.");
    console.log(err);
})

let newQuestion = new Question({
    quizId: null, 
    questionPrompt: "Test, this gonna be gone in 3 seconds",
    choices: ["Nonexistant lol", "Bye bye"],
    answer: -1,
    difficulty: 10,
    pointsIfRight: 6,
    pointsIfWrong: 5
})

newQuestion.save().catch(err=>{
    console.log("Error occured while adding new question to db.");
})

let newQuiz = new Quiz({
    title:"Test",
    description:"This is a test quiz, shit is gonnabe thrown out in 3 seconds",
    questions: null

});

newQuiz.save().catch(err => {
    console.log("An error occured while adding Quiz to the database.");
    console.log(err);
})
