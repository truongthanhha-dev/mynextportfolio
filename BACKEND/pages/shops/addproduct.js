import Shop from "@/components/Shop";

import { SiBloglovin } from "react-icons/si";

export default function Addproduct() {

   return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Thêm<span> Sản phẩm</span></h2>
                    <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin/>
                    <span> / </span> <a href="/shops/addproduct">Thêm sản phẩm</a>
                </div>
            </div>
            <div className="blogsadd">
                <Shop/>
            </div>
        </div>

    </>
}