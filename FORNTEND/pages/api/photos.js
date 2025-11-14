// @ts-nocheck
///pages/api/photos.js
import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      if (req.query?.id) {
        const photo = await Photo.findById(req.query.id);
        res.json(photo);
      } else {
        const photos = await Photo.find();
        res.json(photos.reverse());
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
