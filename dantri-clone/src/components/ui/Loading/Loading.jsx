import styles from "./Loading.module.css";

function Loading({message = "Đang tải tin tức..."}){
    return(
        <div className={styles.loading} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden="true"/>
            <span className={styles.message}>{message}</span>
        </div>
    );
}

export default Loading;