import ArticleCard from "../../../components/article/ArticleCard";
import ArticleList from "../../../components/article/ArticleList";
import Advertisement from "../Advertisement/Advertisement";
import styles from "./FeaturedSection.module.css";

function FeaturedSection({articles = []}){
    const mainArticle = articles[0];
    const sideArticles = articles.slice(1, 3);
    const bottomArticles = articles.slice(3, 7);

    if(!mainArticle){
        return null;
    }

    return(
        <section className={styles.section}>
            <div className={styles.content}>
                <div className={styles.featuredGrid}>
                    <div className={styles.mainArticle}>
                        <ArticleCard article={mainArticle} variant={"large"}/>
                    </div>

                    <div className={styles.sideArticles}>
                        <ArticleList articles={sideArticles} variant="small" layout="stack"/>
                    </div>
                </div>

                {bottomArticles.length > 0 && (
                    <div className={styles.bottomArticles}>
                        <ArticleList articles={bottomArticles} variant="small" layout="grid"/>
                    </div>
                )}
            </div>

            <div className={styles.advertisement}>
                <Advertisement title = "QUẢNG CÁO" variant="featured"/>
            </div>
        </section>
    );
}

export default FeaturedSection;