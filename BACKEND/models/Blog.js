// models/Blog.js
import mongoose, { Schema, models, model } from "mongoose";

// Schema lưu bài viết blog của portfolio.
// images lưu URL ảnh, description thường là markdown, blogcategory/tags dùng để phân loại,
// comments liên kết sang Comment để hỗ trợ phần bình luận nếu cần mở rộng.
const BlogSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    blogcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const Blog = models.Blog || model("Blog", BlogSchema);
