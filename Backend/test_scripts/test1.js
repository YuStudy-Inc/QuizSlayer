// Add a character to the database.
import dotenv from 'dotenv';
import { Character } from '../schemas/Schemas.js';
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

