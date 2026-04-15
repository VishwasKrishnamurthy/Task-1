import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI missing in environment");
  }

  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(uri);
};