import React, { useState } from "react";
import Link from "next/link";
import Dataloading from "@/components/Dataloading";
import { SiBloglovin } from "react-icons/si";
import useFetchData from "@/hooks/useFetchData";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Gallery() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // fetch photo data
  const { allData, loading } = useFetchData("/api/photos");

  // total photos
  const totalPhotos = allData?.length || 0;

  // filter data by search
  const filteredPhotos =
    searchQuery.trim() === ""
      ? allData
      : allData.filter((photo) =>
          photo.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // pagination indexes
  const indexOfFirstPhoto = (currentPage - 1) * perPage;
  const indexOfLastPhoto = currentPage * perPage;

  // current page data
  const currentPhotos = Array.isArray(filteredPhotos)
    ? filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto)
    : [];

  // pagination array
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPhotos / perPage); i++) {
    pageNumbers.push(i);
  }

  // paginate function
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pageNumbers.length) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="blogpage">
      <div className="titledashboard flex flex-sb">
        <div>
          <h2>
            Tất cả hình ảnh <span> đã tải lên</span>
          </h2>
          <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
        </div>
        <div className="breadcrumb">
          <SiBloglovin />
          <span> / </span>
          <span>Hình ảnh</span>
        </div>
      </div>

      <div className="blogstable">
        {/* Search */}
        <div className="flex gap-2 mb-1">
          <h2>Tìm kiếm ảnh theo tiêu đề:</h2>
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
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
            ) : currentPhotos.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No Photos Found
                </td>
              </tr>
            ) : (
              currentPhotos.map((photo, index) => (
                <tr key={photo._id}>
                  <td>{indexOfFirstPhoto + index + 1}</td>
                  <td>
                    {photo.images?.length > 0 ? (
                      <img
                        src={photo.images[0]}
                        width={180}
                        alt={photo.title || "photo"}
                        style={{
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span>Không có hình ảnh</span>
                    )}
                  </td>
                  <td>
                    <h3>{photo.title}</h3>
                  </td>
                  <td>
                    <div className="flex gap-2 flex-center">
                      <Link href={`/gallery/edit/${photo._id}`}>
                        <button>
                          <FaEdit />
                        </button>
                      </Link>
                      <Link href={`/gallery/delete/${photo._id}`}>
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

        {/* Pagination */}
        {currentPhotos.length > 0 && (
          <div className="blogpagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>

            {pageNumbers
              .slice(
                Math.max(currentPage - 3, 0),
                Math.min(currentPage + 2, pageNumbers.length)
              )
              .map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? "active" : ""}
                >
                  {number}
                </button>
              ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            >
             Kế tiếp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}