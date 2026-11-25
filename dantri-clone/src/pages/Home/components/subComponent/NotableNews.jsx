import ArticleCard from "../../../../components/article/ArticleCard/index.js";
import SectionTitle from "../../../../components/ui/SectionTitle/index.js";

function NotableNews({ articles }) {
    return (
        <aside>
            <SectionTitle>Tin đáng chú ý</SectionTitle>
            <div style={{ display: "grid", gap: "16px" }}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                ))}
            </div>
        </aside>
    );
}

export default NotableNews;