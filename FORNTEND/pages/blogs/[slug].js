// pages/blogs/[slug].js
import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { Children, useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiSearch } from "react-icons/fi";
import Blogsearch from "@/components/Blogsearch";

const renderComments = (comments = [], onReply) => {
    const roots = comments.filter((c) => c?.maincommnet || c?.maincomment);

    if (roots.length === 0) {
        return <p>Chưa có bình luận.</p>;
    }

    return roots.map((parentComment) => (
        <div className="blogcomment" key={parentComment._id}>
            <div className="blogcomment__header">
                <span className="blogcomment__author">{parentComment.name || "Ẩn danh"}</span><span></span>
                <span className="blogcomment__time">
                    {parentComment.createdAt
                        ? new Date(parentComment.createdAt).toLocaleString("vi-VN")
                        : ""}
                </span>
            </div>
            {parentComment.title && (
                <div className="blogcomment__topic">
                    <span className="blogcomment__topic-label">Chủ đề:</span>{" "}
                    <span className="blogcomment__topic-value">{parentComment.title}</span>
                </div>
            )}
            <div className="blogcomment__content">{parentComment.contentpera}</div>
            <button type="button" className="blogcomment__reply" onClick={() => onReply?.(parentComment)}>Trả lời</button>
        </div>
    ));
};


