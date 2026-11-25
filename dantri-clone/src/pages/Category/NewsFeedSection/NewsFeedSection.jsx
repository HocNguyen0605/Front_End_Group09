import ArticleCard from "../../../components/article/ArticleCard";
import HighlightSidebar from "../HighlightSidebar/HighlightSidebar";
import styles from "./NewsFeedSection.module.css";

function NewsFeedSection({articles, highlightArticles,}) {
    return (
        <section className={styles.section}>
            <div className={styles.newsFeed}>
                <h2 className={styles.heading}>TIN TỨC MỚI</h2>

                {articles.length > 0 ? (
                    <div className={styles.articleList}>
                        {articles.map((article) => (
                            <ArticleCard
                                key={article.id || article.sourceUrl || article.title}
                                article={article}
                                variant="horizontal"
                            />
                        ))}
                    </div>
                ) : (
                    <p className={styles.empty}>
                        Chưa có bài viết trong chuyên mục này.
                    </p>
                )}
            </div>

            <div className={styles.highlight}>
                <HighlightSidebar articles={highlightArticles}/>
            </div>
        </section>
    )
}

export default NewsFeedSection;