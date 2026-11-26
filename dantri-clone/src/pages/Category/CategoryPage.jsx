import { useParams } from "react-router-dom";
import { CATEGORIES } from "../../config/categories";
import { useFetchRss } from "../../hooks/useFetchRss";
import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";
import CategoryHeader from "../../pages/Category/CategoryHeader/CategoryHeader.jsx";
import FeaturedSection from "../../pages/Category/FeaturedSection/FeaturedSection.jsx";
import NewsFeedSection from "../../pages/Category/NewsFeedSection/NewsFeedSection.jsx";
import styles from "./CategoryPage.module.css";


function CategoryPage() {
    const {slug} = useParams();
    const currentCategory = CATEGORIES.find((item) => item.slug === slug);
    const {articles, loading, error,} = useFetchRss(currentCategory?.rss);

    // Các return sớm nằm sau hooks
    if (!currentCategory) {
        return (
            <section className="container">
                <h1>Không tìm thấy chuyên mục</h1>
            </section>
        );
    }

    const articleList = articles || [];
    const featuredArticles = articleList.slice(0, 7);
    const highlightArticles = articleList.slice(7, 12);
    const feedArticles = articleList.slice(12);

    return (
        <main className={`container ${styles.page}`}>
            <CategoryHeader category={currentCategory}/>
            <div className={styles.content}>
                {loading && <Loading/>}
                {!loading && error && (
                    <ErrorMessage message={`Có lỗi xảy ra: ${error.message}`}/>
                )}
                {!loading && !error && articleList.length === 0 && (
                    <p className={styles.empty}>
                        Chưa có bài viết trong chuyên mục này.
                    </p>
                )}
                {!loading && !error && articleList.length > 0 && (
                    <>
                        <FeaturedSection articles={featuredArticles}/>
                        <NewsFeedSection articles={feedArticles} highlightArticles={highlightArticles}/>
                    </>
                )}
            </div>
        </main>
    );
}

export default CategoryPage;