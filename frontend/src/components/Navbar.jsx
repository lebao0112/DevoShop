import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-dropdown")) {
                setIsOpen(false);
            }
            if (!event.target.closest(".search-dropdown")) {
                setIsOpenSearch(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">

                <div className="md:flex md:w-3/12 lg:hidden">
                    <FiMenu className="text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
                </div>

                <div className="lg:w-3/12 md:w-6/12 flex justify-center ">
                    <img
                        src="src/assets/logo.png"
                        alt="Logo"
                        className="h-10 cursor-pointer "
                        onClick={() => navigate("/")}
                    />
                </div>

                <div className="lg:w-9/12 md:w-3/12 flex">
                    <ul className="hidden lg:flex space-x-8 font-medium w-9/12 justify-center">
                        <li><Link to="/shop" className="hover:text-red-500 whitespace-nowrap">SHOP</Link></li>
                        <li><Link to="/oto" className="hover:text-red-500 whitespace-nowrap">Ô TÔ</Link></li>
                        <li><Link to="/moto" className="hover:text-red-500 whitespace-nowrap">MÔ TÔ</Link></li>
                        <li><Link to="/blog" className="hover:text-red-500 whitespace-nowrap">BLOG</Link></li>
                        <li><Link to="/huongdan" className="hover:text-red-500 whitespace-nowrap">HƯỚNG DẪN</Link></li>
                        <li><Link to="/lienhe" className="hover:text-red-500 whitespace-nowrap">LIÊN HỆ</Link></li>
                    </ul>

                    <div className="flex space-x-4 text-xl justify-end ml-auto items-center w-3/12">
                        <div className=" items-center">
                            <FiShoppingCart className="cursor-pointer" />
                        </div>

                        <div className="hidden lg:flex space-x-4 ">
                            <div className="relative search-dropdown">
                                <FiSearch className="cursor-pointer" onClick={() => setIsOpenSearch(!isOpenSearch)} />
                                {isOpenSearch && (
                                    <form action="">
                                        <div className="flex absolute left-1/2 -translate-x-1/2 mt-2 w-60 bg-white shadow-lg rounded-lg border border-gray-300">
                                            <input type="text" className="rounded-l-md p-2 text-sm" />
                                            <button className="bg-redPrimary hover:bg-red-500 text-white text-sm rounded-r-md p-2 whitespace-nowrap">Tìm kiếm</button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="relative  profile-dropdown">
                                <CgProfile
                                    className="cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                                {isOpen && (
                                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white shadow-lg rounded-lg">
                                        <ul className="text-gray-700">
                                            <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-sm" onClick={() => navigate("/login")}>Đăng nhập</li>
                                            <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-sm" onClick={() => navigate("/signup")}>Đăng ký</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isSidebarOpen && (
                <div>
                    <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
                    <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg lg:hidden tra p-4">
                        <div className="flex justify-between items-center p-4">
                            <span className="text-lg font-medium text-gray-700 truncate overflow-hidden whitespace-nowrap max-w-[200px] cursor-pointer">
                                Lê Dương Chí Bảo
                            </span>                            
                            <IoMdClose className="text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
                        </div>
                        <ul>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer">Home</li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer">Shop</li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer">Ô Tô</li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer">Mô Tô</li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer">Blog</li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer">Hướng dẫn</li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer">Liên hệ</li>
                        </ul>

                        <form action="">
                            <div className="flex w-full bg-white shadow-lg rounded-lg border border-gray-300">
                                <input type="text" className="rounded-l-md p-2 text-sm w-full" />
                                <button className="bg-redPrimary hover:bg-red-500 text-white text-sm rounded-r-md p-2 whitespace-nowrap">
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
}
