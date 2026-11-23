import { Link, useLocation, useParams } from "react-router-dom";
import { FiBookmark } from "react-icons/fi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useFetchArticleContent } from "../../hooks/useFetchArticleContent";
import { useFetchAllArticles } from "../../hooks/useFetchAllArticles";
import { CATEGORIES } from "../../config/categories";
import { formatDate } from "../../utils/formatDate";
import styles from "./ArticleDetail.module.css";

function ArticleDetail() {
    // Lấy ID bài viết trên URL
    const { id } = useParams();
    // Lấy dữ liệu được truyền từ ArticleCard
    const location = useLocation();
    const passedArticle = location.state?.article;
    // Chỉ sử dụng state khi đúng bài viết trên URL
    const articleFromState = passedArticle?.id === id ? passedArticle : null;
    // Nếu đã có dữ liệu thì không cần fetch lại
    // Nếu không có thì lấy RSS để tìm bài viết
    const {
        articles,
        loading,
        error,
    } = useFetchAllArticles(!articleFromState);
    // find bài viết theo ID nếu không có Navigation State
    const article =
        articleFromState ||
        articles.find((item) =>
            item.id === id || item.sourceUrl === id
        );
    // lấy nội dung chi tiết
    const {
        data: articleContent,
        loading: contentLoading,
        error: contentError,
    } = useFetchArticleContent(article?.sourceUrl);
    const [savedArticles, setSavedArticles] = useLocalStorage("savedArticles", []);
    const isSaved = article
        ? savedArticles.some((savedArticle) => savedArticle.id === article.id)
        : false;

    // Tránh hiển thị trùng ảnh giữa RSS và nội dung chi tiết
    const hasInlineImages = articleContent?.content?.some(
        (block) => block.type === "image" && block.imageUrl
    ) ?? false;
    const showHeroImage =
        article?.imageUrl &&
        !contentLoading &&
        !hasInlineImages;

    function handleSaveArticle() {
        if (!article) return;
        setSavedArticles((currentArticles) => {
            const alreadySaved = currentArticles.some(
                (savedArticle) => savedArticle.id === article.id
            );
            return alreadySaved
                ? currentArticles.filter(
                    (savedArticle) => savedArticle.id !== article.id
                )
                : [...currentArticles, article];
        });
    }

    // Đang tải dữ liệu
    if (!article && loading) {
        return (
            <section className="container">
                <p>Đang tải thông tin bài viết...</p>
            </section>
        );
    }

    // Có lỗi khi tải RSS
    if (!article && error) {
        return (
            <section className="container">
                <h1>Không thể tải bài viết</h1>
                <p>{error.message}</p>
                <Link to="/">Quay lại trang chủ</Link>
            </section>
        );
    }

    // Không tìm thấy bài viết
    if (!article) {
        return (
            <section className="container">
                <h1>Không tìm thấy bài viết</h1>
                <p>Bài viết không tồn tại</p>
                <Link to="/">Quay lại trang chủ</Link>
            </section>
        );
    }

    // Tìm chuyên mục tương ứng
    const category = CATEGORIES.find(
        (item) => item.name === article.feedCategory
    );

    return (
        <div className={styles.page}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link to="/">Trang chủ</Link>
                <span>/</span>
                {category ? (
                    <Link to={`/category/${category.slug}`}>
                        {article.feedCategory}
                    </Link>
                ) : (
                    <span>{article.feedCategory}</span>
                )}
                <span>/</span>
                <span>Chi tiết bài viết</span>
            </nav>

            <div className={styles.layout}>
                {/* Nội dung bài viết */}
                <article className={styles.article}>
                    {/* Tiêu đề */}
                    <h1 className={styles.title}>
                        {article.title}
                    </h1>

                    {/* Mô tả ngắn */}
                    {article.description && (
                        <p className={styles.lead}>
                            {article.description}
                        </p>
                    )}

                    {/* Thông tin tác giả và ngày đăng */}
                    <div className={styles.meta}>
                        {article.authors?.length > 0 && (
                            <span>
                                Tác giả:{" "}
                                <strong>{article.authors.join(", ")}</strong>
                            </span>
                        )}
                        {article.publishedAt && (
                            <time>
                                {formatDate(article.publishedAt)}
                            </time>
                        )}
                    </div>

                    {/* Ảnh bài viết */}
                    {showHeroImage && (
                        <figure className={styles.hero}>
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                loading="lazy"
                            />
                        </figure>
                    )}

                    {/* Nội dung chi tiết */}
                    <div className={styles.content}>
                        {/* loading */}
                        {contentLoading && (
                            <p>Đang tải nội dung bài báo...</p>
                        )}

                        {/* error */}
                        {contentError && (
                            <p role="alert">
                                Không thể tải nội dung bài báo:
                                {" "}{contentError.message}
                            </p>
                        )}

                        {/* content */}
                        {articleContent && (
                            <>
                                {articleContent.content.map((block, index) => {
                                    switch (block.type) {
                                        // Đoạn văn
                                        case "paragraph":
                                            return (
                                                <p key={index}>
                                                    {block.text}
                                                </p>
                                            );

                                        // Tiêu đề phụ
                                        case "heading": {
                                            const HeadingTag =
                                                block.level === 3 ? "h3" : "h2";
                                            return (
                                                <HeadingTag key={index}>
                                                    {block.text}
                                                </HeadingTag>
                                            );
                                        }

                                        // Hình ảnh và chú thích
                                        case "image":
                                            return (
                                                <figure
                                                    key={index}
                                                    className={styles.contentFigure}
                                                >
                                                    {block.imageUrl && (
                                                        <img
                                                            src={block.imageUrl}
                                                            alt={block.alt}
                                                            loading="lazy"
                                                        />
                                                    )}
                                                    {block.caption && (
                                                        <figcaption>
                                                            {block.caption}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            );

                                        // Trích dẫn
                                        case "quote":
                                            return (
                                                <blockquote key={index}>
                                                    {block.text}
                                                </blockquote>
                                            );

                                        // Danh sách
                                        case "list": {
                                            const ListTag =
                                                block.ordered ? "ol" : "ul";
                                            return (
                                                <ListTag key={index}>
                                                    {block.items.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ListTag>
                                            );
                                        }

                                        default:
                                            return null;
                                    }
                                })}
                            </>
                        )}

                        {/* Không có dữ liệu */}
                        {!contentLoading && !contentError && !articleContent && (
                            <p>Chưa có nội dung bài báo.</p>
                        )}
                    </div>           
                </article>

                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarCard}>
                        <div className={styles.sidebarHeader}>
                            <h3>Thông tin bài viết</h3>
                            <button
                                type="button"
                                className={`${styles.saveButton} ${isSaved ? styles.saved : ""}`}
                                onClick={handleSaveArticle}
                                aria-label={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                                title={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                            >
                                <FiBookmark aria-hidden="true" />
                            </button>
                        </div>

                        <div className={styles.infoItem}>
                            <span>Chuyên mục</span>
                            <strong>
                                {article.feedCategory || "Tin tức"}
                            </strong>
                        </div>

                        <div className={styles.infoItem}>
                            <span>Ngày đăng</span>
                            <strong>
                                {formatDate(article.publishedAt) || "Chưa cập nhật"}
                            </strong>
                        </div>

                        <div className={styles.infoItem}>
                            <span>Tác giả</span>
                            <strong>
                                {article.authors?.join(", ") || "Chưa cập nhật"}
                            </strong>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default ArticleDetail;
