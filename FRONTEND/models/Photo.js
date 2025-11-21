//models/Photo.js
import { Schema, model, models } from "mongoose";

const PhotoSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);


export const Photo = models.Photo || model("Photo", PhotoSchema);
