
import { mongooseConnect } from "@/lib/mongoose";
import { Photos } from "@/models/Photo";

// API quản lý Gallery/Photos cho admin.
// Cấu trúc giống project/shop: hỗ trợ tạo, đọc, cập nhật và xóa ảnh theo id.
// Slug được sinh từ title khi cần để mỗi ảnh/gallery item có định danh dễ dùng.
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await mongooseConnect();

    if (method === "POST") {
      const data = req.body;

      // Tự tạo slug khi title có dữ liệu nhưng form không gửi slug.
      if (!data.slug && data.title) {
        data.slug = data.title.trim().toLowerCase().replace(/\s+/g, "-");
      }

      if (!data.slug) {
        return res.status(400).json({ error: "Slug is required" });
      }

      const photo = await Photos.create(data);
      console.log("Created Photo:", photo);
      return res.status(201).json(photo);
    }

    if (method === "GET") {
      if (id) {
        const photo = await Photos.findById(id);
        return res.status(200).json(photo);
      } else {
        const photos = await Photos.find();
        return res.status(200).json(photos);
      }
    }

    if (method === "PUT") {
      const { _id, ...updateData } = req.body;

      if (!updateData.slug && updateData.title) {
        updateData.slug = updateData.title.trim().toLowerCase().replace(/\s+/g, "-");
      }

      const updatedShop = await Photos.findByIdAndUpdate(_id, updateData, { new: true });
      return res.status(200).json(updatedShop);
    }

    
    if (method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });
      await Photos.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error("ERROR in /api/photos:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}
