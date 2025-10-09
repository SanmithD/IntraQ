import mongoose from "mongoose";

export interface userDetails extends Document{
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

const userSchema = new mongoose.Schema<userDetails>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    }
},{ timestamps: true });

export const userModel = mongoose.models.User || mongoose.model('User', userSchema);