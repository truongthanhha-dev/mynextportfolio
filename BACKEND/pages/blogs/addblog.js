
import Blog from "@/components/Blog";
import { SiBloglovin } from "react-icons/si";

export default function Addblog() {
    
    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Thêm <span> Bài viết</span></h2>
                    <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin />
                    <span> / </span> <a href="/blogs/addblog">Thêm bài viết</a>
                </div>
            </div>
            <div className="blogsadd">
                <Blog/>
            </div>
        </div>

    </>
}