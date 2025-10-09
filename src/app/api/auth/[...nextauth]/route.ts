import { connectDB } from "@/lib/db.lib";
import { userModel } from "@/models/user.model";
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ user }: { user: User }){
            try {
                await connectDB();
                const existingUser = await userModel.findOne({ email: user.email });
                if(!existingUser){
                    const newUser = new userModel({
                        username: user.name,
                        email: user.email
                    });
                    await newUser.save();
                }
                return true;
            } catch (error) {
                console.log("gogole signup error", error);
                throw new Error("Signup error");
            }
        },
        async session({ session, token }: { session: Session, token: JWT }){
            if(token.sub){
                (session.user as { id: string }).id = token.sub
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
