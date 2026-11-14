
import { useSearchParams } from "react-router-dom";

import { useFetchAllArticles } from "../../hooks/useFetchAllArticles";
import ArticleCard from "../../components/article/ArticleCard";
import styles from "./Search.module.css";

// chuan hoa vban -> để linh hoạt khi search 
function normalizeText(text = "") {
    return String(text)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim();
}

function Search() {
    const [searchParams] = useSearchParams();

    // Lấy từ khóa từ URL
    const keyword = searchParams.get("q") || "";

    const hasKeyword = keyword.trim().length > 0;

    // Lấy dữ liệu RSS
    const {
        articles,
        loading,
        error,
        hasPartialError
    } = useFetchAllArticles(hasKeyword);

    // Chuẩn hóa từ khóa
    const normalizedKeyword = normalizeText(keyword);

    // Lọc bài viết
    const filteredArticles = normalizedKeyword
        ? articles.filter((article) => {

            const searchableContent = [
                article.title,
                article.description,
                article.feedCategory,
                ...(Array.isArray(article.authors)
                    ? article.authors
                    : [article.authors || ""])
            ].join(" ");

            return normalizeText(searchableContent)
                .includes(normalizedKeyword);
        })
        : [];

    return (
        <section className="container">

            <h1>Kết quả tìm kiếm</h1>

            {hasKeyword && (
                <p>
                    Từ khóa: <strong>{keyword}</strong>
                </p>
            )}

            {!hasKeyword && (
                <p>
                    Vui lòng nhập từ khóa tìm kiếm.
                </p>
            )}
            {hasKeyword && loading && (
                <p>Đang tải dữ liệu bài viết...</p>
            )}
            {hasKeyword && !loading && error && (
                <p>{error.message}</p>
            )}
            {hasKeyword && !loading && !error && (
                <>
                    {hasPartialError && (
                        <p>
                            Một số nguồn RSS không thể tải.
                            Kết quả có thể chưa đầy đủ.
                        </p>
                    )}
                    <p>
                        Tìm thấy{" "}
                        <strong>
                            {filteredArticles.length}
                        </strong>{" "}
                        bài viết.
                    </p>

                    {filteredArticles.length > 0 ? (
                        <div className={styles.results}>
                            {filteredArticles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    variant="horizontal"
                                />
                            ))}
                        </div>
                    ) : (
                        <p>
                            Không tìm thấy bài viết phù hợp.
                        </p>
                    )}
                </>
            )}

        </section>
    );
}

export default Search;
