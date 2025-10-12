import mongoose, { Document } from "mongoose";

export interface UpVote extends Document {
  questionId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  upVote?: number;
  downVote?: number;
  createdAt?: Date;
  updatedAt?: Date;
  currentVote?: string;
}

const upVoteSchema = new mongoose.Schema<UpVote>(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    upVote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
    currentVote: { 
      type: String, 
      enum: ["up", "down", null], 
      default: null 
    },
  },
  { timestamps: true }
);

upVoteSchema.index({ questionId: 1, userId: 1 }, { unique: true });

export const voteModel =
  mongoose.models.UpVote || mongoose.model("UpVote", upVoteSchema);
