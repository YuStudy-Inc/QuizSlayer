import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Uses path of first file to import (should be server.js)
dotenv.config({path: '.env'});

const URI = process.env.MONGODB_URI;
console.log(URI);

const DatabaseConnection = async() => {
    let ready = false;
    mongoose.Promise = global.Promise
    try {
        await mongoose.connect(URI);
    }
    catch (error) {
        console.log("An error occured while connecting to the database: ");
        console.log(error);
    }
    finally {
        // Log database connection state
        switch (mongoose.connection.readyState) {
            case 0:
                console.log("Disconnected from database");
                break;
            case 1:
                console.log("Connected to database");
                ready = true;
                break;
            case 2:
                console.log("Connecting to database");
                break;
            case 3:
                console.log("Disconnecting from database");
                break;
            default:
                console.log("Unknown database state");
                break;
        }
    }
    return ready;
}

export default DatabaseConnection;