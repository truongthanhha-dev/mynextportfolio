import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {

    const { allData, loading } = useFetchData('/api/projects');

    const publishedData = useMemo(() => {
        return (allData || []).filter((pro) => {
            const status = pro.status?.toLowerCase?.();
            if (!status) return true; // no status? still show it
            return status === "publish" || status === "published";
        });
    }, [allData]);

    const [filteredProject, setFilteredProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        // filter projects theo category
        if (selectedCategory === 'All') {
            setFilteredProjects(publishedData);
        } else {
            setFilteredProjects(
                publishedData.filter((pro) => {
                    if (!pro.projectcategory) return false;

                    if (Array.isArray(pro.projectcategory)) {
                        return pro.projectcategory.some(
                            (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
                        );
                    }

                    return pro.projectcategory.toLowerCase() === selectedCategory.toLowerCase();
                })

            );
        }
    }, [selectedCategory, publishedData]);

    function handleCategoryChange(category) {
        setSelectedCategory(category);
    }

    return <>
        <Head>
            <title>Project</title>
        </Head>
        <div className="projectpage">
            <div className="projects">
                <div className="container">
                    <div className="project_titles">
                        <h2>Các dự án gần đây </h2>
                        <p>Tôi thực hiện các dự án web nhằm nâng cao kỹ năng và chứng minh khả năng xây dựng sản phẩm trong môi trường thực tế.</p>
                    </div>
                    <div className="project_buttons">
                        <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => handleCategoryChange('All')}>All</button>
                        <button className={selectedCategory === 'Admin Dashboard' ? 'active' : ''} onClick={() => handleCategoryChange('Admin Dashboard')}>Website Quản lý (Admin)</button>
                        <button className={selectedCategory === 'E-commerce Website' ? 'active' : ''} onClick={() => handleCategoryChange('E-commerce Website')}>Website Thương mại điện tử</button>
                        <button className={selectedCategory === 'Portfolio Website' ? 'active' : ''} onClick={() => handleCategoryChange('Portfolio Website')}>Portfolio Website</button>
                    </div>
                    <div className="projects_cards">
                        {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
                            filteredProject.length === 0 ? (<h1> Không tìm thấy dự án nào</h1>) : (
                                filteredProject.map((pro) => (
                                    <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard">
                                        <div className="proimgbox">
                                            <img src={pro.images?.[0] || "/img/placeholder.jpg"} alt={pro.title} />
                                        </div>
                                        <div className="procontentbox">
                                            <h2>{pro.title}</h2>
                                            <GoArrowUpRight />
                                        </div>
                                    </Link>
                                ))
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>

    </>
}
