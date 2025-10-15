import { authorization } from "@/app/middlewares/authorization";
import { connectDB } from "@/lib/db.lib";
import { questionModel } from "@/models/questions.model";
import { userModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const userId = await authorization();

  try {
    await connectDB();

    const profile = await userModel.findById(userId);

    if (!profile)
      return NextResponse.json({ message: "not found" }, { status: 404 });

    return NextResponse.json({ message: "profile", profile }, { status: 200 });
  } catch (error) {
    console.log("Server error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const DELETE = async () => {
  const userId = await authorization();

  try {
    await connectDB();

    const profile = await userModel.findOneAndDelete({ userId });
    const questions = await questionModel.deleteMany({ userId });

    if (!profile || !questions)
      return NextResponse.json({ message: "not found" }, { status: 404 });

    return NextResponse.json({ message: "deleted" }, { status: 202 });
  } catch (error) {
    console.log("Server error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const userId = await authorization();

  const body = await req.json();

  try {
    await connectDB();

    const profile = await userModel.updateOne(
      { _id: userId },
      { $set: { username: body.username } }
    );

    if (!profile)
      return NextResponse.json({ message: "not found" }, { status: 404 });

    return NextResponse.json({ message: "profile" }, { status: 200 });
  } catch (error) {
    console.log("Server error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
