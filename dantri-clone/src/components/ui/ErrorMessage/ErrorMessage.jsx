import styles from "./Loading.module.css";

function ErrorMessage({message = "Đã xảy ra lỗi khi tải dữ liệu."}){
    return(
      <div className={styles.error} role="alert">{message}</div>
    );
}

export default ErrorMessage;