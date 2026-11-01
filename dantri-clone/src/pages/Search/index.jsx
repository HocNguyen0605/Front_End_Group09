import { useParams } from "react-router-dom";

function Search(){
    const [searchParams] = useParams();
    const keyword = searchParams.get("q");

    return(
        <section>
            <h1>Tìm kiếm</h1>
            <p>
                {keyword? `Từ khóa tìm kiếm: ${keyword}}`: "Vui lòng nhập từ khóa tìm kiếm."}
            </p>
        </section>
    );
}

export default Search;