import { useEffect, useState } from "react";
import { fetchArticles } from "../../services/rssService";
import { CATEGORIES } from "../../config/categories";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);

        const data = await fetchArticles(CATEGORIES[0].rss);

        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  if (loading) {
    return <p>Đang tải tin tức...</p>;
  }

  if (error) {
    return <p>Có lỗi xảy ra: {error}</p>;
  }

  return (
    <div>
      <h1>Tin tức mới nhất</h1>

      <p>Tổng số bài viết: {articles.length}</p>

      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>

          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              width="200"
            />
          )}

          <p>
            Chuyên mục: {article.feedCategory}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;