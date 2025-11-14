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

export default function Blog({ 
    _id,
    title: existingTitle,
    slug: existingslug,
    images: existingimages,
    description: existingdescription,
    blogcategory: existingblogcategory,
    tags: existingtags,
    status: existingstatus,
    
}) {
    
    const [redirect, setRedirect] = useState(false);
    const route = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setslug] = useState(existingslug || '');
    const [images, setimages] = useState(existingimages || []);
    const [description, setdescription] = useState(existingdescription || '');
    const [blogcategory, setblogcategory] = useState(existingblogcategory || []);
    const [tags, settags] = useState(existingtags || []);
    const [status, setstatus] = useState(existingstatus || '');

    // upload
    const [isUploading, setIsUploading] = useState(false);

    async function createBlog(ev) {
        ev.preventDefault();

        const data = { title, slug, images, description, blogcategory, tags, status };

        if (_id) {
            await axios.put('/api/blogs', { ...data, _id });
            toast.success('Data Updated');
        } else {
            await axios.post('/api/blogs', data);
            toast.success('Blog Created');
        }

        setRedirect(true);
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

            setimages((prev) => [...prev, ...uploadedLinks]);
            toast.success('Images uploaded successfully');
        } catch (err) {
            console.error(err);
            toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
    }

    if (redirect) {
        route.push('/blogs');
        return null;
    }

    function updateImagesOrder(newImages) {
        setimages(newImages);
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setimages(updatedImages);
        toast.success('Image deleted successfully');
    }

    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-');
        setslug(newSlug);
    };

    return (
        <>
            <form className='addWebsiteform' onSubmit={createBlog}>
                {/* blog tittle */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="tittle">Tiêu đề</label>
                    <input type="text" name="tittle" placeholder='Nhập tiêu đề phụ' value={title} onChange={ev => setTitle(ev.target.value)} />
                </div>

                {/* blog slug url */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="slug">Đường dẫn</label>
                    <input type="text" id="slug" placeholder='Nhập Slug URL' value={slug} onChange={handleSlugChange} />
                </div>

                {/* blog category */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="category">Chọn danh mục (nhấn Ctrl + chuột trái để chọn nhiều mục)</label>
                    <select onChange={(e) => setblogcategory(Array.from(e.target.selectedOptions, option => option.value))} value={blogcategory}
                        name="category" id="category" multiple>
                        <option value="Node Js">Node Js</option>
                        <option value="React Js">React Js</option>
                        <option value="Next Js">Next Js</option>
                        <option value="Css">Css</option>
                        <option value="Mongo Db">Mongo Db</option>
                        <option value="Express Js">Express Js</option>
                        <option value="JavaScript">JavaScript</option>
                    </select>
                </div>

                {/* blog images */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <div className="w-100">
                        <label htmlFor="images">Hình ảnh (hình đầu tiên sẽ hiển thị làm ảnh đại diện, bạn có thể kéo thả)</label>
                        <input type="file" id="fileInput" className='mt-1' accept='image/*' multiple onChange={uploadImages} />
                    </div>
                    <div className="w-100 flex flex-left mt-1">
                        {isUploading && (<Spinner />)}
                    </div>
                </div>

                {/* image preview */}
                {!isUploading && (
                    <div className="flex">
                        <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1'>
                            {images?.map((link, index) => (
                                <div key={link} className='uploaded-image'>
                                    <img src={link} alt="image" className='object-cover' />
                                    <div className='deleteing'>
                                        <button onClick={() => handleDeleteImage(index)} >
                                            <MdDeleteForever />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </ReactSortable>

                    </div>
                )}

                {/* markdown */}
                <div className="description w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="description">Nội dung bài viết</label>
                    <MarkdownEditor
                        value={description}
                        onChange={(ev) => setdescription(ev.text)}
                        style={{ width: '100%', height: "400px" }}
                        renderHTML={(text) => (
                            <ReactMarkdown>{text}</ReactMarkdown>
                        )}
                    />
                </div>

                {/* tags */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="tags">Tags</label>
                    <select onChange={(e) => settags(Array.from(e.target.selectedOptions, option => option.value))} value={tags} name="tags" id="tags" multiple>
                        <option value="html">html</option>
                        <option value="css">css</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="reactjs">react</option>
                        <option value="nextjs">nodejs</option>
                        <option value="database">database</option>
                    </select>
                </div>

                {/* status */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="status">Status</label>
                    <select onChange={ev => setstatus(ev.target.value)} value={status} name="status" id="status">
                        <option value="">Chưa chọn</option>
                        <option value="draft">Nháp</option>
                        <option value="published">Đã xuất bản</option>
                    </select>
                </div>

                <div className="w-100 mb-1">
                    <button type="submit" className='w-100 addwebbtn flex-center'>LƯU BLOG</button>
                </div>
            </form>
        </>
    );
}
