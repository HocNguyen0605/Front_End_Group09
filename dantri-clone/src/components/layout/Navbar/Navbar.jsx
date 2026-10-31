
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
                                to={`/category/${category.slug}`}
                                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
                                {category.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
