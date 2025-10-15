import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { questionModel } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) =>{
    const userId = await authorization();
    try {
        await connectDB();
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '20');
        const res = await questionModel.find({ userId }).limit(limit).populate('userId').sort({ createdAt: -1 });
        if(!res){
            return NextResponse.json({ message: "Not found" },{ status: 404 });
        }
        return NextResponse.json({ message: "All questions", res },{ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}