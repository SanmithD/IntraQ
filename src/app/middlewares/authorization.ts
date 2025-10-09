import { userModel } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const authorization = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    const user = await userModel.findOne({ email: session.user.email });
    if (!user) return null;

    return user._id.toString();
  } catch (error) {
    console.log("middleware server error", error);
    throw new Error("Server error");
  }
};
