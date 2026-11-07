import ArticleCard from "../../components/article/ArticleCard";
import { MOCK_ARTICLES } from "../../data/mockArticles";

function Home(){
  return(
      <section className="container">
        <h1>Trang chủ</h1>
          <ArticleCard
              article={MOCK_ARTICLES[0]}
              variant="medium"
          />
      </section>
  );
}

export default Home;