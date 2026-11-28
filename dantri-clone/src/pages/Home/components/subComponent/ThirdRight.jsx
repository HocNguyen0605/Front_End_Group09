import {CATEGORIES} from "../../../../config/categories.js";
import SubTopic from "./SubTopic.jsx";

function ThirdRight(){
    const subTopic = CATEGORIES.filter(category =>
        category.slug!== "trang-chu" &&
        category.slug!== "o-to-xe-may"&&
        category.slug!== "thoi-su"&&
        category.slug!== "doi-song"&&
        category.slug!== "du-lich"&&
        category.slug!== "kinh-doanh"


    )
    return(
        <>
            {subTopic.map(topic=>(
                <SubTopic key={topic.slug} category={topic}/>
            ))}
        </>
    )
}
export default ThirdRight