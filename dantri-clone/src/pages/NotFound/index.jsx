import { Link } from "react-router-dom";

function NotFound(){
    return(
        <section>
            <h1>404-Không tìm thấy trang</h1>
            <p>Đường dẫn truy cập không tồn tại.</p>
            <Link to = "/">Quay về trang chủ</Link>
        </section>
    );
}

export default NotFound;