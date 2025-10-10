import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { historyModel } from "@/models/history.model";
import { questionModel } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) =>{
    const userId = await authorization();

    if(!userId) return NextResponse.json({ message: "Unauthorized" },{ status: 403 });

    try {
        await connectDB();
        const url = new URL(req.url);
        const query = url.searchParams.get('query') || "";
        const limit = parseInt(url.searchParams.get('limit') || '20');

        const keywords = query.split(" ").filter(Boolean);

        const res = keywords.map((word) =>({
            $or: [
                { company: { $regex: word, $options: 'i' } },
                { role: { $regex: word, $options: 'i' } },
                { language: { $regex: word, $options: 'i' } },
                { question: { $regex: word, $options: 'i' } },
            ]
        }));

        const questionRes = await questionModel.find({ $and: res }).populate('userId').limit(limit).sort({ createdAt: -1 });

        return NextResponse.json({ message : "Result", questionRes },{ status: 200 });
    } catch (error) {
        console.log("Server Error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}

export const DELETE = async() =>{
    const userId = await authorization();

    if(!userId) return NextResponse.json({ message: "Invalid request" },{ status: 403 });

    try {
       await connectDB();
       const res = await historyModel.deleteMany(userId);
       
       if(!res) return NextResponse.json({ message: "Invalid request" },{ status: 400 });

       return NextResponse.json({ message: "history cleared" },{ status: 202 });
    } catch (error) {
        console.log("Server Error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}