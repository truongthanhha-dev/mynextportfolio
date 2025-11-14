import React, { useState } from "react";
import Link from "next/link";
import Dataloading from "@/components/Dataloading";
import { SiBloglovin } from "react-icons/si";
import useFetchData from "@/hooks/useFetchData";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Blogs() {
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState("");

    // fetch blog data
    const { allData, loading } = useFetchData("/api/blogs");

    // total number of blogs
    const allblog = allData?.length || 0;

    // filter all data based on search query
    const filteredBlogs =
        searchQuery.trim() === ""
            ? allData
            : allData.filter((blog) =>
                blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
            );

    // calculate index of the first and last blog
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    // get current page's blogs
    const currentBlogs = Array.isArray(filteredBlogs)
        ? filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
        : [];

   
    const publishedblogs = currentBlogs.filter((ab) => {
        const status = ab.status?.toLowerCase?.() || "";
        return status === "publish" || status === "published";
    });

    
    console.log("allData:", allData);
    console.log("currentBlogs:", currentBlogs);
    console.log("publishedblogs:", publishedblogs);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>
                            Bài viết<span> đã xuất bản</span>
                        </h2>
                        <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                    </div>
                    <div className="breadcrumb">
                        <SiBloglovin />
                        <span> / </span>
                        <span>Bài viết</span>
                    </div>
                </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-1">
                        <h2>Tìm kiếm bài viết</h2>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tiêu đề..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <table className="table table-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Hình ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Chỉnh sửa / Xóa</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}>
                                        <Dataloading />
                                    </td>
                                </tr>
                            ) : publishedblogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                         Không tìm thấy bài viết nào
                                    </td>
                                </tr>
                            ) : (
                                publishedblogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td>
                                            <img src={blog.images[0]} width={180} alt="image" />
                                        </td>
                                        <td>
                                            <h3>{blog.title}</h3>
                                        </td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={`/blogs/edit/${blog._id}`}>
                                                    <button>
                                                        <FaEdit />
                                                    </button>
                                                </Link>
                                                <Link href={`/blogs/delete/${blog._id}`}>
                                                    <button>
                                                        <RiDeleteBin6Fill />
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {/* for pagination */}
                    {publishedblogs.length === 0 ? ( "") :(
                        <div className="blogpagination">
                        <button onclick={() => paginate(currentPage === 1)}>Trước</button>
                        {pageNumbers.slice(Math.max(currentPage -3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number =>(
                            <button key={number}
                            onclick={() => paginate(number)}
                            className={`${currentPage === number ? 'active' : ''}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button onclick ={() => paginate(currentPage + 1)} disabled = {currentBlogs.length < perPage}> Kế tiếp</button>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
