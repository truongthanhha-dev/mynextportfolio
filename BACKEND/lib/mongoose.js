// lib/mongooseConnect.js
import mongoose from "mongoose";

// Hàm kết nối MongoDB dùng chung cho các API route.
// Nếu connection đã mở thì trả lại connection hiện tại để tránh tạo kết nối mới liên tục.
export async function mongooseConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    console.log("MongoDB connected to:", conn.connection.name);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
