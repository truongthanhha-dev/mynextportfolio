import cloudinary from 'cloudinary';
import multiparty from 'multiparty';
import { mongooseConnect } from '../../lib/mongoose';
import { mongo } from 'mongoose';

// API upload file lên Cloudinary.
// bodyParser bị tắt ở cuối file để multiparty có thể đọc multipart/form-data.
// Kết quả trả về là mảng links, các form Blog/Project/Shop/Photo sẽ lưu các URL này vào MongoDB.
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

export default async function handle(req, res) {
    //conect database
    await mongooseConnect();
    const form = new multiparty.Form();
    // Parse form upload thủ công vì request chứa file nhị phân, không phải JSON thường.
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        })
    });

    const links = [];
    // for (const file of files.file) {
    // Hỗ trợ cả input tên "file" và fallback sang field file đầu tiên nếu form đổi tên.
    const uploadedFiles = files.file || Object.values(files)[0] || [];

    for (const file of uploadedFiles) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: 'vbm-admin',
            public_id: `file_${Date.now()}`,
            resource_type: 'auto',
        });

        const link = result.secure_url;
        links.push(link);
    }

    return res.json({ links });
}

export const config = {
    api: { bodyParser: false }
}
