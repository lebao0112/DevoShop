import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useState, useContext} from "react";
import { jwtDecode } from "jwt-decode";
import UserContext from "../userContext";

import axios from "axios";

export default function LoginPage() {
    const navigate = useNavigate();
    const { fetchUser } = useContext(UserContext); // Lấy setUser và fetchUser từ context

    const [user, setUserState] = useState({
        email: "",
        password: "",
    });

    

    const handleChange = (e) => {
        setUserState({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        

        if (user.password === "" || user.email === "") {
           
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", user);
            if (response.status === 200 && response.data.token) {
                const token = response.data.token;
                localStorage.setItem("authToken", token);
                
                const decoded = jwtDecode(token);
                const userRole = decoded.role;

                await fetchUser(); 
      
                if (userRole === "ROLE_ADMIN") {
                    navigate("/admin");
                } else if (userRole === "ROLE_CUSTOMER") {
                    navigate("/");
                }
            } else {
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        } catch (error) {
            alert("Sai tài khoản hoặc mật khẩu!");
            console.log(error);
        }
    };

    return (
        <div>
            <div className="container justify-center">
                <div className="flex justify-center">
                    <div className="w-96">
                        <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>

                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Mật khẩu</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <button type="submit" className="w-full bg-redPrimary hover:bg-red-500 text-white py-2 px-3 rounded-md">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}