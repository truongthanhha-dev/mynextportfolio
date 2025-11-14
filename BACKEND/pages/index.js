import Head from "next/head";
import { Bar } from "react-chartjs-2";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import LoginLayout from "@/components/LoginLayout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Bài viết tạo hàng tháng theo năm" },
    },
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resBlogs, resProjects, resShops, resPhotos] = await Promise.allSettled([
          fetch("/api/blogs"),
          fetch("/api/projects"),
          fetch("/api/shops"),
          fetch("/api/photos"),
        ]);

        const safeJson = async (res) => {
          try {
            return res && res.ok ? await res.json() : [];
          } catch {
            return [];
          }
        };

        const dataBlogs =
          resBlogs.status === "fulfilled" ? await safeJson(resBlogs.value) : [];
        const dataProjects =
          resProjects.status === "fulfilled" ? await safeJson(resProjects.value) : [];
        const dataShops =
          resShops.status === "fulfilled" ? await safeJson(resShops.value) : [];
        const dataPhotos =
          resPhotos.status === "fulfilled" ? await safeJson(resPhotos.value) : [];

        console.log("Blogs data fetched:", dataBlogs);
        console.log("Projects data fetched:", dataProjects);
        console.log("Shops data fetched:", dataShops);
        console.log("Photos data fetched:", dataPhotos);

        setBlogsData(dataBlogs);
        setProjectData(dataProjects);
        setShopData(dataShops);
        setPhotosData(dataPhotos);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const monthlyData = blogsData
    .filter((b) => b.status === "publish" || b.status === "published")
    .reduce((acc, blog) => {
      const date = new Date(blog.createdAt);
      if (isNaN(date)) {
        console.warn("Trường createdAt của bài viết không hợp lệ", blog);
        return acc;
      }
      const year = date.getFullYear();
      const month = date.getMonth(); // 0–11
      if (!acc[year]) acc[year] = Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const years = Object.keys(monthlyData);
 const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const datasets = years.map((year) => ({
    label: year,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`,
  }));
  const data = { labels, datasets };

  // ✅ Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Đang tải dữ liệu...</h3>
      </div>
    );
  }


    if (datasets.length === 0 || datasets.every((d) => d.data.every((v) => v === 0))) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h3>Không có dữ liệu blog hợp lệ để hiển thị biểu đồ!</h3>
          <p>
            Kiểm tra lại API <code>/api/blogs</code> xem có trường{" "}
            <code>createdAt</code> và <code>status: "publish"</code> hoặc{" "}
            <code>"published"</code> không.
          </p>
        </div>
      );
    }

  //  Dashboard
  return (
    <LoginLayout>
      <Head>
        <title>Phần máy chủ của Portfolio</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="dashboard">
        {/* ====== Header ====== */}
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Trung tâm<span> điều khiển</span>
            </h2>
            <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
          </div>

          <div className="breadcrumb">
            <IoHome /> <span>/</span> <span>Bảng điều khiển</span>
          </div>
        </div>

        {/* ====== 4 Thẻ thống kê ====== */}
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Tổng số bài viết</h2>
            <span>
              {blogsData.filter(
                (d) => d.status === "publish" || d.status === "published"
              ).length}
            </span>
          </div>
          <div className="four_card">
            <h2>Tổng số dự án</h2>
            <span>{projectData.length}</span>
          </div>
          <div className="four_card">
            <h2>Tổng sản phẩm</h2>
            <span>{shopData.length}</span>
          </div>
          <div className="four_card">
            <h2>Thư viện ảnh</h2>
            <span>{photosData.length}</span>
          </div>
        </div>

        {/* ====== Biểu đồ + Category ====== */}
        <div className="year_overview_row flex flex-sb" style={{ gap: "20px" }}>
          {/* ====== Biểu đồ ====== */}
          <div className="leftyearoverview" style={{ flex: 2 }}>
            <div className="flex flex-sb">
              <h3>Tổng quan hoạt động trong năm</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">
                {
                  blogsData.filter(
                    (d) => d.status === "publish" || d.status === "published"
                  ).length
                }{" "}
                / 365 <br />
                <span>Tổng bài viết đã xuất bản</span>
              </h3>
            </div>
            <Bar data={data} options={options} />
          </div>

          {/* ====== Bảng Category ====== */}
          <div className="right_salescont" style={{ flex: 1 }}>
            <div>
              <h3>Bài viết theo danh mục</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>

            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Chủ đề</td>
                    <td>Dữ liệu</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Next Js</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) =>
                            dat.blogcategory?.[0]?.toLowerCase() ===
                            "next js".toLowerCase()
                        ).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Css</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) =>
                            dat.blogcategory?.[0]?.toLowerCase() ===
                            "css".toLowerCase()
                        ).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Node Js</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) =>
                            dat.blogcategory?.[0]?.toLowerCase() ===
                            "node js".toLowerCase()
                        ).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Flutter Dev</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) =>
                            dat.blogcategory?.[0]?.toLowerCase() ===
                            "flutter dev".toLowerCase()
                        ).length
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
