import { authorization } from "@/app/middlewares/authorization";
import { historyModel } from "@/models/history.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) =>{
    const userId = await authorization();
    try {
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const res = await historyModel.find({ userId }).populate('userId').limit(limit).sort({ createdAt: -1});

        if(!res) return NextResponse.json({ message: "Not found" },{ status: 404 });

        return NextResponse.json({ message: "All history", res },{ status: 200 });
    } catch (error) {
        console.log("Server error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}
