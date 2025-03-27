import PropTypes from "prop-types";
import {
    FiDollarSign,
    FiHome,
    FiUsers,
    FiShoppingCart,
    FiLogOut,

} from "react-icons/fi";
import { useState } from "react";
import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";

export default function RouteSelect() {
    const navigate = useNavigate();
    const [selectedRoute, setSelectedRoute] = useState("/admin");
    const handleRouteClick = (path) => {
        setSelectedRoute(path);
        navigate(path);
    }
    return (
        <div className="space-y-1">
            <Route Icon={FiHome} selected={selectedRoute === "/admin"} title="Dashboard" path="/admin" handleRouteClick={handleRouteClick} />
            <Route Icon={FaCar} selected={selectedRoute === "/admin/products"} title="Sản phẩm" path="/admin/products" handleRouteClick={handleRouteClick} />
            <Route Icon={FiUsers} selected={selectedRoute === "/admin/accounts"} title="Tài khoản" path="/admin/accounts" handleRouteClick={handleRouteClick} />
            <Route Icon={FiShoppingCart} selected={selectedRoute === "/admin/orders"} title="Đơn hàng" path="/admin/orders" handleRouteClick={handleRouteClick} />
            <Route Icon={FiDollarSign} selected={false} title="Finance" handleRouteClick={handleRouteClick} />
            <LogoutButton />
        </div>
    );
}

const Route = ({ selected, Icon, title, path, handleRouteClick }) => {
    return (
        <button
            className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected
                ? "bg-white text-stone-950 shadow"
                : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
                }`}
            onClick={() => handleRouteClick(path)}
        >
            <Icon className={selected ? "text-redPrimary" : ""} />
            <span>{title}</span>
        </button>
    );
};

const LogoutButton = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const handleLogout = () => {
        if(window.confirm("Bạn có chắc chắn muốn đăng xuất không?")){
            localStorage.removeItem("authToken");
            setUser(null);
            navigate("/");
        }
    }
    return (
        <button
            className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
            onClick={handleLogout}
        >
            <FiLogOut className="text-redPrimary" />
            <span>Đăng xuất</span>
        </button>
    );
}

Route.propTypes = {
    selected: PropTypes.bool.isRequired,
    Icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    handleRouteClick: PropTypes.func.isRequired,
};
