import { CATEGORIES } from "../../config/categories";
import HeroSection from "./components/HeroSection";
import LatestNews from "./components/LatestNews";
import NotableNews from "./components/NotableNews";
import styles from "./HomePage.module.css";
import {useFetchRss} from "../../hooks/useFetchRss.js";

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
  const left = articles.slice(1, 3);
  const right = articles.slice(3, 7);
  const latest = articles.slice(7, 17);
  const notable = articles.slice(17, 22);
  return (
      <div className={"container"}>
        <HeroSection main={main} left={left} right={right} />
        <div className={styles.columns}>
          <LatestNews articles={latest} />
          <NotableNews articles={notable} />
        </div>
        </div>
  );
}
export default HomePage;