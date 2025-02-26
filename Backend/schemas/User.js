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
    pfp: { // TODO
        type: Number,
    },
    description: {
        type: String,
        default: ""
    },
    friendsList: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    inventory: {
        // type: Schema.Types.ObjectId, // Not ObjectID because Item uses Number for ID
        type: [Number],
        ref: 'Item',
        default: [1]
        // required: true,
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
    // __v: { // Auto generated/updated by MongoDB, not needed
    //     type: Number
    // }
});

const User = model('User', UserSchema);
export default User;