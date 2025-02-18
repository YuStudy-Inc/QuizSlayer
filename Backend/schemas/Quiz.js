import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const QuizSchema = new Schema({
    // _id: { // ID will be generated automatically
    //     type: Schema.Types.ObjectId,
    //     required: true,
    // },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    questions: {
        type: [Schema.Types.ObjectId],
        ref: 'Question',
    }
});

const Quiz = model('Quiz', QuizSchema);
export default Quiz;