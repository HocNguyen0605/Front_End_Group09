import ArticleCard from "../../../components/article/ArticleCard";
import styles from "./HeroSection.module.css";

function HeroSection({ main, side }) {
    return (
        <section className={styles.hero}>
            <ArticleCard article={main} variant="large" />

            <div className={styles.side}>
                {side.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                ))}
            </div>
        </section>
    );
}

export default HeroSection;