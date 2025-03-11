import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import Toast from "../components/Toast";


import axios from "axios";

export default function LoginPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [toast, setToast] = useState(null); 


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setToast(null);
       

        if (user.password === "" || user.email === "") {
            setToast({ message: "Vui lòng nhập đầy đủ thông tin!", type: "error" });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", user);
            if (response.status === 200 && response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                setToast({ message: "Đăng nhập thành công!", type: "success" });

                setTimeout(() => navigate("/"), 1500);
            } else {
                setToast({ message: response.data.message || "Đăng nhập thất bại!", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Sai tài khoản hoặc mật khẩu!", type: "error" });
            console.log(error);
        }
    };

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
                            <div className="mb-4 flex justify-between items-center">
                                <div className="flex">
                                    <input type="checkbox" className="mr-2 bg-gray" />
                                    <label className="text-sm text-gray-600">Lưu đăng nhập</label>
                                </div>
                                <div>
                                    <span href="#" className="text-sm hover:text-redPrimary mr-2 cursor-pointer" onClick={() => navigate("/reset-password")}>Quên mật khẩu?</span>
                                    <span href="#" className="text-sm hover:text-redPrimary cursor-pointer" onClick={() => navigate("/signup")}>Đăng ký</span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <button type="submit" className="w-full bg-redPrimary hover:bg-red-500 text-white py-2 px-3 rounded-md">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}