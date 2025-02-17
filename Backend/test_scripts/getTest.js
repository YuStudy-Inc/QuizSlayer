// Add a character to the database.
import dotenv from 'dotenv';
import { Character } from '../schemas/Schemas.js'
import mongoose from 'mongoose';

dotenv.config({path: './.env'})

const URI = process.env.MONGODB_URI
console.log(URI)

mongoose.Promise = global.Promise

try {
    await mongoose.connect(URI);
}
catch (error) {
    console.log("An error occured while connecting to the database: ");
    console.log(error)
}


//returns an array of all characters
const characters = await Character.find({});
//Grabs the first doc that matches query
const character = await Character.findOne({hat: '0', health: '111'})


console.log('All Characters: ', characters)
console.log('First Character: ', characters[0])


console.log('Searched Character: ', character)
console.log('Searched Character\'s Health', character.health)



