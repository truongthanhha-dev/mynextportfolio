import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await mongooseConnect();

    if (method === "POST") {
      const blog = await Contact.create(req.body);
      res.status(201).json(blog);
      return;
    }

    if (method === "GET") {
      if (id) {
        const blog = await Contact.findById(id);
        res.status(200).json(blog);
      } else {
        const blogs = await Contact.find();
        res.status(200).json(blogs);
      }
      return;
    }

    if (method === "PUT") {
      const { _id, ...updateData } = req.body;
      const updatedBlog = await Contact.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
      res.status(200).json(updatedBlog);
      return;
    }

    if (method === "DELETE") {
      if (!id) {
        res.status(400).json({ error: "Missing id" });
        return;
      }
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ success: true });
      return;
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message });
  }
}
