import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../../config/categories.js";
import styles from "./Navbar.module.css";

function Navbar() {
    const [openCategory, setOpenCategory] = useState(null);
    const location = useLocation();
    const handleOpenMenu = (slug) => {
        if (!slug) {
            setOpenCategory(null);
            return;
        }
        setOpenCategory({
            slug,
            pathname: location.pathname,
            search: location.search,
        });
    };

    return (
        <nav className={styles.navbar} aria-label="Danh mục chính">
            <div className={styles.container}>
                <ul className={styles.list}>
                    {CATEGORIES.map((category) => {
                        const hasChildren = category.children?.length > 0;
                        const isOpen =
                            openCategory?.slug === category.slug &&
                            openCategory?.pathname === location.pathname &&
                            openCategory?.search === location.search;

                        return (
                            <li key={category.slug} className={styles.item} onMouseEnter={() =>
                                handleOpenMenu(hasChildren ? category.slug : null)
                                }
                                onMouseLeave={() => handleOpenMenu(null)}
                                onFocus={() => {if (hasChildren) {handleOpenMenu(category.slug);
                                    }
                                }}
                                onBlur={(event) => {
                                    if (!event.currentTarget.contains(event.relatedTarget)) {
                                        handleOpenMenu(null);
                                    }
                                }}
                            >
                                <NavLink
                                    to={
                                        category.slug === "trang-chu"
                                            ? "/"
                                            : category.slug === "tin-moi-nhat"
                                                ? "/tin-moi-nhat.htm"
                                                : `/category/${category.slug}`
                                    }
                                    end={category.slug === "trang-chu" || category.slug === "tin-moi-nhat"}
                                    aria-expanded={hasChildren ? isOpen : undefined}
                                    aria-haspopup={hasChildren ? "true" : undefined}
                                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                                    onClick={() => handleOpenMenu(null)}
                                >
                                    {category.name}
                                </NavLink>

                                {hasChildren && (
                                    <ul className={`${styles.subMenu} ${isOpen ? styles.subMenuOpen : ""}`}
                                        aria-hidden={!isOpen}
                                    >
                                        {category.children.map((child) => (
                                            <li key={child.slug} className={styles.subMenuItem}
                                            >
                                                <NavLink
                                                    to={`/category/${category.slug}?subcategory=${child.slug}`}
                                                    className={styles.subMenuLink}
                                                    tabIndex={isOpen ? 0 : -1}
                                                    onClick={() => handleOpenMenu(null)}
                                                >
                                                    {child.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
