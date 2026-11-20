import { useParams } from "react-router-dom";
import ArticleCard from "../../components/article/ArticleCard";
import { CATEGORIES } from "../../config/categories";
import { useFetchRss } from "../../hooks/useFetchRss";
import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

function CategoryPage() {
    const {slug} = useParams();
    const currentCategory = CATEGORIES.find((item) => item.slug === slug);
    const {articles, loading, error,} = useFetchRss(currentCategory?.rss);

    // Các return sớm nằm sau hooks
    if (!currentCategory) {
        return (
            <section className="container">
                <h1>Không tìm thấy chuyên mục</h1>
            </section>
        );
    }

    return (
        <section className="container">
            <h1>{currentCategory.name}</h1>
            <div style={{minHeight: "300px"}}>
                {loading && <Loading/>}
                {!loading && error && (
                    <ErrorMessage message={`Có lỗi xảy ra: ${error.message}`}/>
                )}

                {!loading && !error && articles.length > 0 && (articles.map((article) => (
                        <ArticleCard key={article.id} article={article} variant="horizontal"/>
                    ))
                )}

                {!loading && !error && articles.length === 0 && (
                    <p>Chưa có bài viết trong chuyên mục này.</p>
                )}
            </div>
        </section>
    );
}

export default CategoryPage;