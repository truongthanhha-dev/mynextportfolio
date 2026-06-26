import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

// API quản lý Blog cho dashboard admin.
// Endpoint này xử lý đủ bốn nhóm thao tác chính: tạo bài viết,
// đọc danh sách/chi tiết, cập nhật nội dung và xóa bài viết.
// Blog model bên dưới quyết định các field được lưu vào MongoDB.
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
      // Nếu query có id thì trả về một bài cụ thể, nếu không có id thì trả về toàn bộ danh sách.
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
