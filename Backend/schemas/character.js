import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CharacterSchema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
    },
    health: {
        type: Number,
    },
    hat: {
        type: Number,
    },
    weapon: {
        type: Number,
    },
    isAlive: {
        type: Boolean,
    },
    picture: {
        type: String,
    },
});

const Character = model('Character', CharacterSchema);
export default Character;