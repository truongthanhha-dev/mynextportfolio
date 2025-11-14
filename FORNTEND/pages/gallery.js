//pages/gallery.js
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
export default function Gallery() {
  const { allData, loading } = useFetchData('/api/photos');

  console.log("alldata:", allData);
  return (
    <>
      <Head>
        <title>TTH coder: Thư viện ảnh</title>
      </Head>

      <div className="gallerypage">
        <div className="container">
          <div className="gallerytopsec">
            <div className="topphonesec">
              <div className="lefttitlesec">
                <h4>HATRUONGCODER THƯ VIỆN ẢNH</h4>
                <h1>Nhiếp ảnh <br /> HaTruong</h1>
                <Link href='/gallery#galleryimages'><button>XEM THÊM</button></Link>
              </div>
              <div className="rightimgsec">
                <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/3/1.jpg" alt="" />
                <div className="r_img_top">
                  <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/6.jpg" alt="" />
                  <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/5.jpg" alt="" />
                </div>

              </div>

            </div>

            <div className="galleryhatruongphotos" id="galleryimages">
              <div className="container">
                <div className="gbtmtitles text-center">
                  <h3><span>01//</span>BỘ SƯU TẬP CỦA CHÚNG TÔI</h3>
                  <h2>HaTruongcoder ghi lại <span>tất cả</span><br />những kỷ niệm tuyệt đẹp của bạn</h2>

                </div>

                <div className="gallery_image_grid">
                  {loading ? <Spinner /> : <>
                    {allData.map((photo) => {
                      return <div className="image-item">
                        <img src={photo.images[0]} alt="" />
                        <div className="galeryimgiteminfo">
                          <h2>{photo.title}</h2>
                          <p>by HaTruong coder</p>
                        </div>


                      </div>
                    })}
                  </>}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
