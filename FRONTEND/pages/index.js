import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GrLinkedinOption } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";
import { FaCalendarDays } from "react-icons/fa6";


export default function Home() {

  // active service background color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // set the first item as active when mouse leaves
  };

  // services data
  const services = [
    {
      title: "Phát triển Web",
      description: "Tôi có kỹ năng vững vàng trong lĩnh vực phát triển web, mang đến các dịch vụ đáng tin cậy giúp tạo ra những kết quả ấn tượng mà doanh nghiệp của bạn cần."
    },

    {
      title: "Nhà phát triển đam mê học hỏi",
      description: "Là sinh viên ngành Công nghệ Thông tin, tôi không ngừng tìm tòi và thử nghiệm các công nghệ mới. Tôi yêu thích việc biến những dòng code thành sản phẩm hữu ích, mang lại trải nghiệm mượt mà và hiện đại cho người dùng."
    },

    {
      title: "Tư duy Giải quyết Vấn đề",
      description: "Tôi thích đối mặt với những thử thách trong lập trình và tìm ra cách giải quyết hiệu quả. Việc debug, tối ưu mã nguồn và phân tích logic giúp tôi rèn luyện tư duy và phát triển kỹ năng mỗi ngày."
    },
    {
      title: "Làm việc Nhóm & Học hỏi Lẫn nhau",
      description: "Tôi tin rằng lập trình không chỉ là viết code mà còn là cùng nhau học hỏi. Tôi thích làm việc nhóm, chia sẻ kinh nghiệm và học thêm từ những người có cùng đam mê công nghệ."
    }




  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [filteredProject, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allwork, setAllwork] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const [projectResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs'),
        ])
        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();

        setAlldata(projectData);
        setAllwork(blogsData);
      } catch (error) {
        console.error('Error Fetching Data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // filter projects theo category
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata);
    } else {
      setFilteredProjects(
        alldata.filter((pro) => {
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
  }, [selectedCategory, alldata]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  const recentBlogs = Array.isArray(allwork) ? allwork.slice(0, 3) : [];

  return (
    <>
      <Head>
        <title>HaTruongcoder - Portfolio cá nhân</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section id="home" className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' textAnchor='middle' className="animate-stroke">HI</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos='fade-right'>I am HaTruongCoder</span>
              <h1 className="hero_title" data-aos='fade-right'>Web Developer <br /> </h1>
              <div className="hero_img_box heroimgbox" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                <img src="/img/me.jpg" alt="coder" />
              </div>
              <div className="lead" data-aos='fade-up'>
                Tôi tạo ra những sản phẩm web đơn giản, trực quan và hữu ích, đồng thời không ngừng trau dồi kỹ năng qua từng dự án.
              </div>
              <div className="hero_btn_box" data-aos='fade-up'>
                <Link
                  href='/img/resume.pdf'
                  download='resume.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='download_cv'
                >
                  Tải CV<BiDownload />
                </Link>
                <ul className="hero_social">
                  {/* <li><a href="/"><FaTwitter /></a></li> */}
                  {/* <li><a href="/"><LiaBasketballBallSolid /></a></li> */}
                  {/* <li><a href="/"><GrLinkedinOption /></a></li> */}
                  <li><a href="https://github.com/truongthanhha-dev"><FaGithub /></a></li>
                </ul>
              </div>
            </div>

            {/* rightside image section */}
            <div className="heroimageright">
              <div className="hero_img_box" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000' >
                <img src="/img/me.png" alt="" />
              </div>
            </div>

          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>4+</h3>
              <h4>Chinh phục <br /> Code</h4>
            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3>2+</h3>
              <h4>Projects nextjs<br /> Hoàn thành</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>∞</h3>
              <h4>Ý tưởng<br /> & Đam mê</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>21+</h3>
              <h4>Luôn sẵn sàng<br /> học hỏi</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="skills" className="services">
        <div className="container">
          <div className="services_titles">
            <h2>Kỹ Năng & Thế Mạnh Của Tôi</h2>
            <p>Tôi biến ý tưởng thành những dự án web sáng tạo và đơn giản, thể hiện niềm đam mê của tôi với lập trình.</p>
          </div>
          <div className="services_menu">
            {services.map((service, index) => (
              <div key={index} className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2>Các Dự Án Gần Đây Của Tôi</h2>
            <p>Đây là những dự án tôi đã làm để học hỏi, khám phá và biến ý tưởng của mình thành hiện thực.</p>

          </div>
          <div className="project_buttons">
            <button
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => handleCategoryChange('All')}
            >
              All
            </button>


            <button
              className={selectedCategory === 'Admin Dashboard' ? 'active' : ''}
              onClick={() => handleCategoryChange('Admin Dashboard')}
            >
              Website Admin
            </button>

            <button
              className={selectedCategory === 'E-commerce Website' ? 'active' : ''}
              onClick={() => handleCategoryChange('E-commerce Website')}
            >
              E-commerce Website
            </button>

            <button
              className={selectedCategory === 'Portfolio Website' ? 'active' : ''}
              onClick={() => handleCategoryChange('Portfolio Website')}
            >
              Portfolio Website
            </button>

            
          </div>


          <div className="projects_cards">
            {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
              filteredProject.length === 0 ? (<h1>Không tìm thấy dự án nào</h1>) : (
                filteredProject.slice(0, 4).map((pro) => {
                  const projectHref = pro?.slug ? `/projects/${pro.slug}` : '/projects';
                  return (
                    <Link href={projectHref} key={pro._id} className="procard">
                      <div className="proimgbox">
                        <img src={pro.images?.[0] || "/img/placeholder.jpg"} alt={pro.title} />
                      </div>
                      <div className="procontentbox">
                        <h2>{pro.title}</h2>
                        <GoArrowUpRight />
                      </div>
                    </Link>
                  )
                })
              )
            )}
          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">

          <div className="experience">
            <div className="experience_title flex gap-1">
              <LuMedal />
              <h2>Trải nghiệm của tôi </h2>
            </div>
            <div className="exper_cards">



              <div className="exper_card">
                <span>2022 - 2024</span>
                <h3>Thành viên CLB Công Nghệ / IT Club</h3>
                <p>Tham gia các buổi workshop, coding challenge và hỗ trợ các sự kiện học thuật liên quan đến lập trình và công nghệ.</p>
              </div>

              <div className="exper_card">
                <span>2023 - 2024</span>
                <h3>Web Development Tutor</h3>
                <p>Hỗ trợ bạn bè và sinh viên khóa dưới trong các môn học lập trình web, bao gồm HTML, CSS, JavaScript và React.</p>
              </div>

              <div className="exper_card">
                <span>2024 - 2025</span>
                <h3>Personal Project Developer</h3>
                <p>Tự xây dựng và triển khai các dự án web thực tế sử dụng React, Next.js và MongoDB nhằm rèn luyện kỹ năng lập trình và quản lý sản phẩm.</p>
              </div>

            </div>
          </div>

          <div className="education">
            <div className="experience_title flex gap-1">
              <PiGraduationCap />
              <h2> Nơi Tôi Bắt Đầu – Học Vấn</h2>
            </div>

            <div className="exper_cards">

              <div className="exper_card">
                <span>2022 - Present</span>
                <h3>Student Developer</h3>
                <p>Đại học Ngoại ngữ - Tin học TP.HCM </p>
              </div>
              <div className="exper_card">
                <span>2022 - 2025</span>
                <h3>Thành tích học tập</h3>
                <p>Luôn duy trì kết quả học tập ổn định, hoàn thành tốt các môn lập trình và công nghệ phần mềm.</p>
              </div>
              <div className="exper_card">
                <span>2023-2025</span>
                <h3>Front-end Certificate</h3>
                <p>Hoàn thành khóa học Front-end (HTML, CSS, JavaScript, React) tại nền tảng học trực tuyến.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2>Kỹ năng của tôi</h2>
            <p>Những kỹ năng dưới đây là nền tảng mà tôi đã xây dựng trong quá trình học và phát triển dự án, giúp tôi tự tin hơn trên con đường trở thành lập trình viên chuyên nghiệp.</p>
          </div>

          <div className="myskils_cards">

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/html.png" alt="HTML" />
                <h3>HTML</h3>
              </div>

            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/css.png" alt="CSS" />
                <h3>CSS</h3>
              </div>

            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/tailwindcss.png" alt="tailwindcss" />
                <h3>Tailwind</h3>
              </div>

            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="mongodb" />
                <h3>Mongodb</h3>
              </div>

            </div>


            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="react" />
                <h3>React</h3>
              </div>

            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/js.svg" alt="js" />
                <h3>JavaScript</h3>
              </div>

            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/figma.png" alt="Figma" />
                <h3>Figma</h3>
              </div>

            </div>
          </div>



        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Bài viết mới nhất</h2>
            <p>Mình ghi lại quá trình học lập trình, những điều mới học được và các chia sẻ nhỏ hy vọng giúp ích cho người khác.</p>
          </div>

          <div className="recent_blogs">

            {recentBlogs.map((blog) => {
              return (
                <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog">
                  <div className="re_blogimg">
                    <img src={blog.images?.[0] || '/img/noimage.png'} alt={blog.title} />
                    <span>{blog.blogcategory?.[0]}</span>
                  </div>
                  <div className="re_bloginfo">
                    <div className="re_topdate flex gap-1">
                      <div className="res_date">
                        <FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
                      </div>
                    </div>
                    <h2>{blog.title}</h2>
                  </div>
                </Link>
              )
            })}

          </div>
        </div>

      </section>
    </>
  );
}
