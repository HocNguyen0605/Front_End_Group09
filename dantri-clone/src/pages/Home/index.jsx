import { useEffect, useState } from "react";

import ArticleCard from "../../components/article/ArticleCard";
import { CATEGORIES } from "../../config/categories";
import { fetchArticles } from "../../services/rssService";

const HOME_CATEGORY = CATEGORIES[0];

function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!HOME_CATEGORY) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        async function loadArticles() {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchArticles(HOME_CATEGORY.rss);

                if (isMounted) setArticles(data);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        loadArticles();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <section className="container">
                <h1>Trang chủ</h1>
                <p>Đang tải tin tức...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container">
                <h1>Trang chủ</h1>
                <p>Có lỗi xảy ra: {error}</p>
            </section>
        );
    }

    const [featured, ...others] = articles;

    return (
        <section className="container">
            <h1>Trang chủ</h1>

            {featured ? (
                <>
                    <ArticleCard article={featured} variant="medium" />

                    {others.slice(0, 5).map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            variant="horizontal"
                        />
                    ))}
                </>
            ) : (
                <p>Chưa có bài viết.</p>
            )}
        </section>
    );
}

export default Home;