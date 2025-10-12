import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { historyModel } from "@/models/history.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest, context: { params: Promise<{ id: string }> }) =>{
    const { id } = await context.params;
    const userId = await authorization();

    if(!id || !userId) return NextResponse.json({ message: "Invalid request" },{ status: 403 });

    try {
       await connectDB();
       const res = new historyModel({
        userId,
        questionId: id
       });
       
       if(!res) return NextResponse.json({ message: "Invalid request" },{ status: 400 });
       await res.save();
       return NextResponse.json({ message: "saved" },{ status: 202 });
    } catch (error) {
        console.log("Server Error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}

export const DELETE = async(req: NextRequest, context: { params: Promise<{ id: string }> }) =>{
    const { id } = await context.params;
    const userId = await authorization();

    if(!id || !userId) return NextResponse.json({ message: "Invalid request" },{ status: 403 });

    try {
       await connectDB();
       const res = await historyModel.findByIdAndDelete(id, {id, userId});
       
       if(!res) return NextResponse.json({ message: "Invalid request" },{ status: 400 });

       return NextResponse.json({ message: "history cleared" },{ status: 202 });
    } catch (error) {
        console.log("Server Error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}

export const GET = async(req: NextRequest, context: { params: Promise<{ id: string }> }) =>{
    const { id } = await context.params;
    const userId = await authorization();

    if(!id || !userId) return NextResponse.json({ message: "Invalid request" },{ status: 403 });

    try {
       await connectDB();
       const res = await historyModel.findById(id);
       
       if(!res) return NextResponse.json({ message: "Invalid request" },{ status: 400 });

       return NextResponse.json({ message: "history cleared" },{ status: 202 });
    } catch (error) {
        console.log("Server Error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}