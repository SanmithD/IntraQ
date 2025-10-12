import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { voteModel } from "@/models/upVote.model";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    // Extract and validate questionId
    const { id: questionId } = await context.params;
    
    if (!questionId || typeof questionId !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid question ID provided" 
        }, 
        { status: 400 }
      );
    }

    // Authorize user
    const userId = await authorization();
    if (!userId) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Authentication required" 
        }, 
        { status: 401 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid JSON payload" 
        }, 
        { status: 400 }
      );
    }

    const { type } = body;
    
    // Validate vote type
    if (!type || !['up', 'down'].includes(type)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Vote type must be 'up' or 'down'" 
        }, 
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find existing vote
    let existingVote = await voteModel.findOne({ questionId, userId });

    if (!existingVote) {
      // Create new vote
      existingVote = await voteModel.create({
        questionId,
        userId,
        upVote: type === "up" ? 1 : 0,
        downVote: type === "down" ? 1 : 0,
        currentVote: type,
      });
    } else {
      // Handle vote toggle or switch
      if (existingVote.currentVote === type) {
        // Same vote → remove it (toggle off)
        existingVote.upVote = 0;
        existingVote.downVote = 0;
        existingVote.currentVote = null;
      } else {
        // Different vote → switch
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
        message: "Vote updated successfully"
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Vote controller error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error" 
      }, 
      { status: 500 }
    );
  }
};
