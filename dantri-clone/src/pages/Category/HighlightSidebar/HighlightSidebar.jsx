import ArticleCard from "../../../components/article/ArticleCard";
import Advertisement from "../Advertisement/Advertisement";
import styles from "./HighlightSidebar.module.css";

function HighlightSidebar({articles}) {
    const mainArticle = articles[0];
    const otherArticles = articles.slice(1);

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.heading}>TIÊU ĐIỂM</h2>
            {mainArticle ? (
                <div className={styles.mainArticle}>
                    <ArticleCard article={mainArticle} variant="large"/>
                </div>
            ) : (
                <p className={styles.empty}>
                    Chưa có bài viết tiêu điểm
                </p>
            )}

            {otherArticles.length > 0 && (
                <div className={styles.otherArticles}>
                    {otherArticles.map((article) => (
                        <ArticleCard
                            key={article.id || article.sourceUrl || article.title}
                            article={article}
                            variant="split"
                        />
                    ))}
                </div>
            )}

            <Advertisement title="QUẢNG CÁO" variant="sidebar"/>
        </aside>
    )
}

export default  HighlightSidebar;