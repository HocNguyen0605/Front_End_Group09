
import { useEffect, useState } from "react";
import { CATEGORIES } from "../config/categories";
import { fetchArticles } from "../services/rssService";

const DISABLED_STATE = {
    articles: [],
    loading: false,
    error: null,
    hasPartialError: false,
};

export function useFetchAllArticles(enabled = true) {
    const [state, setState] = useState({
        articles: [],
        loading: true,
        error: null,
        hasPartialError: false,
    });

    useEffect(() => {
        if (!enabled) return;

        let ignore = false;

        async function loadArticles() {
            setState({
                articles: [],
                loading: true,
                error: null,
                hasPartialError: false,
            });

            // lấy RSS của từng chuyên mục trước
            // RSS trang chủ được lấy sau cùng.
            const sources = [
                ...CATEGORIES.filter(
                    (category) => category.slug !== "trang-chu"
                ),
                ...CATEGORIES.filter(
                    (category) => category.slug === "trang-chu"
                ),
            ];

            const results = await Promise.allSettled(
                sources.map((category) =>
                    fetchArticles(category.rss)
                )
            );

            if (ignore) return;

            const successfulResults = results.filter(
                (result) => result.status === "fulfilled"
            );

            const failedCount =
                results.length - successfulResults.length;

            if (successfulResults.length === 0) {
                setState({
                    articles: [],
                    loading: false,
                    error: new Error(
                        "Không thể tải dữ liệu từ RSS."
                    ),
                    hasPartialError: false,
                });
                return;
            }

            // Gom tất cả bài viết lại thành một mảng
            const allArticles = successfulResults.flatMap(
                (result) => result.value
            );

            // Loại bỏ bài viết trùng ID
            const uniqueArticles = new Map();

            allArticles.forEach((article) => {
                const key =
                    article.id || article.sourceUrl || article.title;

                if (!uniqueArticles.has(key)) {
                    uniqueArticles.set(key, article);
                }
            });

            setState({
                articles: Array.from(uniqueArticles.values()),
                loading: false,
                error: null,
                hasPartialError: failedCount > 0,
            });
        }

        loadArticles();

        return () => {
            ignore = true;
        };
    }, [enabled]);

    return enabled ? state : DISABLED_STATE;
}
