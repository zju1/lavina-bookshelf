import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "../../features/auth/Auth";
import { BooksPage } from "../../features/books/BooksPage";
import { AuthGuard } from "../guard/AuthGuard";

export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <BooksPage />
      </AuthGuard>
    ),
  },
]);
