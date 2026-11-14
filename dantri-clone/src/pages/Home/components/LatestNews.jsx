import ArticleList from "../../../components/article/ArticleList/index.js";

function LatestNews({ articles }) {
    return (
        <section>
            <h2 className="section-title">Tin mới nhất</h2>
            <div style={{ display: "grid", gap: "20px" }}>
                <ArticleList articles={articles} variant="horizontal"/>
            </div>
        </section>
    );
}

export default LatestNews;