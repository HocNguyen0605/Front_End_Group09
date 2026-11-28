import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../config/categories";
import { useFetchRss } from "../../hooks/useFetchRss";
import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { timeAgo } from "../../utils/formatDate";
import styles from "./LatestNews.module.css";

function LatestNewsPage() {
  const latestCategory = CATEGORIES.find((category) => category.slug === "tin-moi-nhat");
  const { articles, loading, error } = useFetchRss(latestCategory?.rss);

  // Hiển thị trước 20 bài , tải thêm khi người dùng cuộn xuống.
  const [visibleCount, setVisibleCount] = useState(20);
  const sentinelRef = useRef(null);
  
  const visibleArticles = articles.slice(0, visibleCount);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= articles.length) return;
 //intersection... để phát hiện khi người dùng cuộn đến cuối danh sách bài viết.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(count + 20, articles.length));
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [articles.length, visibleCount]);

  return (
    <main className={`container ${styles.page}`}>
      <h1 className={styles.pageTitle}>Tin mới nhất</h1>

      {loading && <Loading message="Đang tải tin mới nhất..." />}
      {!loading && error && <ErrorMessage message={`Có lỗi xảy ra: ${error.message}`} />}

      {!loading && !error && (
        <section className={styles.feed} aria-label="Danh sách tin mới nhất">
            {visibleArticles.map((article) => (
              <article className={styles.article} key={article.id}>
                {article.imageUrl && (
                  <Link
                    to={`/article/${encodeURIComponent(article.id || article.sourceUrl)}`}
                    state={{ article }}
                    className={styles.thumb}
                  >
                    <img src={article.imageUrl} alt={article.title} loading="lazy" />
                  </Link>
                )}

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <time>{timeAgo(article.publishedAt)}</time>
                  </div>
                  <h2 className={styles.title}>
                    <Link
                      to={`/article/${encodeURIComponent(article.id || article.sourceUrl)}`}
                      state={{ article }}
                    >
                      {article.title}
                    </Link>
                  </h2>
                  {article.description && (
                    <p className={styles.description}>{article.description}</p>
                  )}
                </div>
              </article>
            ))}

            {visibleCount < articles.length && (
              <div ref={sentinelRef} className={styles.lazySentinel} aria-hidden="true" />
            )}
        </section>
      )}
    </main>
  );
}

export default LatestNewsPage;
