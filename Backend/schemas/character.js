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
    picture: {
        type: String,
    },
});

const Character = model('Character', CharacterSchema);
export default Character;