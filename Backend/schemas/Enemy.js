import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EnemySchema = new Schema({
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
    isAlive: {
        type: Boolean,
    },
    picture: { // Reference to picture stored on frontend
        type: String,
    }
});

const Enemy = model('Enemy', EnemySchema);
export default Enemy;