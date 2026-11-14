import ArticleList from "../../../components/article/ArticleList/index.js";
function NotableNews({ articles }) {
    return (
        <aside>
            <h2 className="section-title">Tin đáng chú ý</h2>
            <div style={{ display: "grid", gap: "16px" }}>
                <ArticleList articles={articles} variant="small"/>
            </div>
        </aside>
    );
}

export default NotableNews;