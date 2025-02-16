import DatabaseConnection from './DatabaseConnection.js';
import { Character } from './schemas/Schemas.js';
import express from 'express';
import { Schema } from 'mongoose';

const app = express();
const port = 3001;

await DatabaseConnection()

app.get("/Characters", async(req, res) => {
    try {
        let characters = await Character.find();
        res.json(characters);
    }
    catch (error) {
        console.log("An error occured while connecting to the database: ");
        console.log(error)
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})