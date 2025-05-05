import mongoose from 'mongoose';
// Uses path of first file to import (should be server.js)
//import dotenv from 'dotenv';
//dotenv.config({path: 'Backend/.env'});

// const DatabaseConnection = async () => {
//     let ready = false;
//     mongoose.Promise = global.Promise
    
//     try {
//         await mongoose.connect(URI, { serverSelectionTimeoutMS: 5000 });
//     }
//     catch (error) {
//         console.log("An error occured while connecting to the database: ");
//         console.log(error);
//     }
//     finally {
//         // Log database connection state
//         switch (mongoose.connection.readyState) {
//             case 0:
//                 console.log("Disconnected from database");
//                 break;
//             case 1:
//                 console.log("Connected to database");
//                 ready = true;
//                 break;
//             case 2:
//                 console.log("Connecting to database");
//                 break;
//             case 3:
//                 console.log("Disconnecting from database");
//                 break;
//             default:
//                 console.log("Unknown database state");
//                 break;
//         }
//     }
//     return ready;
// }
mongoose.Promise = global.Promise
const MONGODB_URI = process.env.MONGODB_URI
console.log("MONGODB URI: " + MONGODB_URI)
let cachedClient = null;

// Function to connect to MongoDB
const DatabaseConnection = async () =>{
  if (cachedClient) {
    console.log('Using cached MongoDB connection');
    return cachedClient;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI);
    // const client = mongoose.createConnection(MONGODB_URI);
    console.log("MongoDB connected successfully");
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("MongoDB connection failed");
  }
}
export default DatabaseConnection;