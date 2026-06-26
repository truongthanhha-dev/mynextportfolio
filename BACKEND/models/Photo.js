
import mongoose, { Schema, models, model } from "mongoose";

// Schema lưu item gallery/photo.
// Mỗi bản ghi có title, slug và danh sách URL ảnh đã upload lên Cloudinary.
const PhotosSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
   
   
  },
  { timestamps: true }
);

export const Photos = models.Photos || model("Photos", PhotosSchema);
