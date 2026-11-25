import { Link, useSearchParams } from "react-router-dom";
import styles from "./CategoryHeader.module.css";

function CategoryHeader({category}){
    const [searchParams] = useSearchParams();
    const activeSubcategory = searchParams.get("subcategory");

    return(
        <header className={styles.header}>
            <div className={styles.titleRow}>
                <h1 className={styles.title}>{category.name}</h1>

                {category.eventTopics?.length > 0 && (
                    <div className={styles.eventTopics}>
                        <span className={styles.eventLabel}>Dòng sự kiện: </span>
                        {category.eventTopics.map((topic, index) => (
                            <span key={`${topic}-${index}`} className={styles.eventTag}>
                                {topic}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {category.children?.length > 0 && (
                <nav className={styles.subcategoryNav} aria-label="Danh mục con">
                    {category.children.map((child) => {
                        const isActive = activeSubcategory === child.slug;

                        return(
                            <Link
                                key={child.slug}
                                to={`/category/${category.slug}?subcategory=${child.slug}`}
                                className={`${styles.subcategoryLink} ${isActive ? styles.active : ""}`}
                            >
                                {child.name}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}

export default CategoryHeader;