import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
    const navigate = useNavigate();

    return (
        

        <div>
            <div className="container justify-center">
                <div className="flex justify-center">
                    <div className="w-96">
                        <h1 className="text-2xl font-semibold text-center">Đăng ký</h1>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Họ tên</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="text"
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="email"
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
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="password"
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Só điện thoại</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="number"
                                        className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>                           
                            </div>
                            <span className="cursor-pointer text-sm hover:text-redPrimary" onClick={() => navigate("/login")}>Quay về đăng nhập</span>
                            <div className="my-4">
                                <button className="w-full bg-redPrimary text-white py-2 px-3 rounded-md">Xác nhận</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}