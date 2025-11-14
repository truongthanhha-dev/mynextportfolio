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

export default function Photo({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,

}) {

  const [redirect, setRedirect] = useState(false);
  const route = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [images, setImages] = useState(existingImages || []);


  // upload
  const [isUploading, setIsUploading] = useState(false);

  async function saveProject(ev) {
    ev.preventDefault();


    const data = {
      title,
      slug,
      images,
    };

    try {
      if (_id) {
        await axios.put('/api/photos', { ...data, _id });
        toast.success(' Data Updated');
      } else {
        await axios.post('/api/photos', data);
        toast.success(' Data Created');
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
    route.push('/gallery');
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



        {/* Images */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label htmlFor="images">Hình ảnh (Hình ảnh đầu tiên = hình thu nhỏ, bạn có thể kéo)</label>
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



        <div className="w-100 mb-1">
          <button type="submit" className='w-100 addwebbtn flex-center'>LƯU DỮ LIỆU</button>
        </div>

      </form>
    </>
  );
}

