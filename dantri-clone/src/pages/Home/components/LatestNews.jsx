import ArticleCard from "../../../components/article/ArticleCard";

function LatestNews({ articles }) {
    return (
        <section>
            <h2 className="section-title">Tin mới nhất</h2>
            <div style={{ display: "grid", gap: "20px" }}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
            </div>
        </section>
    );
}

export default LatestNews;