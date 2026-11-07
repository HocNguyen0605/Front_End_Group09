import { useParams } from "react-router-dom";
import ArticleCard from "../../components/article/ArticleCard";
import { CATEGORIES } from "../../config/categories";
import { MOCK_ARTICLES } from "../../data/mockArticles";

function Category(){
  const { slug } = useParams();
  const currentCategory = CATEGORIES.find((item) => item.slug === slug);
  const articles = MOCK_ARTICLES.filter((article) => article.feedCategory === currentCategory?.name);
  if (!currentCategory) {
    return (
        <section className="container">
            <h1>Không tìm thấy chuyên mục</h1>
        </section>
    );
  }
  return (
        <section className="container">
            <h1>{currentCategory.name}</h1>

            {articles.length > 0 ? (
                articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        variant="horizontal"
                    />
                ))
            ) : (
                <p>Chưa có bài viết trong chuyên mục này.</p>
            )}
        </section>
  );
}

export default Category;