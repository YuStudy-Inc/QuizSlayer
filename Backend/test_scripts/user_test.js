/*
 * Script to test insertion and querrying of the User object
 */

// Add a character to the database.
import dotenv from 'dotenv';
import { Item, User } from '../schemas/Schemas.js'
import mongoose from 'mongoose';

dotenv.config({path: '../.env'})

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

const item1 = await Item.findById(2);
console.log(item1.id)

// Add new user to database
// let newUser = new User({
//     username: "me",
//     email: "me@gmail.com",
//     password: "o no",
//     pfp: 0,
//     description: "Just me",
//     inventory: item1, // Saves reference to inventory
//     selectedCharacter: 1,
//     xp: 99,
//     coins: 99999
// });
// await newUser.save().catch(err => {
//     console.log("An error occured while adding user to the database.");
//     console.log(err);
// })
// const user = await User.findById('67b42a1cdf57f64e847398c3').populate('inventory')
// console.log(user)

const user = await User.find() // populate must be used to populate inventory. Will return array of itemID otherwise
//.exec() // Not sure if this is needed
console.log(user[0]);
// console.log(user[0].inventory);