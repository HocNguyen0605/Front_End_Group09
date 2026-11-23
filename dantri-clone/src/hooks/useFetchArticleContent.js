import { useEffect, useState } from "react";
import { fetchArticleContent } from "../services/articleService";
 // gọi react để quản lý trạng thái dữ liệu 
export function useFetchArticleContent(sourceUrl) {
    const [state, setState] = useState({
        data: null,
        loading: Boolean(sourceUrl),
        error: null,
    });

    useEffect(() => {
        let ignore = false;
        // Nếu chưa  có URL bài báo
        if (!sourceUrl) {
            setState({
                data: null,
                loading: false,
                error: null,
            });
            return;
        }
        // có rồi , thì load bài báo
        async function loadArticle() {
            setState({
                data: null,
                loading: true,
                error: null,
            });
            try {
                const data = await fetchArticleContent(sourceUrl);
                if (!ignore) {
                    setState({
                        data,
                        loading: false,
                        error: null,
                    });
                }
            } catch (error) {
                if (!ignore) {
                    setState({
                        data: null,
                        loading: false,
                        error,
                    });
                }
            }
        }
        loadArticle();
        return () => {
            ignore = true;
        };
    }, [sourceUrl]);

    return state;
}