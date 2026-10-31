import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <header>
        Header Dân Trí
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        Footer Dân Trí
      </footer>
    </div>
  );
}

export default MainLayout;