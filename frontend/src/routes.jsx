import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import AccountInfoPage from "./pages/AccountInfoPage";
import GeneralPage from "./pages/admin/GeneralPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
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
];

