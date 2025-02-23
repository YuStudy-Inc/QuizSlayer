import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
    // _id: { // ID will be generated automatically
    //     type: Schema.Types.ObjectId,
    //     required: true,
    // },

    quizId: {
        type: Schema.Types.ObjectId,
            //Change this back later
        default: null,
    },
    questionPrompt: {
        type: String,
    },
    answer: {
        type: String,
    },
    difficulty: {
        type: String,
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