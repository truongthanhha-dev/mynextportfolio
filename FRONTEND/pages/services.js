import { Link } from "lucide-react";
import Head from "next/head";
import { IoMdCheckmark } from "react-icons/io";

export default function services() {
    return <>
        <Head>
            <title>Dịch vụ</title>
        </Head>

        <div className="servicespage">
            <div className="topservices">
                <div className="container">
                    <h2>Dịch vụ HaTruongcoder</h2>
                    <p>Trang chủ <span>&gt;</span> Dịch vụ</p>
                </div>
            </div>
            <div className="centerservices">
                <div className="container">
                    <div className="cservicesbox">
                        <div className="csservice">
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt="" />
                            </div>
                            <ul>
                                <li>Hiệu suất & Tốc độ tải trang.</li>
                                <li>Component có thể tái sử dụng.</li>
                                <li>Tương thích đa thiết bị.</li>
                                <li>Kiểm thử và đảm bảo chất lượng.</li>
                                <li>Bảo trì chất lượng, cập nhật và khắc phục lỗi.</li>
                            </ul>
                            <p>Tôi đam mê phát triển web và có khả năng xây dựng các ứng dụng với giao diện hiện đại và tối ưu.</p>
                        </div>
                        <div className="csservice">
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt="" />
                            </div>
                            <ul>
                                <li>Hiệu suất & Tốc độ tải trang.</li>
                                <li>Component có thể tái sử dụng.</li>
                                <li>Tương thích đa thiết bị.</li>
                                <li>Kiểm thử và đảm bảo chất lượng.</li>
                                <li>Bảo trì chất lượng, cập nhật và khắc phục lỗi.</li>
                            </ul>
                            <p>Tôi đam mê phát triển web và có khả năng xây dựng các ứng dụng với giao diện hiện đại và tối ưu.</p>
                        </div>
                        <div className="csservice">
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt="" />
                            </div>
                            <ul>
                                <li>Hiệu suất & Tốc độ tải trang.</li>
                                <li>Component có thể tái sử dụng.</li>
                                <li>Tương thích đa thiết bị.</li>
                                <li>Kiểm thử và đảm bảo chất lượng.</li>
                                <li>Bảo trì chất lượng, cập nhật và khắc phục lỗi.</li>
                            </ul>
                            <p>Tôi đam mê phát triển web và có khả năng xây dựng các ứng dụng với giao diện hiện đại và tối ưu.</p>
                        </div>
                        <div className="csservice">
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt="" />
                            </div>
                            <ul>
                                <li>Hiệu suất & Tốc độ tải trang.</li>
                                <li>Component có thể tái sử dụng.</li>
                                <li>Tương thích đa thiết bị.</li>
                                <li>Kiểm thử và đảm bảo chất lượng.</li>
                                <li>Bảo trì chất lượng, cập nhật và khắc phục lỗi.</li>
                            </ul>
                            <p>Tôi đam mê phát triển web và có khả năng xây dựng các ứng dụng với giao diện hiện đại và tối ưu.</p>
                        </div>
                        <div className="csservice">
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt="" />
                            </div>
                            <ul>
                                <li>Hiệu suất & Tốc độ tải trang.</li>
                                <li>Component có thể tái sử dụng.</li>
                                <li>Tương thích đa thiết bị.</li>
                                <li>Kiểm thử và đảm bảo chất lượng.</li>
                                <li>Bảo trì chất lượng, cập nhật và khắc phục lỗi.</li>
                            </ul>
                            <p>Tôi đam mê phát triển web và có khả năng xây dựng các ứng dụng với giao diện hiện đại và tối ưu.</p>
                        </div>
                        <div className="csservice">
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt="" />
                            </div>
                            <ul>
                                <li>Hiệu suất & Tốc độ tải trang.</li>
                                <li>Component có thể tái sử dụng.</li>
                                <li>Tương thích đa thiết bị.</li>
                                <li>Kiểm thử và đảm bảo chất lượng.</li>
                                <li>Bảo trì chất lượng, cập nhật và khắc phục lỗi.</li>
                            </ul>
                            <p>Tôi đam mê phát triển web và có khả năng xây dựng các ứng dụng với giao diện hiện đại và tối ưu.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pricingplansec">
                <div className="container">
                    <div className="pricingtitles text-center">
                        <h3><img src="/img/chevron_right.png" alt="" />PRICING PLAN </h3>
                        <h2>Pricing My Work</h2>
                    </div>

                    <div className="pricingcards">
                        <div className="pricingcard">
                            <h4>Life Plan</h4>
                            <p>Perfect Choice for individual</p>
                            <h2>$29.00 <span>Monthly</span></h2>
                            <Link href='/contact'> <button>Get Start Now</button></Link>
                            <div>
                                <h5>Lite includes</h5>
                                <ul>
                                    <li><IoMdCheckmark /> Powerful admin panel</li>
                                    <li><IoMdCheckmark /> 1 Native android app</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </>
}