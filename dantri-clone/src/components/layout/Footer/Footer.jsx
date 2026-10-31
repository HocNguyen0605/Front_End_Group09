
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../../config/categories.js";
import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Thông tin thương hiệu */}
                    <div className={styles.brand}>
                        <Link to="/" className={styles.logo}>
                            DÂNTRÍ
                        </Link>
                        <p className={styles.description}>
                            Website mô phỏng báo điện tử Dân trí,
                            được xây dựng bằng React trong khuôn khổ
                            đồ án môn học.
                        </p>
                    </div>
                    {/* Danh sách chuyên mục */}
                    <div className={styles.categories}>
                        <h2 className={styles.heading}>
                            Chuyên mục
                        </h2>
                        <ul className={styles.categoryList}>
                            {CATEGORIES.map((category) => (
                                <li key={category.slug}>
                                    <Link to={`/category/${category.slug}`} className={styles.categoryLink}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Thông tin cuối Footer */}
                <div className={styles.bottom}>
                    <p>
                        © {new Date().getFullYear()} Dân trí Clone.
                        Đồ án môn học.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
