const ARTICLE_PROXY_PREFIX = "/api/article-proxy";

const ALLOWED_HOSTS = [
    "dantri.com.vn",
    "www.dantri.com.vn",
];

// lấy html bài báo
export async function fetchArticleHtml(sourceUrl) {
    const articleUrl = new URL(sourceUrl);

    if (
        articleUrl.protocol !== "https:" ||
        !ALLOWED_HOSTS.includes(articleUrl.hostname)
    ) {
        throw new Error("URL bài báo không hợp lệ");
    }

    const requestPath =
        ARTICLE_PROXY_PREFIX +
        articleUrl.pathname +
        articleUrl.search;

    const response = await fetch(requestPath);

    if (!response.ok) {
        throw new Error(
            `Không thể lấy bài báo. HTTP ${response.status}`
        );
    }

    return await response.text();
}

// lấy văn bản

function getText(element) {
    return element?.textContent
        ?.replace(/\s+/g, " ")
        .trim() || "";
}

// lấy url hình ảnh 

function getImageUrl(img, sourceUrl) {
    const rawUrl =
        img.getAttribute("data-src") ||
        img.getAttribute("data-original") ||
        img.getAttribute("data-lazy-src") ||
        img.getAttribute("src");

    if (!rawUrl || rawUrl.startsWith("data:")) {
        return null;
    }

    try {
        const url = new URL(rawUrl, sourceUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
            return null;
        }

        return url.href;
    } catch {
        return null;
    }
}

// extract content bài báo

export function extractArticleContent(html, sourceUrl) {
    const doc = new DOMParser().parseFromString(
        html,
        "text/html"
    );

    // Tìm vùng chứa bài báo
    const articleRoot = doc.querySelector("#articleContent");

    const body = doc.querySelector("#desktop-in-article");

    if (!articleRoot || !body) {
        throw new Error(
            "Không tìm thấy cấu trúc nội dung bài báo"
        );
    }

    // Clone để loại bỏ quảng cáo 
    const cleanBody = body.cloneNode(true);

    // Loại bỏ những useless element 
    cleanBody.querySelectorAll(`
        script,
        style,
        noscript,
        iframe,
        button,
        .dta-unit,
        [id^="dta-"],
        [id^="desktop-in-article-"]
    `).forEach((element) => element.remove());

    const content = [];

    // Duyệt các thành phần theo đúng thứ tự xuất hiện
    const elements = cleanBody.querySelectorAll(
        "h2, h3, p, figure, blockquote, ul, ol"
    );

    elements.forEach((element) => {

        const tag = element.tagName;

        // Tránh lấy trùng nội dung bên trong figure
        if (
            tag !== "FIGURE" &&
            element.closest("figure")
        ) {
            return;
        }

        // Tránh lấy trùng nội dung blockquote
        if (
            tag !== "BLOCKQUOTE" &&
            element.closest("blockquote")
        ) {
            return;
        }

        // Không lấy paragraph bên trong danh sách
        if (
            ["P", "H2", "H3"].includes(tag) &&
            element.closest("ul, ol")
        ) {
            return;
        }

        // Đoạn văn
        if (tag === "P") {
            const text = getText(element);

            if (text) {
                content.push({
                    type: "paragraph",
                    text,
                });
            }

            return;
        }

        // Tiêu đề phụ
        if (tag === "H2" || tag === "H3") {
            const text = getText(element);

            if (text) {
                content.push({
                    type: "heading",
                    level: Number(tag[1]),
                    text,
                });
            }

            return;
        }

        // Hình ảnh và chú thích
        if (tag === "FIGURE") {
            const img = element.querySelector("img");

            const imageUrl = img
                ? getImageUrl(img, sourceUrl)
                : null;

            const caption = getText(
                element.querySelector("figcaption")
            );

            if (imageUrl || caption) {
                content.push({
                    type: "image",
                    imageUrl,
                    alt: img?.getAttribute("alt") || "",
                    caption,
                });
            }

            return;
        }

        // Trích xuất trích dẫn
        if (tag === "BLOCKQUOTE") {
            const text = getText(element);

            if (text) {
                content.push({
                    type: "quote",
                    text,
                });
            }

            return;
        }

        // Danh sách
        if (tag === "UL" || tag === "OL") {
            const items = [...element.children]
                .filter((item) => item.tagName === "LI")
                .map(getText)
                .filter(Boolean);

            if (items.length > 0) {
                content.push({
                    type: "list",
                    ordered: tag === "OL",
                    items,
                });
            }
        }
    });

    if (content.length === 0) {
        throw new Error("Không trích xuất được nội dung");
    }

    return {
        title: getText(articleRoot.querySelector("h1")),

        summary: getText(articleRoot.querySelector("h2")),

        content,

        stats: {
            paragraphCount: content.filter(
                (item) => item.type === "paragraph"
            ).length,

            imageCount: content.filter(
                (item) => item.type === "image"
            ).length,

            blockCount: content.length,
        },
    };
}
// hàm lấy html và extract nội dung bài báo

export async function fetchArticleContent(sourceUrl) {
    const html = await fetchArticleHtml(sourceUrl);

    return extractArticleContent(html, sourceUrl);
}