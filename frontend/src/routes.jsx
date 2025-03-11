import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import AccountInfoPage from "./pages/AccountInfoPage";


const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/shop", element: <ProductPage /> },
  { path: "/account", element: <AccountInfoPage /> },
];

export default routes;
