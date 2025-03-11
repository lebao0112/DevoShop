import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (user.password !== user.confirmPassword) {
            setError("Mật khẩu xác nhận không trùng khớp!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                email: user.email,
                password: user.password,
                name: user.name
            });

            if (response.status !== 201) {
                setError(response.data.error); 
            } else {
                setSuccess(response.data.message);
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            setError("Đăng ký thất bại! Hãy thử lại." + error);
        }
    };


    return (
        <div>
            <div className="container justify-center">
                <div className="flex justify-center">
                    <div className="w-96">
                        <h1 className="text-2xl font-semibold text-center">Đăng ký</h1>

                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {success && <p className="text-green-500 text-center">{success}</p>}

                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Họ tên</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        value={user.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
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
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Số điện thoại</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="text"
                                        name="phone"
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        value={user.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <span className="cursor-pointer text-sm hover:text-redPrimary" onClick={() => navigate("/login")}>Quay về đăng nhập</span>
                            <div className="my-4">
                                <button
                                    type="submit"
                                    className="w-full bg-redPrimary hover:bg-red-500 text-white py-2 px-3 rounded-md">
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
