import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate.js";
import styles from "./ArticleCard.module.css";

const VALID_VARIANTS = [
    "large",
    "medium",
    "small",
    "horizontal",
];

function ArticleCard({ article, variant = "medium"}){
    const [imageError, setImageError] = useState(false);
    if(!article || !article.id || !article.title){
        return null;
    }
    const cardVariant = VALID_VARIANTS.includes(variant)? variant: "medium";
    const hasImage = article.imageUrl && !imageError;
    const authors = Array.isArray(article.authors)? article.authors.join(", "): "";
    const publishedDate = formatDate(article.publishedAt);
    return(
        <article className={styles.card} data-variant = {cardVariant}>
            <Link to={`/article/${encodeURIComponent(article.id)}`} className = {styles.link}>
                <div className={styles.imageWrapper}>
                    {hasImage ? (
                        <img src={article.imageUrl} alt={article.title} className={styles.image} onError = {() => setImageError(true)}/>
                    ) : (
                        <div className={styles.imagePlaceholder} aria-label = "Không có hình ảnh">Không có hình ảnh</div>
                    )}
                </div>

                <div className={ styles.content}>
                    {article.feedCategory &&(
                        <span className={styles.category}>{article.feedCategory}</span>
                    )}
                    <h3 className={styles.title}>{article.title}</h3>
                    {article.description && (
                        <p className={styles.description}>
                            {article.description}
                        </p>
                    )}
                    <div className={styles.meta}>
                        {authors && (
                            <span className={styles.author}>{authors}</span>
                        )}
                        {publishedDate && (
                            <time className={styles.date}>{publishedDate}</time>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    )

}

export default ArticleCard;