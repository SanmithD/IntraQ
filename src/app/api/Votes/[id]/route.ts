import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { voteModel } from "@/models/upVote.model";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: questionId } = await context.params;
    if (!questionId || typeof questionId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid question ID provided",
        },
        { status: 400 }
      );
    }

    const userId = await authorization();

    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON payload",
        },
        { status: 400 }
      );
    }
    const { type } = body;

    await connectDB();
    let existingVote = await voteModel.findOne({ questionId, userId });

    if (!existingVote) {
      existingVote = await voteModel.create({
        questionId,
        userId,
        upVote: type === "up" ? 1 : 0,
        downVote: type === "down" ? 1 : 0,
        currentVote: type,
      });
    } else {
      if (existingVote.currentVote === type) {
        existingVote.upVote = 0;
        existingVote.downVote = 0;
        existingVote.currentVote = null;
      } else {
        if (type === "up") {
          existingVote.upVote = 1;
          existingVote.downVote = 0;
        } else {
          existingVote.upVote = 0;
          existingVote.downVote = 1;
        }
        existingVote.currentVote = type;
      }

      await existingVote.save();
    }

    return NextResponse.json(
      {
        success: true,
        data: existingVote,
        message: "Vote updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Vote controller error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id: questionId } = await context.params;
  try {
    await connectDB();

    const upVotesCount = await voteModel.countDocuments({
      questionId: questionId,
      currentVote: "up",
    });

    const downVotesCount = await voteModel.countDocuments({
      questionId: questionId,
      currentVote: "down",
    });

    return NextResponse.json(
      {
        res: [{ upVotes: upVotesCount, downVotes: downVotesCount }],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
