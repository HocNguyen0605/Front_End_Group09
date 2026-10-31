import { useEffect, useState } from "react";
import { fetchArticles } from "../services/rssService";

export function useFetchRss(rssUrl) {
    // Ghi kết quả kèm url, để biết kết quả này thuộc về url nào
    const [result, setResult] = useState({ url: null, articles: [], error: null });

    useEffect(() => {
        if (!rssUrl) return;
        let ignore = false;

        fetchArticles(rssUrl)
            .then((articles) => {
                if (!ignore) setResult({ url: rssUrl, articles, error: null });
            })
            .catch((error) => {
                if (!ignore) setResult({ url: rssUrl, articles: [], error });
            });

        return () => {
            ignore = true;
        };
    }, [rssUrl]);

    const isCurrent = result.url === rssUrl;
    return {
        articles: isCurrent ? result.articles : [],
        loading: Boolean(rssUrl) && !isCurrent,
        error: isCurrent ? result.error : null,
    };
}