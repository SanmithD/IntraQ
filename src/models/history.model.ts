import mongoose, { Document } from "mongoose";

export interface HistoryDetails extends Document{
    userId: mongoose.Schema.Types.ObjectId;
    questionId: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const historySchema = new mongoose.Schema<HistoryDetails>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
},{ timestamps: true });

export const historyModel = mongoose.models.History || mongoose.model("History", historySchema);