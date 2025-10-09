import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { questionModel } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) =>{
    try {
        await connectDB();
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '20');
        const res = await questionModel.find().limit(limit).populate('userId').sort({ createdAt: -1 });
        if(!res){
            return NextResponse.json({ message: "Not found" },{ status: 404 });
        }
        return NextResponse.json({ message: "All questions", res },{ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}

export const POST = async(req: NextRequest) =>{
    const userId = await authorization();
    if(!userId) return NextResponse.json({ message: "Unauthorized" },{ status: 403 });

    const body = await req.json();
    if(!body) return NextResponse.json({ message: "data is required" },{ status: 400 });
    try {
        await connectDB();
        const newQuestion = new questionModel({
            userId,
            ...body
        });
        if(!newQuestion) return NextResponse.json({ message: "Invalid request" },{ status: 400 });
        await newQuestion.save();

        return NextResponse.json({ message: "New Question posted" },{ status: 201 });
    } catch (error) {
        console.log("Server error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}