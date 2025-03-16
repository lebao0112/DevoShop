import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import AccountInfoPage from "./pages/AccountInfoPage";
import AdminPage from "./pages/admin/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

export const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/shop", element: <ProductPage /> },
  { path: "/account", element: <AccountInfoPage /> },
];


export const privateRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <h1>Dashboard</h1>
      </ProtectedRoute>
    ),
  },
];

