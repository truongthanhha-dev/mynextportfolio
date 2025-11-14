import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function DeleteProject() {
  const router = useRouter();
  const { id } = router.query;
  const [projectInfo, setProjectInfo] = useState(null);

  
  useEffect(() => {
    if (!router.isReady || !id) return;

    axios
      .get(`/api/projects?id=${id}`)
      .then((res) => {
        setProjectInfo(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu:", err);
        toast.error("Không thể tải dữ liệu dự án");
      });
  }, [router.isReady, id]);

 
  async function deleteProject() {
    if (!id) return toast.error("Thiếu ID dự án");

    try {
      await axios.delete(`/api/projects?id=${id}`);
      toast.success("Đã xoá dự án thành công!");
      router.push("/projects");
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
      toast.error("Xoá dự án thất bại!");
    }
  }


  function goBack() {
    router.push("/projects");
  }

  return (
    <>
      <Head>
        <title>Xóa dự án</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Xóa bỏ <span> {projectInfo?.title || "Project"}</span>
            </h2>
            <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard />
            <span> / </span> <span>Xoá Dự án</span>
          </div>
        </div>

        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <svg
              viewBox="0 0 24 24"
              fill="red"
              height="6em"
              width="6em"
            >
              <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2zM6 9v10h8V9H6zm9-4h-3l-1-1H8L7 5H4v2h14V5z" />
            </svg>
            <p className="cookieHeading">Bạn có chắc không?</p>
            <p className="cookieDescription">
             Nếu bạn xóa dự án này, nó sẽ bị xóa vĩnh viễn.
            </p>
            <div className="buttonContainer">
              <button onClick={deleteProject} className="acceptButton">
                Xoá
              </button>
              <button onClick={goBack} className="declineButton">
               Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
