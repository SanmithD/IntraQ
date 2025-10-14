import mongoose, { Document } from "mongoose";

export interface BookMark extends Document{
    questionId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const bookmarkSchema = new mongoose.Schema<BookMark>({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true 
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
},{ timestamps: true });

bookmarkSchema.index({ userId: 1, questionId: 1 }, { unique: true, sparse: true });


export const bookmarkModel = mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);