import Project from "@/components/Project";
import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";

export default function EditProject() {

    const router = useRouter();

    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!router.isReady) return; 
        const { id } = router.query;
        if (!id) return;

        axios.get('/api/projects?id=' + id).then((response) => {
            setProductInfo(response.data);
        });
    }, [router.isReady, router.query]);


    return <>
        <Head>
            <title>Cập nhật Bài viết</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Chỉnh sửa <span> {productInfo?.title}</span></h2>
                    <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard />
                    <span> / </span> <span>Chỉnh sửa dự án</span>
                </div>
            </div>
            <div className="mt-3">
                {
                    productInfo && (
                        <Project {...productInfo} />
                    )
                }

            </div>
        </div>
    </>
}