import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
    return <>
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <div className="logo">
                    <img src="/img/logo.png" alt="" />
                </div>
                <div className="ul flex gap-2">
                    <li><Link href='/services'>Dịch vụ</Link></li>
                    <li><Link href='/services'>Dự án</Link></li>
                    <li><Link href='/services'>Hồ sơ</Link></li>
                    <li><Link href='/services'>Kỹ năng</Link></li>
                    <li><Link href='/services'>Đánh giá</Link></li>
                    <li><Link href='/contact'>Liên hệ</Link></li>
                </div>

                <ul className="hero_social">
                    <li><a href="/" target="_blank"><FaTwitter/></a></li>
                    <li><a href="/" target="_blank"><LiaBasketballBallSolid/></a></li>
                    <li><a href="/" target="_blank"><GrLinkedinOption/></a></li>
                    <li><a href="/" target="_blank"><FaGithub/></a></li>
                </ul>
                <div className="copyrights">&copy; hatruongdev@gmail.com  <span> <p></p> TTHcoder.in</span></div>
            </div>
        </footer>
    </>
}