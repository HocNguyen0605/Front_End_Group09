import ArticleList from "../../../components/article/ArticleList/index.js";
import HotNews from "./subComponent/HotNews.jsx"
import HotTopic from "./subComponent/HotTopic.jsx"

function ThirdLeft({article = []}){
    const part1 = article.slice(0,4)
    const part2 = article.slice(4,8)
    const part3 = article.slice(8,12)
    const part4 = article.slice(12,16)
    //Giả sử goodNews thoi
    const goodNews = article.slice(16,19)

    return(
        <>
            <ArticleList articles={part1} variant="part" />
            <HotNews articles = {goodNews}/>
            <ArticleList articles={part2} variant="part" />
            <HotTopic articles = {goodNews}/>
            <ArticleList articles={part3} variant="part" />
            <HotNews articles = {goodNews}/>
            <ArticleList articles={part4} variant="part" />
        </>
    )
}
export default ThirdLeft