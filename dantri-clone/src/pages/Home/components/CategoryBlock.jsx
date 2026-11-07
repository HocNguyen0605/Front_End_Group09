import { Link } from "react-router-dom";
import { useFetchRss } from "../../../hooks/useFetchRss";
import ArticleCard from "../../../components/article/ArticleCard";
import styles from "./CategoryBlock.module.css";

function CategoryBlock({ category }) {
    const { articles, loading, error } = useFetchRss(category.rss);

    return (
        <section>
            <h2 className="section-title">
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </h2>

            {loading && <p>Đang tải...</p>}
            {error && <p>Không tải được mục này.</p>}

            <div className={styles.grid}>
                {articles.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                ))}
            </div>
        </section>
    );
}

export default CategoryBlock;