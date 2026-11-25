import styles from "./Advertisement.module.css"

function Advertisement({title= "QUẢNG CÁO", variant="featured"}){
    return(
        <aside className={`${styles.advertisement} ${styles[variant]}`}>
            <span className={styles.label}>{title}</span>
            <div className={styles.placeholder}>
                <span>Advertisement</span>
            </div>
        </aside>
    );
}

export default Advertisement;
