import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import UserContext from "../contexts/userContext";

export default function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const { fetchUser } = useContext(UserContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("authToken", token);
            const decoded = jwtDecode(token);

            fetchUser().then(() => {
                if (decoded.role === "ROLE_ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/login");
        }
    }, []);

    return <p className="text-center mt-10">Đang xử lý đăng nhập Google...</p>;
}
