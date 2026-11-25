import ArticleCard from "../ArticleCard";
import styles from "./ArticleList.module.css";

function ArticleList({
                         articles,
                         variant = "horizontal",
                         layout = "stack",
                         emptyText = "Chưa có bài viết.",
                     }) {
    if (!articles || articles.length === 0) {
        return <p className={styles.empty}>{emptyText}</p>;
    }

    return (
        <div className={`${styles.list} ${styles[layout]}`}>
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} variant={variant} />
            ))}
        </div>
    );
}

export default ArticleList;