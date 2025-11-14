import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Setting() {
    return (
        <>
            <div className="settingpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Trang cài đặt <span> Quản trị viên</span></h2>
                        <h3>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h3>
                    </div>
                    <div className="breadcrumb">
                        <IoSettingsOutline /> <span>/</span> <span>Cài đặt</span>
                    </div>
                </div>

                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        <img src="/img/coder.png" alt="coder" />
                        <div className="w-100">
                            <div className="flex flex-sb flex-left mt-2">
                                <h2>Hồ sơ của tôi</h2>
                                <h3>Ha Truong Coder <br />Web Developer</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Điện thoại: </h3>
                                <input type="text" defaultValue={'0973135577'} />
                            </div>
                            <div className="mt-2">
                                <input type="email" defaultValue={'hatruongdev@gmail.com'} />
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                                <button>Lưu</button>
                            </div>

                        </div>
                    </div>

                    <div className="rightlogoutsec">
                        <div className="topaccoutnbox">
                            <h2 className="flex flex-sb">Tài khoản của tôi<MdOutlineAccountCircle/></h2>
                            <hr />
                            <div className="flex flex-sb mt-1">
                                <h3>Tài khoản đang hoạt động <br /><span>Email</span></h3>
                                <button>Đăng xuất</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}