// import { mongooseConnect } from "@/lib/mongoose";
import { mongooseConnect } from "@/lib/mongoose";

import { hash } from "bcryptjs";
// import { Profile } from "@/models/Profile";
import Profile from "@/models/Profile";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await mongooseConnect();
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create a new user
    const newUser = await Profile.create({
      email,
      password: hashedPassword
    });

    return res.status(201).json({ 
      message: "User Created Successfully", 
      user: newUser._id 
    });

  } catch(error) {
  console.error("Signup API Error:", error);
  return res.status(500).json({ error: error.message });
}

}
