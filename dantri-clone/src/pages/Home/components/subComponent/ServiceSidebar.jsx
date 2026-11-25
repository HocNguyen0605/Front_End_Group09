import styles from "./ServiceSidebar.module.css";
import ArticleList from "../../../../components/article/ArticleList/index.js";

const MOCK_GOLD = {
    brand: "Kim Gia Bảo 24K",
    buy: "12.830.000",
    sell: "13.330.000",
    buyTrend: "down",
    sellTrend: "down",
    updatedAt: "09:40 - 20/11/2026",
    unit: "đồng/chỉ",
};

const MOCK_LOTTERY = {
    games: "Max 3D Pro, 3D, Keno, Bingo18, Lotto 5/35",
    jackpotLabel: "Jackpot",
    jackpot: "17.590.778.000 VNĐ",
    date: "20/11/2026",
    numbers: ["02", "10", "12", "28", "30", "32"],
};

function Trend({ type }) {
    if (!type) return null;
    return <span className={type === "up" ? styles.up : styles.down}>
        {type === "up" ? "▲" : "▼"}</span>;
}

function PolicyBox({ articles = [] }) {
    return (
        <div className={`${styles.box} ${styles.policy}`}>
            <h3 className={styles.boxTitle}>Nội vụ và Chính sách</h3>
            <ArticleList articles={articles} variant="compact" />
        </div>
    );
}

function GoldBox({ data = MOCK_GOLD }) {
    return (
        <div className={`${styles.box} ${styles.gold}`}>
            <div className={styles.boxHeader}>
                <h3 className={styles.boxTitle}>Giá vàng hôm nay</h3>
                <span className={styles.partner}>BẢO TÍN MẠNH HẢI</span>
            </div>
            <p className={styles.brand}>{data.brand}</p>
            <div className={styles.priceRow}>
                <div>
                    <span className={styles.label}>Mua vào</span>
                    <strong className={styles.price}>{data.buy} <Trend type={data.buyTrend} /></strong>
                </div>
                <div>
                    <span className={styles.label}>Bán ra</span>
                    <strong className={styles.price}>{data.sell} <Trend type={data.sellTrend} /></strong>
                </div>
            </div>
            <div className={styles.footnote}>
                <span>Cập nhật: {data.updatedAt}</span>
                <span>Đơn vị: {data.unit}</span>
            </div>
        </div>
    );
}

function LotteryBox({ data = MOCK_LOTTERY }) {
    return (
        <div className={`${styles.box} ${styles.lottery}`}>
            <div className={styles.boxHeader}>
                <h3 className={styles.boxTitle}>Kết quả xổ số Vietlott</h3>
                <span className={styles.partner}>Vietlott</span>
            </div>
            <p className={styles.games}>Kết quả {data.games}</p>
            <div className={styles.jackpotRow}>
                <span>{data.jackpotLabel} | <b className={styles.jackpot}>{data.jackpot}</b></span>
            </div>
            <div className={styles.numberRow}>
                <span>{data.date} |</span>
                {data.numbers.map((n) => (
                    <b key={n}>{n}</b>
                ))}
            </div>
        </div>
    );
}

function ServiceSidebar({ articles = [], gold, lottery }) {
    return (
        <aside className={styles.sidebar}>
            <PolicyBox articles={articles} />
            <GoldBox data={gold} />
            <LotteryBox data={lottery} />
        </aside>
    );
}

export default ServiceSidebar;