import ThirdLeft from "../ThirdLeft.jsx";
import ThirdRight from "./ThirdRight.jsx";
import styles from "../ThirdSection.module.css";

function ThirdSection({article}) {

    return (
        <div className={styles.section}>
            <div className={styles.left}>
                <ThirdLeft article ={article}/>
            </div>
            <div className={styles.right}>
                <ThirdRight />
            </div>
        </div>
    );
}

export default ThirdSection;