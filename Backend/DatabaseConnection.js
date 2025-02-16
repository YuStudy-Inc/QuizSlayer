import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Uses path of first file to import (should be server.js)
dotenv.config({path: '.env'});

const URI = process.env.MONGODB_URI;
console.log(URI);

const DatabaseConnection = async() => {
    mongoose.Promise = global.Promise
    try {
        await mongoose.connect(URI);
    }
    catch (error) {
        console.log("An error occured while connecting to the database: ");
        console.log(error);
    }
}

export default DatabaseConnection;