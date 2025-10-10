import mongoose, { Document } from "mongoose";

export interface QuestionDetails extends Document{
    userId: mongoose.Schema.Types.ObjectId;
    company: string;
    language: string;
    role: string;
    question: string;
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