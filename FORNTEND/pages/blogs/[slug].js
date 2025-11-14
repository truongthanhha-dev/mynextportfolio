// pages/blogs/[slug].js
import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { use, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

const BlogPage = () => {
    const router = useRouter();

    const { slug } = router.query;// fetch the slug parameter from the router

    //    hook for all data fetching
    const { alldata } = useFetchData('/api/blogs');

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

    useEffect(() => {
        const fetchBlogData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/blogs/${slug}`);
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


    if(loading){
        return <div className="flex flex-center wh_100"> <Spinner/></div>
    }
    if(error){
        return <p>Error: {error}</p>
    }
    const createdAtDate = blogData && blogData.blog.createAt ? new Date(blogData && blogData.blog.createAt) : null;
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

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>

            <div>
                <div className="blogslugpage">
                    <div className="container">
                        <div className="blogslugpagecont">
                            <div className="leftsitedetails">
                                <div className="leftbloginfoimg">
                                    <img src="" alt="" />
                                </div>

                                <div className="slugbloginfopub">
                                    <div className="flex gap-2">
                                        <div className="adminslug">
                                            <img src={blogData.blog.image[0] || '/img/noimage.png'} alt="" />
                                            <span>By HaTruongcoder</span>
                                        </div>

                                        <div className="adminslug">
                                            <SlCalender />
                                            <span>chưa giải quyết</span>
                                        </div>

                                        <div className="adminslug">
                                            <CiRead />
                                            <span>Bình luận (chưa giải quyết)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default BlogPage;
