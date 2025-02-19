import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
    // _id: { // ID will be generated automatically
    //     type: Schema.Types.ObjectId,
    //     required: true,
    // },
    quizId: {
        type: Schema.Types.ObjectId,
    },
    questionPrompt: {
        type: String,
    },
    choices: {
        type: [String],
    },
    answer: {
        type: Number,
    },
    difficulty: {
        type: Number,
    },
    pointsIfRight: {
        type: Number,
    },
    pointsIfWrong: {
        type: Number,
    }
});

const Question = model('Question', QuestionSchema);
export default Question;