import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import Photo from "@/components/photo";

export default function EditPhoto() {
  const router = useRouter(); 
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!router.isReady) return; 

    if (!id) return;

    axios.get("/api/photos?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [router.isReady, id]);

  return (
    <>
      <Head>
        <title>Cập nhật ảnh</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Chỉnh sửa <span> {productInfo?.title}</span>
            </h2>
            <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard />
            <span> / </span> <span>Chỉnh sửa ảnh</span>
          </div>
        </div>

        <div className="mt-3">
          {productInfo && <Photo {...productInfo} />}
        </div>
      </div>
    </>
  );
}