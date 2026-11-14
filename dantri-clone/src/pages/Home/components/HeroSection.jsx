import ArticleCard from "../../../components/article/ArticleCard";
import styles from "./HeroSection.module.css";
import ArticleList from "../../../components/article/ArticleList/index.js";

function HeroSection({ main, left = [], right = [] }) {
    return (
        <section className={styles.hero}>
            <div className={styles.left}>
                <ArticleList articles={left} variant="small"/>
            </div>
            <div className={styles.center}>
                <ArticleCard article={main} variant="large" />
            </div>
            <div className={styles.right}>
                <ArticleList articles={right} variant="compact"/>
            </div>
        </section>
    );
}

export default HeroSection;