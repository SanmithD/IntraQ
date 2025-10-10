import mongoose, { Document } from "mongoose";

export interface UpVote extends Document {
  questionId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  upVotes?: number;
  downVotes?: number;
  createdAt?: Date;
  updatedAt?: Date;
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
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

upVoteSchema.index({ questionId: 1, userId: 1 }, { unique: true });

export const voteModel =
  mongoose.models.UpVote || mongoose.model("UpVote", upVoteSchema);
