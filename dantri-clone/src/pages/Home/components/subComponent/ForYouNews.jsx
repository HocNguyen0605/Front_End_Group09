import SectionTitle from "../../../../components/ui/SectionTitle/index.js";
import ArticleList from "../../../../components/article/ArticleList/index.js";

// TODO -Tạm lấy tin mới, chưa áp dụng các xử lý để lấy đúng cái cần
function ForYouNews({ articles, variant="small" }) {
    return (
        <section>
            <SectionTitle className={"title-custom"}>Tin cho bạn</SectionTitle>
            <ArticleList articles={articles} variant={variant}/>
        </section>
    );
}

export default ForYouNews;