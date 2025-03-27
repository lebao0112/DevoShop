import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginGoogleSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
       
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("authToken", token);

            window.location.href = "/";
        } else {
            navigate("/login");
        }
    }, []);

    return <p>Đang đăng nhập...</p>;
}
