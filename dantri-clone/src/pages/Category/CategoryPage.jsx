import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ArticleCard from "../../components/article/ArticleCard";
import { CATEGORIES } from "../../config/categories";
import { fetchArticles } from "../../services/rssService";

function CategoryPage() {
  const { slug } = useParams();
  const currentCategory = CATEGORIES.find((item) => item.slug === slug);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentCategory) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadArticles() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchArticles(currentCategory.rss);

        if (isMounted) setArticles(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadArticles();

    // Cleanup khi component unmount hoặc slug thay đổi
    return () => {
      isMounted = false;
    };
  }, [slug]);

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
          <p>Có lỗi xảy ra: {error}</p>
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