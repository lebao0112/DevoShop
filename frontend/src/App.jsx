import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { publicRoutes, privateRoutes } from "./routes";
import {UserProvider} from "./contexts/userContext";
import AdminLayout from "./layouts/AdminLayout";


export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Pubic Routes */}
          <Route path="/" element={<MainLayout />}>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
          {/* Private Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </Router>
    </UserProvider>
    
  );
}