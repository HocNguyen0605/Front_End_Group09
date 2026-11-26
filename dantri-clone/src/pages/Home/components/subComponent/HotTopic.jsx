import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./HotTopic.module.css";

const TOPICS = [
    "Tổng Bí thư, Chủ tịch nước dự APEC 2026",
    "Ngày Văn hóa Việt Nam",
    "Nổ lớn trên phố Nguyễn Văn Cừ",
    "Quy hoạch tổng thể TPHCM tầm nhìn 100 năm",
    "Đàm phán Mỹ - Nga - Ukraine",
    "CEO Nvidia Jensen Huang",
    "APEC 2026",
    "Chiến dịch 500 ngày trả tên cho liệt sĩ",
];

function HotTopic({ topics = TOPICS }) {
    const viewportRef = useRef(null);

    function scrollByPage(direction) {
        const el = viewportRef.current;
        if (!el) return;
        el.scrollBy({
            left: direction * el.clientWidth * 0.8,
            behavior: "smooth"
        });
    }

    // chia xen kẽ vào 2 hàng cho cân nhau
    const rows = [
        topics.filter((topic, i) => i % 2 === 0),
        topics.filter((topic, i) => i % 2 === 1),
    ];

    return (
        <section className={styles.block}>
            <div className={styles.header}>
                <h2 className={styles.heading}>
                    <FaFire aria-hidden="true" />
                    CHỦ ĐỀ NÓNG
                </h2>

                <div className={styles.controls}>
                    <button type="button" aria-label="Cuộn sang trái" onClick={() => scrollByPage(-1)}>
                        <FiChevronLeft />
                    </button>
                    <button type="button" aria-label="Cuộn sang phải" onClick={() => scrollByPage(1)}>
                        <FiChevronRight />
                    </button>
                </div>
            </div>

            <div className={styles.viewport} ref={viewportRef}>
                <div className={styles.track}>
                    {rows.map((row, index) => (
                        <div key={index} className={styles.row}>
                            {row.map((topic) => (
                                <Link
                                    key={topic}
                                    to={`/search?q=${encodeURIComponent(topic)}`}
                                    className={styles.chip}
                                >
                                    {topic}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HotTopic;