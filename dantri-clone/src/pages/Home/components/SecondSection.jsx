import styles from "./SecondSection.module.css";
import ArticleList from "../../../components/article/ArticleList/index.js";
import ForYouNews from "./subComponent/ForYouNews.jsx";
import ServiceSidebar from "./subComponent/ServiceSidebar.jsx";

function SecondSection({ article = [] }){
    const left = article.slice(0, 3);
    const center = article.slice(0, 6);
    const right = article.slice(6, 10);
    return (
        <section className={styles.hero}>
            {/*TODO - giả sử để truyền prop vào cho tin cho bạn*/}
            <div className={styles.left}>
                <ForYouNews articles={left}  variant="small" />
            </div>

            <div className={styles.center}>
                <ArticleList articles={center} variant="split" />
            </div>

            <div className={styles.right}>
                <ServiceSidebar articles={right.slice(0, 2)} />
            </div>
        </section>
    );
}
export default SecondSection;