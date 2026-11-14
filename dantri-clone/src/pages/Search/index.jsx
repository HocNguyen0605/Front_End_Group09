
import { useSearchParams } from "react-router-dom";

import { useFetchAllArticles } from "../../hooks/useFetchAllArticles";

// Chuẩn hóa văn bản để tìm kiếm không phân biệt dấu
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
    // Kiểm tra từ khóa
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
                    : [article.authors])
            ].join(" ");
            return normalizeText(searchableContent)
                .includes(normalizedKeyword);
        })
        : [];
    return (
        <section className="container">
            <h1>Kết quả tìm kiếm</h1>
            <p>
                Từ khóa: {keyword}
            </p>
            {!hasKeyword && (
                <p>Vui lòng nhập từ khóa tìm kiếm.</p>
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
                        Tìm thấy {filteredArticles.length} bài viết.
                    </p>
                    {filteredArticles.length > 0 ? (
                        <ul>
                            {filteredArticles.map((article) => (
                                <li
                                    key={
                                        article.id ||
                                        article.sourceUrl ||
                                        article.title
                                    }
                                >
                                    <strong>{article.title}</strong>
                                    {" - "}
                                    {article.feedCategory}
                                </li>
                            ))}
                        </ul>
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
