import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { questionModel } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest, context: { params: Promise<{ id: string }> }) =>{

    const { id } = await context.params; 
    if(!id) return NextResponse.json({ message: "Invalid id" },{ status: 400 });

    try {
        await connectDB();
        const res = await questionModel.findById(id).populate('userId');
        if(!res){
            return NextResponse.json({ message: "Not found" },{ status: 404 });
        }
        return NextResponse.json({ message: "All questions", res },{ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}

export const PUT = async(req: NextRequest, context: { params: Promise<{ id: string }> }) =>{

    const { id } = await context.params;
    const userId = await authorization();
    if(!userId) return NextResponse.json({ message: "Unauthorized" },{ status: 403 });

    const body = await req.json();
    if(!body) return NextResponse.json({ message: "data is required" },{ status: 400 });
    try {
        await connectDB();
        const updatedQuestion = await questionModel.findByIdAndUpdate(id, {
            ...body
        },{ new: true });
        if(!updatedQuestion) return NextResponse.json({ message: "invalid request" },{ status: 400 });

        return NextResponse.json({ message: "Question updated" },{ status: 202 });
    } catch (error) {
        console.log("Server error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}

export const DELETE = async(req: NextRequest, context: { params: Promise<{ id: string }> }) =>{

    const { id } = await context.params;
    const userId = await authorization();
    if(!userId) return NextResponse.json({ message: "Unauthorized" },{ status: 403 });

    try {
        await connectDB();
        const updatedQuestion = await questionModel.findByIdAndDelete({ _id : id, userId });
        if(!updatedQuestion) return NextResponse.json({ message: "invalid request" },{ status: 400 });

        return NextResponse.json({ message: "Question deleted" },{ status: 202 });
    } catch (error) {
        console.log("Server error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}