import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout.jsx";
import Home from "../pages/Home/index.jsx";
import Category from "../pages/Category/index.jsx";
import ArticleDetail from "../pages/ArticleDetail/index.jsx";
import Search from "../pages/Search/index.jsx";
import Saved from "../pages/Saved/index.jsx";
import NotFound from "../pages/NotFound/index.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/category/:slug"
          element={<Category />}
        />

        <Route
          path="/article/:id"
          element={<ArticleDetail />}
        />

        <Route
          path = "search"
          element={<Search />}
        />

        <Route
          path = "saved"
          element={<Saved />}
        />

        <Route
          path = "*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;