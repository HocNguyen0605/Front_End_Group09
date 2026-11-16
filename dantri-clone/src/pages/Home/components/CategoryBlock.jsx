import { Link } from "react-router-dom";
import { useFetchRss } from "../../../hooks/useFetchRss";
import ArticleCard from "../../../components/article/ArticleCard";
import styles from "./CategoryBlock.module.css";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import SectionTitle from "../../../components/ui/SectionTitle";

function CategoryBlock({ category }) {
    const { articles, loading, error } = useFetchRss(category.rss);

    return (
        <section>
            <SectionTitle>
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </SectionTitle>
            {loading && <Loading message="Đang tải tin tức..." />}
            {error && (<ErrorMessage message="Không tải được tin tức chuyên mục này." />)}
            {!loading && !error && articles.length === 0 && (<p>Chưa có bài viết trong chuyên mục này.</p>)}
            {!loading && !error && articles.length > 0 && (
                <div className={styles.grid}>
                    {articles.slice(0, 4).map((article) => (
                        <ArticleCard key={article.id} article={article} variant="small"/>)
                    )}
                </div>
            )}
        </section>
    );
}

export default CategoryBlock;