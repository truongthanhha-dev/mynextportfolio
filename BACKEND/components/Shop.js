import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteForever } from "react-icons/md";
import Head from "next/head";

export default function Shop({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  afilink: existingAfilink,
  price: existingPrice,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || '');
  const [afilink, setAfilink] = useState(existingAfilink || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [status, setStatus] = useState(existingStatus || '');


  const [tags, setTags] = useState([]);
  const [projectcategory, setProjectCategory] = useState([]);

  const [isUploading, setIsUploading] = useState(false);

  async function saveProject(ev) {
    ev.preventDefault();

    const cleanCategories = projectcategory.filter((c) => c !== "");
    const cleanTags = tags.filter((t) => t !== "");

    const data = {
      title,
      slug,
      images,
      description,
      afilink,
      price,
      projectcategory: cleanCategories,
      tags: cleanTags,
      status,
    };

    try {
      if (_id) {
        await axios.put('/api/shops', { ...data, _id });
        toast.success('Data Updated');
      } else {
        await axios.post('/api/shops', data);
        toast.success('Project Created');
      }
      setRedirect(true);
    } catch (err) {
      toast.error('Error saving project');
      console.error(err);
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (!files || files.length === 0) {
      toast.error('No files selected');
      return;
    }

    setIsUploading(true);
    const uploadedLinks = [];

    try {
      for (const file of files) {
        const data = new FormData();
        data.append('file', file);
        const res = await axios.post('/api/upload', data);

        if (res?.data?.links) {
          uploadedLinks.push(...res.data.links);
        } else if (res?.data?.link) {
          uploadedLinks.push(res.data.link);
        }
      }

      setImages((prev) => [...prev, ...uploadedLinks]);
      toast.success('Images uploaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  }

  if (redirect) {
    router.push('/shops');
    return null;
  }

  function updateImagesOrder(newImages) {
    setImages(newImages);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success('🗑️ Image deleted');
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, '-').toLowerCase();
    setSlug(newSlug);
  };

  return (
    <>
      <Head>
        <title>{_id ? "Edit Shop Item" : "Add Shop Item"}</title>
      </Head>

      <form className='addWebsiteform' onSubmit={saveProject}>
        {/* Title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Tiêu đề</label>
          <input
            type="text"
            id="title"
            placeholder='Nhập tiêu đề dự án'
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            required
          />
        </div>

        {/* Slug */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Đường dẫn</label>
          <input
            type="text"
            id="slug"
            placeholder='Nhập Slug URL'
            value={slug}
            onChange={handleSlugChange}
          />
        </div>

        {/* Affiliate Link */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="afilink">Liên kết </label>
          <input
            type="text"
            id="afilink"
            placeholder='Nhập liên kết'
            value={afilink}
            onChange={(ev) => setAfilink(ev.target.value)}
          />
        </div>

        {/* Price */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="price">Giá</label>
          <input
            type="text"
            id="price"
            placeholder='Nhập giá'
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </div>

        {/* Images */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="images">Hình ảnh (kéo để sắp xếp lại)</label>
          <input
            type="file"
            id="fileInput"
            accept='image/*'
            multiple
            onChange={uploadImages}
          />
          {isUploading && <Spinner />}
        </div>

        {/* Image Preview */}
        {!isUploading && (
          <div className="flex gap-1 mt-1">
            <ReactSortable list={images} setList={updateImagesOrder} animation={200}>
              {images?.map((link, index) => (
                <div key={link + index} className='uploadedimg'>
                  <img src={link} alt="image" className='object-cover' />
                  <div className='deleteimg'>
                    <button type="button" onClick={() => handleDeleteImage(index)}>
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        {/* Description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Mô tả</label>
          <MarkdownEditor
            value={description}
            onChange={(ev) => setDescription(ev.text)}
            style={{ width: '100%', height: "400px" }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          />
        </div>

        {/* Tags */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Thẻ</label>
          <select
            multiple
            value={tags}
            onChange={(e) =>
              setTags(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="reactjs">ReactJS</option>
            <option value="nextjs">Next.js</option>
            <option value="database">Database</option>
          </select>
        </div>

        {/* Status */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Trạng thái</label>
          <select
            onChange={(ev) => setStatus(ev.target.value)}
            value={status}
            name="status"
            id="status"
          >
            <option value="">Chưa chọn</option>
            <option value="draft">Nháp</option>
            <option value="published">Đã xuất bản</option>
          </select>
        </div>

        {/* Submit */}
        <div className="w-100 mb-1">
          <button type="submit" className='w-100 addwebbtn flex-center'>LƯU DATA</button>
        </div>
      </form>
    </>
  );
}
