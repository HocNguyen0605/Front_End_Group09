import { Outlet } from "react-router-dom";
import Header from "./Header/index.js";
import Footer from "./Footer/index.js";
import styles from "./MainLayout.module.css";

function MainLayout(){
    return(
        <div className ={ styles.layout }>
            <Header />
            <main className={ styles.main }>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;