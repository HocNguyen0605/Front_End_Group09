import ArticleCard from "../../../components/article/ArticleCard";

function NotableNews({ articles }) {
    return (
        <aside>
            <h2 className="section-title">Tin đáng chú ý</h2>
            <div style={{ display: "grid", gap: "16px" }}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                ))}
            </div>
        </aside>
    );
}

export default NotableNews;