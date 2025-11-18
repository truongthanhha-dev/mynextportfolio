import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import { all } from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function Category() {
    const router = useRouter();
    const { category } = router.query;

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState("");

    // fetch all blogs then filter by category
    const { allData = [], loading } = useFetchData('/api/blogs');

    const normalizedCategory = (category || "").toString().toLowerCase();

    const filteredBlogs = Array.isArray(allData)
        ? allData
            .filter((item) => {
                if (!normalizedCategory) return true;
                const cats = Array.isArray(item.blogcategory) ? item.blogcategory : [];
                return cats.some(
                    (c) => c?.toString().toLowerCase() === normalizedCategory
                );
            })
            .filter((item) =>
                searchQuery.trim()
                    ? item.title?.toLowerCase().includes(searchQuery.toLowerCase())
                    : true
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    const blogcategoryData = [...filteredBlogs].reverse();

    //function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = filteredBlogs.length;//total number of blogs

    //Calculate index of the first blog displayed on the current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    //Get the current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const publishedData = currentBlogs.filter((ab) => {
        const status = ab.status?.toString()?.toLowerCase() || "";
        return status === "publish" || status === "published";
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }


    return <>
        <Head>
            <title>Trang danh mục bài viết</title>
        </Head>
        <div className="blogcategory">
            <section className="tophero">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>category <span>{category}</span></h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="latestpostssec">
                <div className="container">
                    <div className="border"></div>
                    <div className="latestpostsdata">
                        <div className="fetitle">
                            <h3>Bài viết liên quan đến Next Js :</h3>
                        </div>
                        <div className='latestposts'>
                            {loading ? <Spinner /> : <>
                                {publishedData.map((blog) => {
                                    const cover = blog.images?.[0] || "/img/noimage.png";
                                    return (
                                        <div className="lpost" key={blog._id}>
                                            <div className="lpostimg">
                                                <Link href={`/blogs/${blog.slug}`}>
                                                    <img src={cover} alt={blog.title || "Blog image"} />
                                                </Link>
                                                <div className="tegs">
                                                    {blog.blogcategory?.map((cat) => (
                                                        <Link href={`/blogs/category/${cat}`} key={cat} className='ai'><span></span>{cat}</Link>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="lpostinfo">
                                                <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                                                <p>Xin chào! Mình là sinh viên đam mê lập trình web. Mình đang học JavaScript, React và Next.js, và xây dựng các dự án thực tế để nâng cao kỹ năng và tạo ra sản phẩm hữu ích.</p>
                                                <h4 className="flex"><img src="/img/coder.png" alt="" /><span>by Ha Truong coder</span></h4>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>}
                        </div>
                    </div>
                    {publishedData.length === 0 ? ("") : (
              <div className="blogspaginationbtn flex flex-center mt-3 "> 
                <button onClick={() => paginate(currentPage === 1)}>Previous</button>
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                  <button key={number}
                    onClick={() => paginate(number)}
                    className={`${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}> Next</button>

              </div>
            )}

                </div>
            </section>

        </div>
    </>
}
