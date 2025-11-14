import Photo from "@/components/photo";
import { SiBloglovin } from "react-icons/si";


export default function addphoto() {

    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Thêm <span> Hình ảnh</span></h2>
                    <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin/>
                    <span> / </span> <a href="/blogs/addproject">Thêm ảnh</a>
                </div>
            </div>
            <div className="blogsadd">
                <Photo/>
            </div>
        </div>

    </>
}