import axios from "axios";
import { FileHeadphone } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";


export default function contact() {

    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [messageOk, setMessageOk] = useState('');

    async function createProduct(ev) {
        ev.preventDefault();

        setMessageOk('Đang gửi...')

        const data = { name, lname, email, company, phone, country, project, price, description };

        try {
            await axios.post('/api/contacts', data);
            setMessageOk('Tin nhắn đã được gửi thành công')

            //reset all form fields after successful submission
            setName('');
            setLname('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject('');
            setPrice('');
            setDescription('');

        } catch (error) {
            if (error.response) {
                //the req was made and the server responded with a status code
                //the falls out of the range of 2xx
                console.error('server error', error.response.data)
            } else if (error.request) {
                //the req was made but no response was received
                console.error('Network error', error.request)
            } else {
                //something happened in setting up the req that triggered an error
                console.error('error', error.message)
            }
            setMessageOk('Không gửi được tin nhắn')
        }
    }

    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)) {
            setProject(project.filter((p) => p !== projectName))
        } else {
            setProject([...project, projectName])
        }
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    return <>
        <Head>
            <title>Liên hệ</title>
        </Head>

        <div className="contactpage">
            <div className="container">
                <div className="contactformp">
                    <div className="leftcontp">
                        <h2>Kết nối với tôi</h2>
                        <h2>Hãy trao đổi thêm để hiểu rõ hơn về tôi</h2>
                        <p>Nếu bạn quan tâm đến hồ sơ của tôi, có dự án phù hợp, hoặc muốn trao đổi thêm về cơ hội công việc, tôi rất sẵn lòng kết nối.</p>
                        <p>Bạn có thể sử dụng biểu mẫu trên trang này hoặc liên hệ với tôi qua các kênh khác bên dưới.</p>
                        <p>Tôi luôn trân trọng mọi góp ý và câu hỏi — và rất mong được làm việc cùng bạn.</p>
                        <div className="leftsociinfo">
                            <ul>
                                <li><FaPhoneVolume /><span>Phone: <a href="tel:+0973135577" target="_blank">+0973135577</a></span></li>
                                <li><MdAttachEmail /><span>Email: <a href="mailto:hatruongcoder@gmail.com" target="_blank">hatruongcoder@gmail.com</a></span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="rightcontp">
                        <form onSubmit={createProduct}>
                            <div className="rightconttitle">
                                <h2>Liên hệ cho tôi</h2>
                            </div>
                            <div className="rightcontinputs">
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="Họ và tên" required />
                                <input type="text" value={lname} onChange={ev => setLname(ev.target.value)} placeholder="Tên gọi khác" required />
                                <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Địa chỉ email" required />
                                <input type="text" value={company} onChange={ev => setCompany(ev.target.value)} placeholder="Tên công ty" required />
                                <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Số điện thoại" required />
                                <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} id="country">
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    <option value="an-giang">An Giang</option>
                                    <option value="ba-ria-vung-tau">Bà Rịa - Vũng Tàu</option>
                                    <option value="bac-lieu">Bạc Liêu</option>
                                    <option value="bac-giang">Bắc Giang</option>
                                    <option value="bac-kan">Bắc Kạn</option>
                                    <option value="bac-ninh">Bắc Ninh</option>
                                    <option value="ben-tre">Bến Tre</option>
                                    <option value="binh-duong">Bình Dương</option>
                                    <option value="binh-dinh">Bình Định</option>
                                    <option value="binh-phuoc">Bình Phước</option>
                                    <option value="binh-thuan">Bình Thuận</option>
                                    <option value="ca-mau">Cà Mau</option>
                                    <option value="cao-bang">Cao Bằng</option>
                                    <option value="can-tho">Cần Thơ</option>
                                    <option value="da-nang">Đà Nẵng</option>
                                    <option value="dak-lak">Đắk Lắk</option>
                                    <option value="dak-nong">Đắk Nông</option>
                                    <option value="dien-bien">Điện Biên</option>
                                    <option value="dong-nai">Đồng Nai</option>
                                    <option value="dong-thap">Đồng Tháp</option>
                                    <option value="gia-lai">Gia Lai</option>
                                    <option value="ha-giang">Hà Giang</option>
                                    <option value="ha-nam">Hà Nam</option>
                                    <option value="ha-noi">Hà Nội</option>
                                    <option value="ha-tinh">Hà Tĩnh</option>
                                    <option value="hai-duong">Hải Dương</option>
                                    <option value="hai-phong">Hải Phòng</option>
                                    <option value="hau-giang">Hậu Giang</option>
                                    <option value="hoa-binh">Hòa Bình</option>
                                    <option value="hung-yen">Hưng Yên</option>
                                    <option value="khanh-hoa">Khánh Hòa</option>
                                    <option value="kien-giang">Kiên Giang</option>
                                    <option value="kon-tum">Kon Tum</option>
                                    <option value="lai-chau">Lai Châu</option>
                                    <option value="lam-dong">Lâm Đồng</option>
                                    <option value="lang-son">Lạng Sơn</option>
                                    <option value="lao-cai">Lào Cai</option>
                                    <option value="long-an">Long An</option>
                                    <option value="nam-dinh">Nam Định</option>
                                    <option value="nghe-an">Nghệ An</option>
                                    <option value="ninh-binh">Ninh Bình</option>
                                    <option value="ninh-thuan">Ninh Thuận</option>
                                    <option value="phu-tho">Phú Thọ</option>
                                    <option value="phu-yen">Phú Yên</option>
                                    <option value="quang-binh">Quảng Bình</option>
                                    <option value="quang-nam">Quảng Nam</option>
                                    <option value="quang-ngai">Quảng Ngãi</option>
                                    <option value="quang-ninh">Quảng Ninh</option>
                                    <option value="quang-tri">Quảng Trị</option>
                                    <option value="soc-trang">Sóc Trăng</option>
                                    <option value="son-la">Sơn La</option>
                                    <option value="tay-ninh">Tây Ninh</option>
                                    <option value="thai-binh">Thái Bình</option>
                                    <option value="thai-nguyen">Thái Nguyên</option>
                                    <option value="thanh-hoa">Thanh Hóa</option>
                                    <option value="thua-thien-hue">Thừa Thiên Huế</option>
                                    <option value="tien-giang">Tiền Giang</option>
                                    <option value="tp-ho-chi-minh">TP. Hồ Chí Minh</option>
                                    <option value="tra-vinh">Trà Vinh</option>
                                    <option value="tuyen-quang">Tuyên Quang</option>
                                    <option value="vinh-long">Vĩnh Long</option>
                                    <option value="vinh-phuc">Vĩnh Phúc</option>
                                    <option value="yen-bai">Yên Bái</option>
                                </select>
                            </div>
                            <div className="rightconttitle">
                                <h2>Bạn đang cần kỹ năng nào cho vị trí/dự án?</h2>
                            </div>
                            <div className="rightcontcheckbox">
                                {[
                                    'Front-end Development',
                                    'Next.js Development',
                                    'Responsive & UI Implementation',
                                    'API Integration',
                                    'Database & Backend Basics'
                                ].map((projectOption) => (
                                    <label key={projectOption} className="cyberpunk-checkbox-label">
                                        <input type="checkbox"
                                            className="cyberpunk-checkbox"
                                            value={projectOption}
                                            checked={project.includes(projectOption)}
                                            onChange={() => handleProjectChange(projectOption)}
                                        />
                                        {projectOption}
                                    </label>

                                ))}
                            </div>
                           
                            <div className="rightconttitle">
                                <h2>Hãy cho tôi biết về dự án hoặc cơ hội mà bạn đang tìm kiếm.</h2>
                            </div>
                            <div className="rightcontpera">
                                <textarea
                                    value={description}
                                    onChange={(ev) => setDescription(ev.target.value)}
                                    name="description"
                                    rows={4}
                                    placeholder="Mô tả dự án"
                                ></textarea>
                            </div>
                            <hr />
                            <div className="righhcontsbtn flex gap-3">
                                <button type="submit">Gửi</button>
                                <p>{messageOk}</p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>


    </>
}
