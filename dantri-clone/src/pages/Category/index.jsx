import { useParams } from "react-router-dom";

function Category(){
  const { slug } = useParams();
  return(
      <section className="container">
        <h1>Trang chuyên mục</h1>
        <p>Chuyên mục hiện tại: {   slug }</p>
      </section>
  );
}

export default Category;