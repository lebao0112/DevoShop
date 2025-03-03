import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
export default function LoginPage() {
   const navigate = useNavigate();

    return (
        <div>
            <div className="container justify-center">
                <div className="flex justify-center">
                    <div className="w-96">
                        <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>
                        <form>
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
                                <button className="w-full bg-redPrimary hover:bg-red-500 text-white py-2 px-3 rounded-md">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}