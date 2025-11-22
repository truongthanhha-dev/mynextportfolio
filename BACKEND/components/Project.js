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

export default function Project({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  client: existingClient,
  projectcategory: existingProjectCategory,
  tags: existingTags,
  livepreview: existingLivePreview,
  status: existingStatus,
}) {

  const [redirect, setRedirect] = useState(false);
  const route = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || '');
  const [client, setClient] = useState(existingClient || '');
  const [projectcategory, setProjectCategory] = useState(existingProjectCategory || []);
  const [tags, setTags] = useState(existingTags || []);
  const [livepreview, setLivePreview] = useState(existingLivePreview || '');
  const [status, setStatus] = useState(existingStatus || '');

  // upload
  const [isUploading, setIsUploading] = useState(false);

  async function saveProject(ev) {
    ev.preventDefault();

    const cleanCategories = projectcategory.filter(c => c !== "");
    const cleanTags = tags.filter(t => t !== "");

    const data = {
      title,
      slug,
      images,
      description,
      client,
      projectcategory: cleanCategories,
      tags: cleanTags,
      livepreview,
      status
    };

    try {
      if (_id) {
        await axios.put('/api/projects', { ...data, _id });
        toast.success('Project Updated');
      } else {
        await axios.post('/api/projects', data);
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
    route.push('/projects');
    return null;
  }

  function updateImagesOrder(newImages) {
    setImages(newImages);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success('Image deleted successfully');
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, '-');
    setSlug(newSlug);
  };

  return (
    <>
      <form className='addWebsiteform' onSubmit={saveProject}>
        {/* Project title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder='Nhập tiêu đề dự án'
            value={title}
            onChange={ev => setTitle(ev.target.value)}
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

        {/* Client Name */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="client">Tên khách hàng</label>
          <input
            type="text"
            id="client"
            placeholder='Nhập tên khách hàng'
            value={client}
            onChange={ev => setClient(ev.target.value)}
          />
        </div>

        {/* Live Preview */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="livepreview">Xem trước trực tiếp</label>
          <input
            type="text"
            id="livepreview"
            placeholder='Nhập URL'
            value={livepreview}
            onChange={ev => setLivePreview(ev.target.value)}
          />
        </div>

        {/* Category */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">Chọn danh mục (Ctrl + Nhấp để chọn nhiều danh mục)</label>
          <select
            onChange={(e) => setProjectCategory(Array.from(e.target.selectedOptions, option => option.value))}
            value={projectcategory}
            name="category"
            id="category"
            multiple
          >
            
            <option value="Admin Dashboard">Website Quản lý (Admin)</option>
            <option value="E-commerce Website">Website Thương mại điện tử</option>
            <option value="Portfolio Website">Portfolio Website</option>
            


          </select>
        </div>

        {/* Images */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label htmlFor="images">Hình ảnh (hình ảnh đầu tiên = hình thu nhỏ, bạn có thể kéo)</label>
            <input
              type="file"
              id="fileInput"
              className='mt-1'
              accept='image/*'
              multiple
              onChange={uploadImages}
            />
          </div>
          <div className="w-100 flex flex-left mt-1">
            {isUploading && (<Spinner />)}
          </div>
        </div>

        {/* Image Preview */}
        {!isUploading && (
          <div className="flex">
            <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1'>
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

        {/* Markdown Description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Mô tả dự án</label>
          <MarkdownEditor
            value={description}
            onChange={(ev) => setDescription(ev.text)}
            style={{ width: '100%', height: "400px" }}
            renderHTML={(text) => (
              <ReactMarkdown>{text}</ReactMarkdown>
            )}
          />
        </div>

        {/* Tags */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Thẻ</label>
          <select
            onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))}
            value={tags}
            name="tags"
            id="tags"
            multiple
          >
            <option value="html">html</option>
            <option value="css">css</option>
            <option value="reactjs">reactjs</option>
            <option value="nextjs">nextjs</option>
            <option value="database">database</option>
          </select>
        </div>

        {/* Status */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Trạng thái</label>
          <select onChange={ev => setStatus(ev.target.value)} value={status} name="status" id="status">
            <option value="">Chưa chọn</option>
            <option value="draft">Bản nháp</option>
            <option value="published">Đã xuất bản</option>
          </select>
        </div>

        {/* Submit */}
        <div className="w-100 mb-1">
          <button type="submit" className='w-100 addwebbtn flex-center'>LƯU DỮ LIỆU</button>
        </div>
      </form>
    </>
  );
}
