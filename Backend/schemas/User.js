import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    // _id: { // ID will be generated automatically
    //     type: Schema.Types.ObjectId,
    //     required: true,
    // },
    username: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    pfp: { // TODO
        type: Number,
    },
    description: {
        type: String,
    },
    inventory: {
        // type: Schema.Types.ObjectId, // Not ObjectID because Item uses Number for ID
        type: [Number],
        ref: 'Item',
        // required: true,
    },
    selectedCharacter: { // Stores Character ID
        type: String
    },
    xp: {
        type: Number
    },
    coins: {
        type: Number
    }
});

const User = model('User', UserSchema);
export default User;