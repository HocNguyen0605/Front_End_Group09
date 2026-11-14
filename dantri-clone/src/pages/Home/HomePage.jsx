import { CATEGORIES } from "../../config/categories";
import HeroSection from "./components/HeroSection";
import LatestNews from "./components/LatestNews";
import NotableNews from "./components/NotableNews";
import CategoryBlock from "./components/CategoryBlock";
import styles from "./HomePage.module.css";
import {useFetchRss} from "../../hooks/useFetchRss.js";

const BLOCK_SLUGS = ["the-thao", "giao-duc", "cong-nghe"];
function HomePage() {
  const homeCategory = CATEGORIES.find((category) => category.slug === "trang-chu");
  const{articles, loading, error,} = useFetchRss(homeCategory?.rss);

  if (loading) {
    return <p>Đang tải tin tức...</p>;
  }

  if (error) {
    return <p>Có lỗi xảy ra: {error.message}</p>;
  }

  if (articles.length === 0) return <p>Chưa có bài viết.</p>;

  const main = articles[0];
  const side = articles.slice(1, 5);
  const latest = articles.slice(5, 15);
  const notable = articles.slice(15, 20);
  const blocks = CATEGORIES.filter((category) => BLOCK_SLUGS.includes(category.slug));
  return (
      <div>
        <HeroSection main={main} side={side} />
        <div className={styles.columns}>
          <LatestNews articles={latest} />
          <NotableNews articles={notable} />
        </div>
        {blocks.map((category) => (
        <CategoryBlock key={category.slug} category={category} />
          ))}
        </div>
  );
}
export default HomePage;