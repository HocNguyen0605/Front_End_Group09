import styles from './HotNews.module.css'
import ArticleList from "../../../../components/article/ArticleList/index.js";
function HotNews({articles=[]}){

    return(
          <div className={styles.block}>
              <h2 className={styles.heading}>TIN HAY</h2>
              <ArticleList articles={articles} variant={"hotNews"} layout={"row"}/>
          </div>
    )
}
export default HotNews