

import mongoose, { Schema, model, models } from "mongoose";

// Schema tài khoản admin/user cho khu vực backend.
// Collection name đang được cố định là "admin" ở cuối file để dùng lại dữ liệu hiện có.
const ProfileSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, 
  },
  { timestamps: true }
);


export default models.Profile || model("Profile", ProfileSchema, "admin");
