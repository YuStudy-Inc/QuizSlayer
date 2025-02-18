import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    picture: { // Reference to picture stored on frontend
        type: String,
    }
});

const Item = model('Item', ItemSchema);
export default Item;