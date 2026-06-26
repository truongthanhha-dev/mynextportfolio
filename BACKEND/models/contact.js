
import mongoose, { Schema, models, model } from "mongoose";

// Schema lưu thông tin người dùng gửi từ form contact ngoài frontend.
// project là mảng vì một khách có thể chọn nhiều loại dịch vụ/dự án cần trao đổi.
const ContactSchema = new Schema(
  {
    name:  { type: String, required: true },
    lname: { type: String },
    email:  { type: String, required: true },
    company: { type: String },
    phone:  { type: String, required: true },
    country: { type: String },
    price: { type: String },
    description: { type: String },
    project: [{ type: String }],
  },
  { timestamps: true }
);

export const Contact = models.Contact || model("Contact", ContactSchema);
