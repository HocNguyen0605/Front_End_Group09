
import { Link } from "react-router-dom";
import { timeAgo } from "../../../utils/formatDate";
import styles from "./ArticleCard.module.css";

function ArticleCard({ article, variant = "horizontal" }) {
    const {
        title,
        description,
        imageUrl,
        publishedAt
    } = article;

    //  id và đường dẫn cho trang chi tiết
    const articleId = article.id || article.sourceUrl;

    const detailPath = `/article/${encodeURIComponent(articleId)}`;

    return (
        <article className={`${styles.card} ${styles[variant]}`}>

            {/* Ảnh bài viết */}
            {imageUrl && (
                <Link
                    to={detailPath}
                    state={{ article }}
                    className={styles.thumb}
                    aria-label={`Xem bài viết: ${title}`}
                >
                    <img
                        src={imageUrl}
                        alt={title}
                        loading="lazy"
                    />
                </Link>
            )}

            <div className={styles.body}>

                {/* Tiêu đề */}
                <h3 className={styles.title}>
                    <Link
                        to={detailPath}
                        state={{ article }}
                    >
                        {title}
                    </Link>
                </h3>

                {/* Mô tả */}
                {variant !== "small" && description && (
                    <p className={styles.desc}>
                        {description}
                    </p>
                )}

                {/* Thời gian */}
                <p className={styles.meta}>
                    {timeAgo(publishedAt)}
                </p>

            </div>
        </article>
    );
}

export default ArticleCard;
