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
                <h1>Kho ảnh  <br /> HaTruong</h1>
                <Link href='/gallery#galleryimages'><button>XEM THÊM</button></Link>
              </div>
              <div className="rightimgsec">
                <img src="https://i.pinimg.com/1200x/2e/72/fa/2e72faf046fecc6939cbd0c779b6cdbd.jpg" alt="" />
                <div className="r_img_top">
                  <img src="https://i.pinimg.com/736x/45/c9/af/45c9af9dcbb07651126088b5a809f31e.jpg" alt="" />
                  <img src="https://i.pinimg.com/736x/2e/63/73/2e6373a25bb9d0031f7358bc7e32e72d.jpg" alt="" />
                </div>

              </div>

            </div>

            <div className="galleryhatruongphotos" id="galleryimages">
              <div className="container">
                <div className="gbtmtitles text-center">
                 
                  <h2>Những điều bình thường<span> nhưng</span><br />ẩn chứa sự dễ thương và ấm áp</h2>

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
