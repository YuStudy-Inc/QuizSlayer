import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    // _id: { // ID will be generated automatically
    //     type: Schema.Types.ObjectId,
    //     required: true,
    // },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    pfp: {
        type: String,
        default: "https://profile-pictures-for-quizslayer.s3.us-east-1.amazonaws.com/duckDefault.png"
    },
    description: {
        type: String,
        default: ""
    },
    friendsList: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    friendRequests: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    inventory: {
        // type: Schema.Types.ObjectId, // Not ObjectID because Item uses Number for ID
        type: [Number],
        ref: 'Item',
        // required: true,
    },
    characterList: {
        type: [Number],
        ref: 'Character',
        default: [1]
    },
    selectedCharacter: { // Stores Character ID
        type: Number,
        default: 1
    },
    selectedHat: {
        type: Number,
        default: 0
    },
    selectedWeapon: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    monstersSlain: {
        type: Number,
        default: 0
    },
    // __v: { // Auto generated/updated by MongoDB, not needed
    //     type: Number
    // }
});

const User = model('User', UserSchema);

export default User;