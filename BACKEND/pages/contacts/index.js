import React, { useState } from "react";
import Link from "next/link";
import Dataloading from "@/components/Dataloading";
import { SiBloglovin } from "react-icons/si";
import useFetchData from "@/hooks/useFetchData";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function contacts() {

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState("");

    // fetch blog data
    const { allData, loading } = useFetchData("/api/contacts");

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

    
    const publishedblogs = currentBlogs;

   
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
                            Tất cả  <span> Liên hệ </span>
                        </h2>
                        <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                    </div>
                    <div className="breadcrumb">
                        <SiBloglovin />
                        <span> / </span>
                        <span>Liên hệ</span>
                    </div>
                </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-1">
                        <h2>Tìm kiếm danh bạ theo tên:</h2>
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
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Dự án</th>
                                <th>Mở </th>
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
                                    <td colSpan={6} className="text-center">
                                       Không tìm thấy liên lạc
                                    </td>
                                </tr>
                            ) : (
                                publishedblogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><h3>{blog.name}</h3></td>
                                        <td><h3>{blog.email}</h3></td>
                                        <td><h3>{blog.phone}</h3></td>
                                        <td><h3>{blog.project[0]}</h3></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={`/contacts/view/${blog._id}`}>
                                                    <button>
                                                        <FaEye />
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
                    {publishedblogs.length === 0 ? ("") : (
                        <div className="blogpagination">
                            <button onclick={() => paginate(currentPage === 1)}>Trước</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button key={number}
                                    onclick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onclick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}> Kế tiếp</button>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}