const BlogPage = () => {
    const router = useRouter();

    const { slug } = router.query;// fetch the slug parameter from the router

    //    hook for all data fetching
    const { allData = [] } = useFetchData('/api/blogs');

    const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = () => {
        setSearchInput(!searchInput);
    }

    const handleSearchClose = () => {
        setSearchInput(false);
    }

    const [blogData, setBlogData] = useState({ blog: {}, comments: [] })//initialize comments as an empty array
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincommnet: true,
        parent: null, //track parent comment id for replies
        parentName: '',//track parent comment name
    })


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageOk, setMessageOk] = useState('');
    const [copied, setCopied] = useState(false);
    const [syntaxHighlighter, setSyntaxHighlighter] = useState(null);
    const [syntaxTheme, setSyntaxTheme] = useState(null);
    useEffect(() => {
        const fetchBlogData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/blogs/${slug}`);
                    console.log("API DATA:", response.data);
                    setBlogData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch blog data. Please try again later.');
                    setLoading(false);
                }
            }
        };

        fetchBlogData();
    }, [slug]); // fetch data whenever slug changes

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/blogs/${slug}`, newComment);

            //check if it's reply (nested comment) or root comment
            if (newComment.parent) {
                //add the new comment to its parent's children array
                setBlogData(prevData => {
                    const updatedComments = prevData.comments.map(comment => {
                        if (comment._id === newComment.parent) {
                            return {
                                ...comment,
                                children: [...comment.children, response.data]
                            }

                        } else if (comment.children && comment.children.length > 0) {
                            //recursively update children comments
                            return {
                                ...comment,
                                children: updateChildrenComments(comment.children, newComment.parent, response.data)
                            };

                        }
                        return comment;
                    });
                    return {
                        ...prevData,
                        comments: updatedComments
                    }
                })
            } else {
                //add new root comment
                setBlogData(prevData => ({
                    ...prevData,
                    comments: [response.data, ...prevData.comments]
                }))
            }
            setMessageOk('✅ Bình luận đã được đăng thành công');
            setTimeout(() => {
                setMessageOk('')

            }, 5000);//clear message after 5 seconds
            //clear form'after successfully submission
            setNewComment({
                name: '',
                email: '',
                title: '',
                contentpera: '',
                maincommnet: true,
                parent: null,
                parentName: ''// reset parent name after submission
            })
        } catch (error) {
            setMessageOk('❌ Không thể đăng bình luận')
            setTimeout(() => {
                setMessageOk('')

            }, 5000);//clear message after 5 seconds

        }
    }
    //for scroll down to comment form
    const replyFormRef = useRef(null);

    const handleRemoveReply = () => {
        setNewComment({
            ...newComment,
            parent: null,
            parentName: null,//set parent name for the reply
            maincommnet: true //set maincomment to false for replies
        })
        if (replyFormRef.current) {
            replyFormRef.current.scrollIntoView({ behavior: 'smooth' })
        }

    }

    const handleReplyClick = (targetComment) => {
        setNewComment((prev) => ({
            ...prev,
            parent: targetComment?._id ?? null,
            parentName: targetComment?.name || 'Ẩn danh',
            maincommnet: false,
        }));
        if (replyFormRef.current) {
            replyFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const updateChildrenComments = (comments, parentId, newComment) => {
        return comments.map(comment => {
            if (comment._id === parentId) {
                // add new reply to children array
                return {
                    ...comment,
                    children: [...comment.children, newComment]
                }
            } else if (comment.children && comment.children.length > 0) {
                //recursively update children commnets
                return {
                    ...comment,
                    children: updateChildrenComments(comment.children, parentId, newComment)
                }
            }
            return comment;

        })

    }

    useEffect(() => {
        let mounted = true;
        const loadSyntax = async () => {
            try {
                const [highlighterModule, themeModule] = await Promise.all([
                    import("react-syntax-highlighter"),
                    import("react-syntax-highlighter/dist/esm/styles/hljs"),
                ]);
                if (!mounted) return;
                setSyntaxHighlighter(() => highlighterModule.Prism);
                setSyntaxTheme(themeModule.a11yDark || themeModule.default || null);
            } catch (err) {
                console.error("Failed to load syntax highlighter", err);
            }
        };
        loadSyntax();
        return () => {
            mounted = false;
        };
    }, []);


    if (loading) {
        return <div className="flex flex-center wh_100"> <Spinner /></div>
    }
    if (error) {
        return <p>Error: {error}</p>
    }
    const createdAtDate = blogData?.blog?.createdAt ? new Date(blogData.blog.createdAt) : null;
    //function to format the date as'20 may 2024 14:11 pm'
    const formatDate = (date) => {
        //check if date if valid
        const d = new Date(date);
        if (!date || isNaN(d.getTime())) {
            return ''; // or handle the error as needed
        }

        /** @type {Intl.DateTimeFormatOptions} */
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true // use 12-hour format
        };

        return new Intl.DateTimeFormat('en-US', options).format(d);
    }

    const blogUrl = `http://localhost:3000/blogs/${slug}`;


    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);// reset copied state after 3 seconds
    }

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            if (typeof navigator === 'undefined' || !navigator.clipboard) return;
            navigator.clipboard.writeText(String(children));
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);// 3000 milliseconds = 3 secondsv
        }
        const SyntaxComponent = syntaxHighlighter;
        const syntaxStyle = syntaxTheme;

        if (inline) {
            return <code>{children}</code>
        } else if (match && SyntaxComponent && syntaxStyle) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxComponent
                        style={syntaxStyle}
                        language={match[1]}
                        PreTag='pre'
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}

                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxComponent>
                    <button onClick={handleCopy} style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }}>
                        {copied ? 'Copied!' : 'Copy code'}
                    </button>
                </div>
            );
        }
        return (
            <code className="md-post-code"{...props}>
                {children}
            </code>
        )
    }

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>

            <div>
                {blogData && (


                    <div className="blogslugpage">
                        <div className="container">
                            <div className="blogslugpagecont">
                                <div className="leftsitedetails">
                                    <div className="leftbloginfoimg">
                                        {/* <img src={blogData.blog.images?.[0]  || '/img/noimage.png'} alt={blogData && blogData.title} /> */}
                                        <img
                                            src={blogData.blog?.images?.[0] ?? '/img/noimage.png'}
                                            alt={blogData.blog?.title ?? ''}
                                        />

                                    </div>

                                    <div className="slugbloginfopub">
                                        <div className="flex gap-2">
                                            <div className="adminslug">
                                                <img src='/img/coder.png' alt="" />
                                                <span>By HaTruongcoder</span>
                                            </div>

                                            <div className="adminslug">
                                                <SlCalender />
                                                <span>{formatDate(createdAtDate)}</span>
                                            </div>

                                            <div className="adminslug">
                                                <CiRead />
                                                <span>Comments({blogData.comments ? blogData.comments.length : 0})</span>
                                            </div>
                                        </div>
                                        <div className="shareblogslug">
                                            {/* copy url slug */}
                                            <div title="Copy URL" onClick={() => handleCopyUrl(blogUrl)} style={{ cursor: 'pointer' }}>
                                                <BsCopy /> <span>{copied ? 'Copied!' : ''}</span>
                                            </div>

                                            {/* facebook share button */}
                                            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer" >
                                                <RiFacebookFill />
                                            </a>

                                            {/* linkedin share button */}
                                            <a target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer" >
                                                <BiLogoLinkedin />
                                            </a>
                                        </div>
                                    </div>
                                    <h1>{blogData.blog.title}</h1>
                                    {loading ? <Spinner /> : <div className="blogcontent">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                code: Code
                                            }}
                                        >
                                            {blogData.blog.description}
                                        </ReactMarkdown>
                                    </div>}


                                    <div className="blogslugtags">
                                        <div className="blogstegs">
                                            <h2>Tags:</h2>
                                            <div className="flex flex-wrap gap-1">
                                                {blogData && blogData.blog.tags.map((cat) => {
                                                    return <span key={cat}>{cat} </span>
                                                })}

                                            </div>
                                        </div>
                                    </div>


                                    <div className="blogusecomments">
                                        <h2>Comments</h2>
                                        {renderComments(blogData.comments, handleReplyClick)}
                                    </div>

                                    <div className="blogslugcomments" ref={replyFormRef}>
                                        {newComment.parentName && (
                                            <h2>Để lại phản hồi cho <span className="perentname">{newComment.parentName}</span><button onClick={handleRemoveReply} className="removereplybtn">Xóa trả lời</button></h2>
                                        )}
                                        {!newComment.parentName && (
                                            <h2>Để lại bình luận </h2>
                                        )}


                                        <p>Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *</p>
                                        <form className="leaveareplyform" onSubmit={handleCommentSubmit}>
                                            <div className="nameemailcomment">
                                                <input
                                                    type="text"
                                                    placeholder="Nhập tên của bạn"
                                                    value={newComment.name}
                                                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })} />
                                                <input
                                                    type="text"
                                                    placeholder="Nhập email"
                                                    value={newComment.email}
                                                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Nhập tiêu đề"
                                                value={newComment.title}
                                                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })} />


                                            <textarea name=""
                                                rows={4}
                                                placeholder="Nhập bình luận của bạn"
                                                id="textcomments"
                                                value={newComment.contentpera}
                                                onChange={(e) => setNewComment({ ...newComment, contentpera: e.target.value })}

                                            ></textarea>

                                            <div className="flex gap-2">
                                                <button type="submit" >Đăng Bình Luận</button>
                                                <p>{messageOk}</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="rightsitedetails">
                                    <div className="rightslugsearchbar">
                                        <input onClick={handleSearchOpen} type="text" placeholder="Tìm kiếm..." />
                                        <button><FiSearch /></button>
                                    </div>
                                    <div className="rightslugcategory">
                                        <h2>THỂ LOẠI</h2>
                                        <ul>
                                            <Link href='/blogs/category/Next Js'><li>Next Js <span>({allData.filter(ab => ab.blogcategory?.[0] === 'Next Js').length})</span></li></Link>
                                            <Link href='/blogs/category/Digital Marketing'><li>Digital Marketing <span>({allData.filter(ab => ab.blogcategory?.[0] === 'Digital Marketing').length})</span></li></Link>
                                            <Link href='/blogs/category/React Js'><li>React Js <span>({allData.filter(ab => ab.blogcategory?.[0] === 'React Js').length})</span></li></Link>
                                            <Link href='/blogs/category/Tailwind css'><li>Tailwind css <span>({allData.filter(ab => ab.blogcategory?.[0] === 'Tailwind css').length})</span></li></Link>
                                        </ul>
                                    </div>
                                    <div className="rightrecentpost">
                                        <h2>RECENT POST</h2>
                                        {allData.slice(0,3).map((blog) =>{
                                            return<Link key={blog._id} href={`/blogs/${blog.slug}`} className="rightrecentp">
                                                <img src={blog.images[0]} alt="" />
                                                <div>
                                                    <h3>{blog.title}</h3>
                                                    <h4 className="mt-1">
                                                        {blog.tags.map((cat) =>{
                                                            return <span key={cat}>{cat}</span>
                                                        })}
                                                    </h4>
                                                </div>
                                            </Link>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogPage;
function useref(arg0) {
    throw new Error("Function not implemented.");
}

