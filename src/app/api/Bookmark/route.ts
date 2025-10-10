import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { bookmarkModel } from "@/models/bookmark.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) =>{
    const userId = await authorization();

    if(!userId) return NextResponse.json({ message: "Unauthorized" },{ status: 403 });
    try {
        await connectDB();

        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '20');

        const res = await bookmarkModel.find(userId).populate('userId').limit(limit).sort({ createdAt: -1 });

        if(!res) return NextResponse.json({ message: "not found" },{ status: 404 });

        return NextResponse.json({ message: "bookmark", res },{ status: 200 });
    } catch (error) {
        console.log("Server error", error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
}