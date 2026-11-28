import styles from './SubTopic.module.css'
import {Link} from "react-router-dom";
import {useFetchRss} from "../../../../hooks/useFetchRss.js";
import ArticleList from "../../../../components/article/ArticleList/index.js";
import ArticleCard from "../../../../components/article/ArticleCard/index.js";
function SubTopic({category}){
    const{articles, loading, error,} = useFetchRss(category?.rss);
    const left = articles[0]
    const right = articles.slice(1,5)
    const topics = category.children?.slice(0, 3) ?? [];
    return (
        <section className={styles.topic}>
            {/*header */}
            <div className={styles.header}>
                <Link to={`/category/${category.slug}`} className={styles.name}>
                    {category.name}
                </Link>
                {topics.map((topic) => (
                        <Link
                            key={topic.slug}
                            to={`/search?q=${encodeURIComponent(topic)}`}
                            className={styles.topics}
                        >
                            {topic.name}
                        </Link>
                ))}
            </div>
            {/*article */}
            {loading && <p className={styles.status}>Đang tải...</p>}
            {error && <p className={styles.status}>Không tải được {category.name}</p>}

            {left && (
                <div className={styles.section}>
                    <div className={styles.left}>
                        <ArticleCard article={left} variant="subTopic" />
                    </div>
                    <div className={styles.right}>
                        <ArticleList articles={right} variant="compact" />
                    </div>
                </div>
            )}
        </section>
    )
}
export default SubTopic