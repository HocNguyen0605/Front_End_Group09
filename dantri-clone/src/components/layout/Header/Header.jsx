
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import Navbar from "../Navbar/index.js";
import styles from "./Header.module.css";

const PARTNER_LINKS = [
    {
        name: "Fica",
        url: "https://fica.dantri.com.vn",
    },
    {
        name: "DTiNews",
        url: "https://dtinews.dantri.com.vn",
    },
    {
        name: "Nội vụ & Xã hội",
        url: "https://noivuxahoi.dantri.com.vn",
    },
];

function Header() {
    return (
        <header className={styles.header}>
            {/* Liên kết các chuyên trang */}
            <div className={styles.partnerBar}>
                <div className={styles.container}>
                    {PARTNER_LINKS.map((partner) => (
                        <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className={styles.partnerLink}>
                            {partner.name}
                        </a>
                    ))}
                </div>
            </div>
            {/* Logo và tìm kiếm */}
            <div className={styles.mainHeader}>
                <div className={styles.container}>
                    <Link to="/" className={styles.logo} aria-label="Dân trí - Trang chủ">
                        DÂNTRÍ
                    </Link>
                    <form className={styles.search} role="search" onSubmit={(event) => event.preventDefault()}>
                        <input type="search" placeholder="Nhập nội dung cần tìm..." aria-label="Tìm kiếm bài viết"/>
                        <button type="submit" aria-label="Tìm kiếm">
                            <FiSearch />
                        </button>
                    </form>
                </div>
            </div>
            {/* Thanh danh mục */}
            <Navbar />
        </header>
    );
}

export default Header;
