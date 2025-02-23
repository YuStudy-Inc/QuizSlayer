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
    //we will just have QuizId attached to the questions that are in this quiz and then call all of the questions with the quizID
    /* questions: {
        type: [Schema.Types.ObjectId],
        ref: 'Question',
        default: null,
    } */
});

const Quiz = model('Quiz', QuizSchema);
export default Quiz;