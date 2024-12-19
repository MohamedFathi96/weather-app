import { createBrowserRouter } from "react-router";
import HistoryPage from "../pages/HistoryPage";
import FavoritePage from "../pages/FavoritePage";
import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/history", element: <HistoryPage /> },
      { path: "/favorite", element: <FavoritePage /> },
    ],
  },
]);
