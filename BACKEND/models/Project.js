
import mongoose, { Schema, models, model } from "mongoose";

// Schema lưu thông tin dự án hiển thị ngoài portfolio.
// slug là field bắt buộc để định danh project, còn images/category/tags hỗ trợ lọc và trình bày.
const projectSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    client: { type: String },
    projectcategory: [{ type: String }],
    tags: [{ type: String }],
    livepreview: { type: String },
    status: { type: String },
   
  },
  { timestamps: true }
);

export const Project = models.Project || model("Project", projectSchema);
