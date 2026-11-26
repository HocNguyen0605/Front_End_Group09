import {CATEGORIES} from "../../../../config/categories.js";
import SubTopic from "./SubTopic.jsx";

function ThirdRight(){
    const subTopic = CATEGORIES.filter(category =>
        category.slug!== "trang-chu" &&
        category.slug!== "o-to-xe-may")
    return(
        <>
            {subTopic.map(topic=>(
                <SubTopic key={topic.slug} category={topic}/>
            ))}
        </>
    )
}
export default ThirdRight