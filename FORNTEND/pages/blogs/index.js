import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import Link from 'next/link'; 
import Spinner from '@/components/Spinner'; 
import Blogsearch from '@/components/Blogsearch';
export default function Blogs() { 

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // fetch blog data
  const { allData, loading } = useFetchData("/api/blogs");

   const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = () => {
        setSearchInput(!searchInput);
    }

    const handleSearchClose = () => {
        setSearchInput(false);
    }

  // total number of blogs
  const allblog = allData?.length || 0;

  // filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? allData
      : allData.filter((blog) =>
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // calculate index of the first and last blog
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  // get current page's blogs
  const currentBlogs = Array.isArray(filteredBlogs)
    ? filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
    : [];


  const publishedBlogs = currentBlogs.filter((ab) => {
    const status = ab.status?.toLowerCase?.() || "";
    return status === "publish" || status === "published";
  });


  const sliderpubdata = Array.isArray(allData)
    ? allData.filter((ab) => {
      const status = ab.status?.toString()?.toLowerCase() || "";
      return status === "publish" || status === "published";
    })
    : [];



  // debug
  console.log("allData:", allData);
  console.log("currentBlogs:", currentBlogs);
  console.log("publishedBlogs:", publishedBlogs);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  function paginate(arg0) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Head>
        <title>Bài viết</title>
      </Head>

      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  Chào mừng đến với <span>HaTruong Blogs!</span>
                </h1>
                <p>
                  Mình là sinh viên yêu thích công nghệ và lập trình web, mình đang trau dồi kỹ năng về JavaScript, React và Next.js để xây dựng các dự án thực tế.
                </p>
                <div className="subemail">
                  <form className="flex">           
                    <input
                    onClick={handleSearchOpen}
                      placeholder="Tìm kiếm bài viết ở đây..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="button">Tìm kiếm</button>
                  </form>
                </div>
              </div>
            </div>

            <div className="featured">
              <div className="container">
                <div className="border">
                  <div className="featuredposts">
                    <div className="fetitle flex">
                      <h3>Bài viết nổi bật:</h3>
                    </div>
                    <div className="feposts flex">
                      <Swiper
                        slidesPerView={"auto"}
                        freeMode={true}
                        spaceBetween={30}
                        className="mySwiper"
                        modules={[FreeMode]}
                      >
                        {loading ? (
                          <Spinner />
                        ) : (
                          <>
                            {sliderpubdata.slice(0, 6).map((blog) => (
                              <SwiperSlide key={blog._id}>
                                <div className="fpost">
                                  <Link href={`/blogs/${blog.slug}`}>
                                    <img
                                      src={blog.images?.[0] || "/img/placeholder.jpg"} 
                                      alt={blog.title}
                                    />
                                  </Link>
                                  <div className="fpostinfo">
                                    <div className="tegs flex">
                                      {blog.blogcategory.map((cat) => {
                                        return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                      })}
                                    </div>
                                    <h2><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h2>
                                    <div className="fpostby flex">
                                      <img src="/img/coder.png" alt="" />
                                      <p>By HaTruong coder</p>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </>
                        )}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className='populartegssec'>
          <div className="container">
            <div className="border"></div>
            <div className="populartegsdata">
              <div className="fetitle">
                <h3>Chủ đề phổ biến</h3>
              </div>
              <div className="poputegs">
                <Link href='/blog/category/Next Js' className='pteg'>
                  <img src="https://logo.svgcdn.com/devicon/nextjs-original.png" alt="" />
                  <div className="tegs">
                    <div className="apps"><span></span>Next Js</div>
                  </div>
                </Link>

                <Link href='/blog/category/React Js' className='pteg'>
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FeNAsjO55tPbgaor7ma%2Fsource.gif&f=1&nofb=1&ipt=1b6c2d1f4493f3ac96918899cd5c25eeec185ba33f30d800552d9b6a6655a8c7&ipo=images" alt="" />
                  <div className="tegs">
                    <div className="apps"><span></span>React Js</div>
                  </div>
                </Link>

                <Link href='/blog/category/Tailwind CSS' className='pteg'>
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd6f6d0kpz0gyr.cloudfront.net%2Fuploads%2Fimages%2F_1200x630_crop_center-center_82_none%2Ftailwind-thumb.jpg%3Fmtime%3D1609771799&f=1&nofb=1&ipt=7905bdb27cec8eef124c91d0809bea12a463ac5d375240e052349785be22fbb9&ipo=images" alt="" />
                  <div className="tegs">
                    <div className="apps"><span></span>Tailwind</div>
                  </div>
                </Link>

                <Link href='/blog/category/HTML' className='pteg'>
                  <img src="/img/html.png" alt="HTML" />
                  <div className="tegs">
                    <div className="apps"><span></span>HTML</div>
                  </div>
                </Link>

                <Link href='/blog/category/CSS' className='pteg'>
                  <img src="/img/css.png" alt="CSS" />
                  <div className="tegs">
                    <div className="apps"><span></span>CSS</div>
                  </div>
                </Link>

                <Link href='/blog/category/Javascript' className='pteg'>
                  <img src="/img/js.svg" alt="JavaScript" />
                  <div className="tegs">
                    <div className="apps"><span></span>JavaScript</div>
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </section>

        <section className="latestpostsec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Bài viết mới nhất:</h3>
              </div>
              <div className="latestposts">
                {loading ? <Spinner /> : <>
                  {publishedBlogs.map((blog) => {
                    return <div className="lpost" key={blog._id}>
                      <div className="lpostimg">
                        <Link href={`/blogs/${blog.slug}`}><img src={blog.images[0]} alt={blog.title} /></Link>
                        <div className="tegs">
                          {blog.blogcategory.map((cat) => {
                            return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                          })}
                        </div>
                      </div>

                      <div className="lpostinfo">
                        <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                        <p>Xin chào! Mình là sinh viên đam mê lập trình web. Mình đang học JavaScript, React và Next.js, và xây dựng các dự án thực tế để nâng cao kỹ năng và tạo ra sản phẩm hữu ích.</p>
                        <h4 className="flex"><img src="/img/coder.png" alt="" /><span>by Ha Truong coder</span></h4>
                      </div>

                    </div>
                  })}
                </>}
              </div>
            </div>

            {publishedBlogs.length === 0 ? ("") : (
              <div className="blogspaginationbtn flex flex-center mt-3 "> 
                <button onClick={() => paginate(currentPage === 1)}>Previous</button>
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                  <button key={number}
                    onClick={() => paginate(number)}
                    className={`${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}> Next</button>

              </div>
             
            )}

          </div>
           {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
        </section>




      </div>
    </>
  );
}
