import ArticleList from "../../../components/article/ArticleList";
import HighlightSidebar from "../HighlightSidebar/HighlightSidebar";
import styles from "./NewsFeedSection.module.css";

function NewsFeedSection({articles = [], highlightArticles = [],}) {
    return (
        <section className={styles.section}>
            <div className={styles.newsFeed}>
                <h2 className={styles.heading}>TIN TỨC MỚI</h2>

                <ArticleList
                    articles={articles}
                    variant="horizontal"
                    layout="stack"
                    emptyText="Chưa có bài viết trong chuyên mục này."
                />
            </div>

            <div className={styles.highlight}>
                <HighlightSidebar articles={highlightArticles}/>
            </div>
        </section>
    )
}

export default NewsFeedSection;