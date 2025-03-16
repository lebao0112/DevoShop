import { useContext } from "react";
import UserContext from "../userContext";

export default function AccountInfoPage() {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">Bạn chưa đăng nhập!</div>;
    }

    return (
        <div className="flex bg-gray-100 min-h-screen px-6">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <h2 className="mt-3 font-semibold">{user.name || "Chưa cập nhật"}</h2>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-4">
                        <li className="text-red-500 font-semibold">🔴 Thông tin tài khoản</li>
                        <li className="text-gray-600">📍 Số địa chỉ</li>
                        <li className="text-gray-600">📦 Quản lý đơn hàng</li>
                        <li className="text-gray-600">👀 Sản phẩm đã xem</li>
                        <li className="text-gray-600">🚪 Đăng xuất</li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="w-3/4 bg-white p-8 ml-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold border-b pb-4 mb-6">Thông tin tài khoản</h2>

                <div className="space-y-4">
                    {/* Họ tên */}
                    <div>
                        <label className="block font-medium">Họ Tên</label>
                        <input
                            type="text"
                            value={user.name || ""}
                            className="w-64 p-2 border rounded-md"
                            
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block font-medium">Số điện thoại</label>
                        <input type="text" value={user.phone || ""} className="w-64 p-2 border rounded-md"  />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium">Email</label>
                        <input type="text" value={user.email || ""} className="w-64 p-2 border rounded-md"  />
                    </div>

                    {/* Địa chỉ */}
                    <div>
                        <label className="block font-medium">Địa chỉ</label>
                        <input type="text" value={user.address || "Chưa cập nhật"} className="w-64 p-2 border rounded-md" readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}
