import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import CategoryPage from "../pages/Category/CategoryPage";
import ArticleDetailPage from "../pages/ArticleDetail/ArticleDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/category/:slug"
          element={<CategoryPage />}
        />

        <Route
          path="/article/:id"
          element={<ArticleDetailPage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;