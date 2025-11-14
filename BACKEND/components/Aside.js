import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { GrGallery } from "react-icons/gr";
import { TiContacts } from "react-icons/ti";
import { MdOutlineSettings } from "react-icons/md";
import { set } from "mongoose";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import LoginLayout from "./LoginLayout";
import { useSession, signOut } from "next-auth/react"


export default function Aside({ asideOpen, handleAsideOpen }) {
        const router = useRouter();
        const [click, setClick] = useState(false);
        const [activeLink, setActiveLink] = useState('/');
        const handleClick = () => {
                setClicked(!clicked);
        }
        const handleLinkClick = (link) => {
                setActiveLink(preActive => (preActive === link ? null : link));
                setClick(false);
        }
        useEffect(() => {
                //update active link state when the page is reloaded
                setActiveLink(router.pathname);
        }, [router.pathname])

        const { data: session } = useSession();
        if (session) {
                return <>
                        <LoginLayout>
                                <aside className={asideOpen ? "asideleft active" : 'asideleft'}>
                                        <ul>
                                                <Link href="/">
                                                        <li className="navative">
                                                                <IoHome size={24} />
                                                                <span>Bảng điều khiển</span>
                                                        </li>
                                                </Link>

                                                {/* li.navactive.flex-col.flex-left */}
                                                <li className={activeLink === '/blog' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/blogs')}>
                                                        <div className="flex gap-1">
                                                                <BsPostcard size={24} />
                                                                <span>Bài viết</span>
                                                        </div>
                                                        {activeLink === '/blogs' && (
                                                                <ul>
                                                                        <Link href='/blogs'><li>Kho bài viết</li> </Link>
                                                                        <Link href='/blogs/draft'><li>Bài viết nháp</li> </Link>
                                                                        <Link href='/blogs/addblog'><li>Tạo bài viết mới</li> </Link>
                                                                </ul>
                                                        )}

                                                </li>

                                                <li className={activeLink === '/projects' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/projects')}>
                                                        <div className="flex gap-1">
                                                                <MdWorkOutline size={24} />
                                                                <span>Dự án</span>
                                                        </div>
                                                        {activeLink === '/projects' && (
                                                                <ul>
                                                                        <Link href='/projects'><li>Tất cả dự án</li> </Link>
                                                                        <Link href='/projects/draftprojects'><li>Dự án nháp</li> </Link>
                                                                        <Link href='/projects/addproject'><li>Thêm dự án</li> </Link>
                                                                </ul>
                                                        )}

                                                </li>

                                                <li className={activeLink === '/shops' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/shops')}>
                                                        <div className="flex gap-1">
                                                                <TiShoppingCart size={26} />
                                                                <span>Cửa hàng</span>
                                                        </div>
                                                        {activeLink === '/shops' && (
                                                                <ul>
                                                                        <Link href='/shops'><li>Tất cả sản phẩm</li> </Link>
                                                                        <Link href='/shops/draftshop'><li>Sản phẩm nháp</li> </Link>
                                                                        <Link href='/shops/addproduct'><li>Thêm sản phẩm</li> </Link>
                                                                </ul>
                                                        )}

                                                </li>

                                                <li className={activeLink === '/gallery' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/gallery')}>
                                                        <div className="flex gap-1">
                                                                <GrGallery size={24} />
                                                                <span>Thư viện ảnh</span>
                                                        </div>
                                                        {activeLink === '/gallery' && (
                                                                <ul>
                                                                        <Link href='/gallery'><li>Tất cả ảnh</li> </Link>
                                                                        <Link href='/gallery/addphoto'><li>Thêm ảnh</li> </Link>
                                                                </ul>
                                                        )}

                                                </li>

                                                <Link href="/contacts">
                                                        <li className={activeLink === '/contacts' ? 'navactive' : ''} onClick={() => handleLinkClick('/contacts')}>
                                                                <TiContacts size={26} />
                                                                <span>Liên hệ</span>
                                                        </li>
                                                </Link>

                                                <Link href="/setting">
                                                        <li className={activeLink === '/setting' ? 'navactive' : ''} onClick={() => handleLinkClick('/setting')}>
                                                                <MdOutlineSettings size={24} />
                                                                <span>Cài đặt</span>
                                                        </li>
                                                </Link>
                                        </ul>

                                        <button onClick={() => signOut()} className="logoutbtn">Đăng xuất</button>
                                </aside>
                        </LoginLayout>

                </>
        }


}