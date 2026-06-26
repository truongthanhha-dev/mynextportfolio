import { Project } from "@/models/Project";
import { mongooseConnect } from "@/lib/mongoose";

// API quản lý Projects cho dashboard admin.
// File này gom các thao tác CRUD của project vào cùng một endpoint:
// POST để tạo project mới, GET để lấy danh sách hoặc lấy theo id,
// PUT để cập nhật project đang có, DELETE để xóa project theo id.
// Các comment trong file chỉ dùng để giải thích luồng xử lý, không đổi logic API.
export default async function handler(req, res) {
 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");


  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method } = req;
  const { id } = req.query;

  try {
    await mongooseConnect();


    if (method === "POST") {
      const data = req.body;

      // Nếu admin chưa nhập slug thủ công thì tạo slug đơn giản từ title
      // để frontend có đường dẫn ổn định cho từng project.
      if (!data.slug && data.title) {
        data.slug = data.title.trim().toLowerCase().replace(/\s+/g, "-");
      }

      if (!data.slug) {
        return res.status(400).json({ error: "Slug is required" });
      }

      const project = await Project.create(data);
      console.log("Created Project:", project);
      return res.status(201).json(project);
    }

    if (method === "GET") {
      if (id) {
        const project = await Project.findById(id);
        return res.status(200).json(project);
      } else {
        const projects = await Project.find();
        return res.status(200).json(projects);
      }
    }

    if (method === "PUT") {
      const { _id, ...updateData } = req.body;

      // Khi update vẫn giữ quy tắc tự sinh slug nếu title có nhưng slug trống.
      if (!updateData.slug && updateData.title) {
        updateData.slug = updateData.title.trim().toLowerCase().replace(/\s+/g, "-");
      }

      const updatedProject = await Project.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
      return res.status(200).json(updatedProject);
    }

    if (method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error("ERROR in /api/projects:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}
