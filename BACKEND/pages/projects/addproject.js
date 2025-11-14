import Project from "@/components/Project";
import { SiBloglovin } from "react-icons/si";


export default function Addproject() {


    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Thêm <span> Dự án</span></h2>
                    <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin/>
                    <span> / </span> <a href="/blogs/addproject">Thêm Dự án</a>
                </div>
            </div>
            <div className="blogsadd">
                <Project/>
            </div>
        </div>

    </>
}