import { useParams } from "react-router-dom";

function ArticleDetail(){
  const { id } = useParams();

  return(
      <section>
        <h1>Chi tiết bài viết</h1>
        <p>Mã bài viết: { id }</p>
      </section>
  );
}

export default ArticleDetail;
