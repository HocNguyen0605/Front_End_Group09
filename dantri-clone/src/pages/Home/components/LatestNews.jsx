import ArticleCard from "../../../components/article/ArticleCard";
import SectionTitle from "../../../components/ui/SectionTitle";

function LatestNews({ articles }) {
    return (
        <section>
            <SectionTitle>Tin mới nhất</SectionTitle>
            <div style={{ display: "grid", gap: "20px" }}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
            </div>
        </section>
    );
}

export default LatestNews;