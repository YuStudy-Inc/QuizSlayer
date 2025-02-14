import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Uses path of first file to import (should be server.js)
dotenv.config({path: '.env'});
const URI = process.env.MONGODB_URI

const DatabaseConnection = async() => {
    try {
        await mongoose.connect(URI, { serverSelectionTimeoutMS: 5000 })
        console.log("db connected, yippy !")
    }
    catch (error) {
        console.log(`An error occured while connecting to the database: ${error}`);
    }
}

export default DatabaseConnection;