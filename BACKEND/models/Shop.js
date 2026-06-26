
import mongoose, { Schema, models, model } from "mongoose";

// Schema lưu sản phẩm hoặc affiliate item trong phần Shop.
// afilink giữ link affiliate, price giữ giá dạng chuỗi để admin nhập linh hoạt theo giao diện.
const ProductSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: String },
    status: { type: String },
   
  },
  { timestamps: true }
);

export const Shop = models.Shop || model("Shop", ProductSchema);
