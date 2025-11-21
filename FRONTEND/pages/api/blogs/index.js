

import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      if (req.query?.id) {
        const blog = await Blog.findById(req.query.id);
        return res.json(blog);
      }

      if (req.query?.tags) {
        const blogs = await Blog.find({ tags: req.query.tags });
        return res.json(blogs);
      }

      if (req.query?.blogcategory) {
        const blogs = await Blog.find({ blogcategory: req.query.blogcategory });
        return res.json(blogs);
      }

      if (req.query?.slug) {
        const blog = await Blog.findOne({ slug: req.query.slug });
        return res.json(blog);
      }

      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.json(blogs);
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
