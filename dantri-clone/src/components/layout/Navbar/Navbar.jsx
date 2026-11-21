
import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../../../config/categories.js";
import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <nav className={styles.navbar} aria-label="Danh mục chính">
            <div className={styles.container}>
                <ul className={styles.list}>
                    {CATEGORIES.map((category) => (
                        <li key={category.slug} className={styles.item}>
                            <NavLink
                                to={category.slug === "trang-chu" ? "/" : `/category/${category.slug}`}
                                end={category.slug === "trang-chu"}
                                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
                                {category.name}
                            </NavLink>

                            {category.children?.length > 0 && (
                                <ul className={styles.subMenu}>
                                    {category.children.map((child) =>(
                                        <li key={child.slug} className={styles.subMenuItem}>
                                            <NavLink
                                                to={'/category/${category.slug}?subcategory=${child.slug}'}
                                                className={styles.subMenuLink}>
                                                {child.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
