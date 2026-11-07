import { timeAgo } from "../../../utils/formatDate";
import styles from "./ArticleCard.module.css";

function ArticleCard({ article, variant = "horizontal" }) {
    const { title, description, imageUrl, sourceUrl, publishedAt } = article;

    return (
        <article className={`${styles.card} ${styles[variant]}`}>
            {imageUrl && (
                <a href={sourceUrl} target="_blank" rel="noreferrer" className={styles.thumb}>
                    <img src={imageUrl} alt={title} loading="lazy" />
                </a>
            )}

            <div className={styles.body}>
                <h3 className={styles.title}>
                    <a href={sourceUrl} target="_blank" rel="noreferrer">
                        {title}
                    </a>
                </h3>

                {variant !== "small" && description && (
                    <p className={styles.desc}>{description}</p>
                )}

                <p className={styles.meta}>{timeAgo(publishedAt)}</p>
            </div>
        </article>
    );
}

export default ArticleCard;