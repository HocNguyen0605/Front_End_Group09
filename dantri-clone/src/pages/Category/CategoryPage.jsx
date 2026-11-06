
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CATEGORIES } from "../../config/categories";
import { fetchArticles } from "../../services/rssService";

function CategoryPage() {
  // Lấy slug từ URL
  const { slug } = useParams();

  // Quản lý dữ liệu và trạng thái
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadArticles() {
      try {
        setLoading(true);
        setError(null);

        // Tìm chuyên mục theo slug
        const category = CATEGORIES.find(
          (item) => item.slug === slug
        );

        if (!category) {
          throw new Error("Không tìm thấy chuyên mục");
        }

        // Lấy dữ liệu RSS
        const data = await fetchArticles(category.rss);

        if (isMounted) {
          setArticles(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadArticles();

    // Cleanup khi component unmount hoặc slug thay đổi
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return <p>Đang tải tin tức...</p>;
  }

  if (error) {
    return <p>Có lỗi xảy ra: {error}</p>;
  }

  return (
    <div>
      <h1>
        Tin tức: {articles[0]?.feedCategory}
      </h1>

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

          <p>Chuyên mục: {article.feedCategory}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;
