
import Blog from "@/components/Blog";
import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function DeletePhoto() {

    const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!router.isReady) return; 
        const { id } = router.query;
        if (!id) return;

        axios.get('/api/photos?id=' + id).then((response) => {
            setProductInfo(response.data);
        });
    }, [router.isReady, router.query]);


    function goBack() {
        router.push('/gallery')
    }

    async function deleteBlog() {
        await axios.delete('/api/photos?id=' + id);
        toast.success('Bài viết đã xoá thành công');
        goBack();
    }


    return <>
        <Head>
            <title>Xóa ảnh </title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Xoá <span> {productInfo?.title}</span></h2>
                    <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard />
                    <span> / </span> <span>Xoá ảnh</span>
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
                    <p className="cookieHeading">Are you sure?</p>
                    <p className="cookieDescription">Nếu bạn xóa nội dung trang web này thì nội dung của bạn sẽ bị xóa vĩnh viễn.</p>
                    <div className="buttonContainer">
                        <button onClick={deleteBlog} className="acceptButton">Xoá</button>
                        <button onClick={goBack} className="declineButton">Huỷ</button>
                    </div>
                </div>


            </div>
        </div>

    </>
}