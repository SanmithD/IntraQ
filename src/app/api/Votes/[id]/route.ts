import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { voteModel } from "@/models/upVote.model";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id: questionId } = await context.params;
  const userId = await authorization();
  const body = await req.json();

  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  try {
    await connectDB();

    const { type } = body; 

    let existingVote = await voteModel.findOne({ questionId, userId });

    if (existingVote) {
      if (type === "up") {
        existingVote.upVotes = (existingVote.upVotes || 0) + 1;
      } else if (type === "down") {
        existingVote.downVotes = (existingVote.downVotes || 0) + 1;
      }
      await existingVote.save();
    } else {
      existingVote = await voteModel.create({
        questionId,
        userId,
        upVotes: type === "up" ? 1 : 0,
        downVotes: type === "down" ? 1 : 0,
      });
    }

    return NextResponse.json({ data: existingVote }, { status: 200 });
  } catch (error) {
    console.log("Server error", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
};
