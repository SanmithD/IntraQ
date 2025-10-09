import mongoose, { Document } from "mongoose";

type QuestionUpVote = {
    userId: mongoose.Schema.Types.ObjectId;
    counter: number
}

export interface QuestionDetails extends Document{
    userId: mongoose.Schema.Types.ObjectId;
    company: string;
    language: string;
    role: string;
    question: string;
    upVote?: QuestionUpVote;
    solution?: string;
    createdAt?: Date;
}

const questionSchema = new mongoose.Schema<QuestionDetails>({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company: {
        type: String,
        required: true
    },
    language: {
        type: String
    },
    upVote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        counter: Number
    },
    role: {
        type: String,
    },
    question: {
        type: String
    },
    solution: {
        type: String
    }
},{ timestamps: true });

export const questionModel = mongoose.models.Question || mongoose.model('Question', questionSchema);