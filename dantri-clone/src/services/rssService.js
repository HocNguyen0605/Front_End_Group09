import { CATEGORIES } from "../config/categories";

export async function fetchArticles(rssUrl) {
  try {
    // gửi request đến RSS
    const rssPath = new URL(rssUrl).pathname;
    const response = await fetch(rssPath);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // nhan xml
    const xmlText = await response.text();

    // chuyen xml sang DOM
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(
      xmlText,
      "application/xml"
    );

    // validate xml
    if (xmlDoc.querySelector("parsererror")) {
      throw new Error("RSS XML không hợp lệ");
    }


    const category = CATEGORIES.find(
      (item) => item.rss === rssUrl
    );

    const feedCategory = category?.name || "Khác";

    const items = Array.from(xmlDoc.querySelectorAll("item"));

    // chuẩn hóa  bài viết
    const articles = items.map((item) => {
      const title =
        item.querySelector("title")?.textContent?.trim() || "";

      const sourceUrl =
        item.querySelector("link")?.textContent?.trim() || "";

      const guid =
        item.querySelector("guid")?.textContent?.trim() || sourceUrl;

      const pubDate =
        item.querySelector("pubDate")?.textContent?.trim() || "";

      // Lấy description và parse HTML 
      const descriptionHtml =
        item.querySelector("description")?.textContent || "";

      const descriptionDoc = new DOMParser().parseFromString(
        descriptionHtml,
        "text/html"
      );

      const imageUrl =
        descriptionDoc.querySelector("img")?.getAttribute("src") || null;

      const description =
        descriptionDoc.body.textContent?.trim() || "";

      // Lấy tác giả 
      const creatorNode = item.getElementsByTagNameNS(
        "*",
        "creator"
      )[0];

      const creatorText = creatorNode?.textContent?.trim() || "";

      const authors = creatorText
        ? creatorText.split(",").map((name) => name.trim()).filter(Boolean)
        : [];

      return {
        id: guid,
        title,
        description,
        imageUrl,
        sourceUrl,
        authors,
        publishedAt: Date.parse(pubDate),
        feedCategory,
      };
    });

    return articles;
  } catch (error) {
    console.error("Lỗi khi lấy RSS:", error);
    throw error;
  }
}