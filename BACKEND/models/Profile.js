

import mongoose, { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, 
  },
  { timestamps: true }
);


export default models.Profile || model("Profile", ProfileSchema, "admin");

