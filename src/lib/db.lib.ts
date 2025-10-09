import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        if(!process.env.MONGO_URI) throw new Error("Invalid db url");
        if(mongoose.connection.readyState > 1) return;

        const newConnection = await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to', newConnection.connection.host);
    } catch (error) {
        console.log("Database error", error);
        process.exit(1);
    }
}