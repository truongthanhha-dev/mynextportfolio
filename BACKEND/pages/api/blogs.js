import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await mongooseConnect();

    if (method === "POST") {
      const blog = await Blog.create(req.body);
      res.status(201).json(blog);
      return;
    }

    if (method === "GET") {
      if (id) {
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
      } else {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
      }
      return;
    }

    if (method === "PUT") {
      const { _id, ...updateData } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(_id, updateData, {
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
      await Blog.findByIdAndDelete(id);
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
