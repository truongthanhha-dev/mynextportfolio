"use client";

import Link from "next/link";
import { IoMoonSharp } from "react-icons/io5";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// @ts-ignore
import {LuSun, LuSunMoon} from"react-icons/lu";

export default function Header() {


    //darkmode on off
    const[darkMode, setDarkMode] = useState(false);

    useEffect(()=>{
        //check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode') ==='true';
        setDarkMode(isDarkMode);    
    },[])

    useEffect(() =>{
        //apply dark mode styles when darkmode state changes
        if(darkMode){
            document.body.classList.add('dark');
            // @ts-ignore
            localStorage.setItem('darkMode',true);
        }else{
            document.body.classList.remove('dark');
            // @ts-ignore
            localStorage.setItem('darkMode',false);
        }
    },[darkMode]);

    //toggle darkmode function
    const toggleDarkMode =() =>{
        setDarkMode(!darkMode); //toggle dark mode status
    }


    // navlist active
    const pathname = usePathname(); 
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setMobile(false); 
    }

    useEffect(() => {
        // update active link state when the page is reloaded
        setActiveLink(pathname);
    }, [pathname]);

    // mobile navbar
    const [mobile, setMobile] = useState(false);

    // open/close toggle
    const handleMobileOpen = () => {
        setMobile(!mobile);
    }

    const handleMobileClose = () => {
        setMobile(false);
    }

    return <>
        <header>
            <nav className="container flex flex-sb">
                <div className="logo flex gap-2">
                    <Link href='/' className="logo-mark" aria-label="HaTruongCoder">
                        <span className="logo-mark__primary">HA</span>
                        <span className="logo-mark__secondary">TRUONG</span>
                    </Link>
                </div>
                <div className="navlist flex gap-2">
                    <ul className="flex gap-2">
                        <li>
                            <Link
                                href='/'
                                className={activeLink === '/' ? 'active' : ''}
                                onClick={() => handleLinkClick('/')}
                            >
                                Trang chủ
                            </Link>
                        </li>
                      
                        <li>
                            <Link
                                href='/projects'
                                className={activeLink === '/projects' ? 'active' : ''}
                                onClick={() => handleLinkClick('/projects')}
                            >
                                Dự án
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/blogs'
                                className={activeLink === '/blogs' ? 'active' : ''}
                                onClick={() => handleLinkClick('/blogs')}
                            >
                                Bài viết
                            </Link>
                        </li>
                         <li>
                            <Link
                                href='/gallery'
                                className={activeLink === '/gallery' ? 'active' : ''}
                                onClick={() => handleLinkClick('/gallery')}
                            >
                                Bộ sưu tập
                            </Link>
                        </li>
                     
                        <li>
                            <Link
                                href='/contact'
                                className={activeLink === '/contact' ? 'active' : ''}
                                onClick={() => handleLinkClick('/contact')}
                            >
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                    <div className="darkmodetoggle" onClick={toggleDarkMode}>
                    {darkMode ? <IoMoonSharp /> : <LuSun/> }
                       
                    </div>
                    <button><Link href='/contact'>Làm việc cùng tôi!</Link></button>
                    <div className="mobiletogglesvg" onClick={handleMobileOpen}>
                        <HiMiniBars3BottomRight />
                    </div>
                </div>

               
                <div className={mobile ? 'mobilenavlist active' : 'mobilenavlist'}>
                    {/* làm mờ */}
                    <span onClick={handleMobileClose} className={mobile ? 'active' : ''}></span>
                    <div className="mobilelogo">
                        <Link href='/' className="logo-mark" aria-label="HaTruongCoder">
                            <span className="logo-mark__primary">HA</span>
                            <span className="logo-mark__secondary">TRUONG</span>
                        </Link>
                        <h2>TTHcoder</h2>
                    </div>
                    <ul className="flex gap-1 flex-col flex-left mt-3" onClick={handleMobileClose}>
                        <li>
                            <Link
                                href='/'
                                className={activeLink === '/' ? 'active' : ''}
                                onClick={() => handleLinkClick('/')}
                            >
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/blogs'
                                className={activeLink === '/blogs' ? 'active' : ''}
                                onClick={() => handleLinkClick('/blogs')}
                            >
                                Bài viết
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/gallery'
                                className={activeLink === '/gallery' ? 'active' : ''}
                                onClick={() => handleLinkClick('/gallery')}
                            >
                                Bộ sưu tập
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/services'
                                className={activeLink === '/services' ? 'active' : ''}
                                onClick={() => handleLinkClick('/services')}
                            >
                                Dịch vụ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/projects'
                                className={activeLink === '/projects' ? 'active' : ''}
                                onClick={() => handleLinkClick('/projects')}
                            >
                                Dự án
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/shop'
                                className={activeLink === '/shop' ? 'active' : ''}
                                onClick={() => handleLinkClick('/shop')}
                            >
                                Cửa hàng
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/contact'
                                className={activeLink === '/contact' ? 'active' : ''}
                                onClick={() => handleLinkClick('/contact')}
                            >
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                    <p>Bản quyền &copy; 2025 | TTHcoder.in</p>
                </div>
            </nav>
        </header>
    </>
}
