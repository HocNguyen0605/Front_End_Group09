import { useParams } from "react-router-dom";
import ArticleCard from "../../components/article/ArticleCard";
import { CATEGORIES } from "../../config/categories";
import { useFetchRss } from "../../hooks/useFetchRss";

function CategoryPage() {
  const { slug } = useParams();
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

  if (loading) {
    return (
        <section className="container">
          <h1>{currentCategory.name}</h1>
          <p>Đang tải tin tức...</p>
        </section>
    );
  }

  if (error) {
    return (
        <section className="container">
          <h1>{currentCategory.name}</h1>
          <p>Có lỗi xảy ra: {error.message}</p>
        </section>
    );
  }

  return (
      <section className="container">
        <h1>{currentCategory.name}</h1>

        {articles.length > 0 ? (
            articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    variant="horizontal"
                />
            ))
        ) : (
            <p>Chưa có bài viết trong chuyên mục này.</p>
        )}
      </section>
  );
}

export default CategoryPage;