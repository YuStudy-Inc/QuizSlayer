import DatabaseConnection from './DatabaseConnection.js'
import character from './schemas/character.js'
import express from 'express'

const app = express()
const port = 3000

await DatabaseConnection()

app.get("/getCharacters", async(req, res) => {
    try {
        const characters = await character.find()
        res.json(characters)
    }
    catch (e) {
        console.error("error retrieving Characters: ", e)
        res.status(500).json({"message": "Error retrieving Characters"})
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
