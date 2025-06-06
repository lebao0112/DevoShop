import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GrNotification } from "react-icons/gr";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import UserContext from "../contexts/userContext";
import { useCart } from "../contexts/cartContext";

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, loading, setUser } = useContext(UserContext);
    const { cartItems } = useCart();
   
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
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }



    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Xóa token
        setUser(null); // Cập nhật trạng thái user
        navigate("/login"); // Chuyển hướng về trang đăng nhập
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">

                <div className="md:flex md:w-3/12 lg:hidden">
                    <FiMenu className="text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
                </div>

                <div className="lg:w-3/12 md:w-6/12 flex justify-center ">
                    <img
                        src="/logo.jpg"
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

                    <div className="flex space-x-4  text-xl justify-end ml-auto items-center w-3/12">
                        <div className="items-center">
                            <GrNotification className="cursor-pointer" />
                        </div>
                        <div className="relative items-center" onClick={() => navigate("/cart")}>
                            <FiShoppingCart className="cursor-pointer text-2xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-redPrimary text-white text-xs px-1.5 py-0.5 rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>

                        <div className="hidden lg:flex space-x-4 ">
                            <div className="relative search-dropdown flex items-center">
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
                            <div className="relative profile-dropdown" onClick={() => setIsOpen(!isOpen)}>
                                <div className="flex items-center gap-2">
                                    <CgProfile
                                        className="cursor-pointer"
                                        
                                    />
                                    <span className="text-sm cursor-pointer hover:text-redPrimary">{user ? user.name || "Tài khoản" : "Tài khoản"}</span>
                                    
                                </div>
                               
                                {isOpen && (
                                    <div className="border-3 border-redPrimary absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white shadow-lg">
                                        <ul className="text-gray-700">
                                            {user ? (
                                                <>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-sm"
                                                        onClick={() => navigate("/account")}
                                                    >
                                                        Tài khoản
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-sm"
                                                        onClick={handleLogout}
                                                    >
                                                        Đăng xuất
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-sm"
                                                        onClick={() => navigate("/login")}
                                                    >
                                                        Đăng nhập
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-sm"
                                                        onClick={() => navigate("/signup")}
                                                    >
                                                        Đăng ký
                                                    </li>
                                                </>
                                            )}
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
                                {user ? user.name || "Tài khoản" : "Tài khoản"}
                            </span>                            
                            <IoMdClose className="text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
                        </div>
                        <ul>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer" onClick={() =>{
                                    setIsSidebarOpen(false);
                                    navigate("/");
                                }}>
                               
                                Home
                            </li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer" onClick={() =>{
                                    setIsSidebarOpen(false);
                                    navigate("/shop");
                                }}>
                               
                                Shop
                                
                            </li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer" onClick={() =>{
                                    setIsSidebarOpen(false);
                                    navigate("/oto");
                                }}>
                               
                                Ô Tô
                            </li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer" onClick={() =>{
                                    setIsSidebarOpen(false);
                                    navigate("/moto");
                                }}>
                               
                                Mô Tô
                            </li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer" onClick={() =>{
                                    setIsSidebarOpen(false);
                                    navigate("/blog");
                                }}>
                               
                                Blog
                            </li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer" onClick={() =>{
                                    setIsSidebarOpen(false);
                                    navigate("/huongdan");
                                }}>
                               
                                Hướng dẫn
                            </li>
                            <li className="py-4 px-6 hover:bg-gray-200 hover:text-red-500 whitespace-nowrap cursor-pointer" onClick={() =>{
                                    setIsSidebarOpen(false);
                                    navigate("/lienhe");
                                }}>
                               
                                Liên hệ
                            </li>
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
