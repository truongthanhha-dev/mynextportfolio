import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Spinner from "@/components/Spinner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

export default function projectslug() {

    const router = useRouter();

    const { slug } = router.query;

    // Only call API when slug is available and hit the correct endpoint
    const apiEndpoint = slug ? `/api/projects?slug=${slug}` : null;
    const { allData, loading } = useFetchData(apiEndpoint);

    const project = allData?.[0] || null;
    const images = project?.images || [];
    const createdAtDate = project?.createdAt || project?.createAt || null;
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [images?.length]);

    //function to format the date as'20 may 2024 14:11 pm'
    const formatDate = (date) => {
        //check if date if valid
        const d = new Date(date);
        if (!date || isNaN(d.getTime())) {
            return ''; // or handle the error as needed
        }

        /** @type {Intl.DateTimeFormatOptions} */
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true // use 12-hour format
        };

        return new Intl.DateTimeFormat('en-US', options).format(d);
    }

    const Code = ({ inline, className, children, ...props }) => {
        const [copied, setCopied] = useState(false);

        if (inline) {
            return <code {...props}>{children}</code>;
        }

        const handleCopy = () => {
            if (typeof navigator === "undefined" || !navigator.clipboard) return;
            navigator.clipboard.writeText(String(children));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <div className="code-block">
                <pre {...props} className={className}>
                    <code>{String(children).replace(/\n$/, "")}</code>
                </pre>
                <button type="button" className="copy-code-btn" onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy code"}
                </button>
            </div>
        );
    };

    if (loading || !slug) {
        return <div className="flex flex-center wh_100"> <Spinner /></div>
    }

    if (!project) {
        return <div className="flex flex-center wh_100"> <p>Không tìm thấy dự án</p></div>
    }

    return <>
        <Head>
            <title>{slug}</title>
        </Head>

        <div className="projectslug">
            <div className="projectslugimg">
                <div className="container">
                    <div className="proslugimg">
                        <img src={images?.[activeImageIndex] || "/img/placeholder.jpg"} alt={project?.title || ""} />
                    </div>

                    <div className="projectsluginfo">
                        <div className="leftmainproinfo">
                            <h1>{project?.projectcategory}</h1>
                            <p>
                                Tôi là sinh viên yêu thích lập trình web, hiện đang tập trung vào React, Next.js
                                và xây dựng các dự án thực tế để rèn luyện kỹ năng. Tôi luôn cố gắng viết code
                                rõ ràng, dễ bảo trì và mang lại trải nghiệm tốt cho người dùng.
                            </p>
                            <a target="_blank" href={project?.livepreview}>Xem demo</a>
                        </div>
                        <div className="rightmainproinfo">
                            <div>
                                <h3>Category</h3>
                                <h2>{project?.projectcategory}</h2>
                            </div>

                            <div>
                                <h3>Client</h3>
                                <h2>{project?.Client}</h2>
                            </div>

                            <div>
                                <h3>Start Date</h3>
                                <h2>{formatDate(createdAtDate)}</h2>
                            </div>

                            <div>
                                <h3>Designer</h3>
                                <h2>HaTruong Coder</h2>
                            </div>
                        </div>
                    </div>

                    <div className="projectslugsliderimg">
                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={20}
                            freeMode={true}
                            grabCursor={true}
                            modules={[FreeMode]}
                            className="mySwiper"
                        >
                            {(images || []).map((image, index) => (
                                <SwiperSlide key={index}>
                                    <button
                                        type="button"
                                        className={`projectthumb ${index === activeImageIndex ? 'active' : ''}`}
                                        onClick={() => setActiveImageIndex(index)}
                                    >
                                        <img src={image} alt="project preview" />
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>



                </div>
            </div>

            <div className="projectslugdescription">
                <div className="container">
                    <div className="psdescri">
                        <h2>Mô tả dự án</h2>
                        <div className="blogcontent">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code: Code,
                                }}
                            >
                                {project?.description || ""}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </>
}
