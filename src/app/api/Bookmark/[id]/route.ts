import { authorization } from "@/app/middlewares/authorization";
import { bookmarkModel } from "@/models/bookmark.model";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async(req: NextRequest, context: { params: Promise<{ id: string }> }) =>{
    const { id: questionId } = await context.params;
    const userId = await authorization();

    if(!questionId) return NextResponse.json({ message: "invalid id" },{ status: 400 });
    try {
        
        const existingQuestion = await bookmarkModel.findOne({ questionId, userId });

        if(existingQuestion){
            await bookmarkModel.findByIdAndDelete({ questionId, userId });
            return NextResponse.json({ message: "Bookmark removed" },{ status: 202 });
        }else{
            const newBook = new bookmarkModel({
                questionId,
                userId
            });
            await newBook.save();
            return NextResponse.json({ message: "Bookmarked" },{ status: 201 });
        }
    } catch (error) {
        console.log("Server error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}