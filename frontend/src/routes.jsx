import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import SignUpPage from "./pages/SignUpPage";
import AccountInfoPage from "./pages/AccountInfoPage";
import GeneralPage from "./pages/admin/GeneralPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import AccountManagementPage from "./pages/admin/AccountManagementPage";

export const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/account", element: <AccountInfoPage /> },
];


export const privateRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <GeneralPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "products",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <ProductManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "accounts",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <AccountManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "orders",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <h1>Đơn hàng</h1>
      </ProtectedRoute>
    ),
  },
];

