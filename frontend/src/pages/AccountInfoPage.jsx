import { useState } from "react";

export default function AccountInfoPage() {
    const [name, setName] = useState("Nguyen Van A");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("********");
    const [email, setEmail] = useState("le*******@gmail.com");
    const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });

    return (
        <div className="flex bg-gray-100 min-h-screen px-6">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <h2 className="mt-3 font-semibold">{name}</h2>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-64 p-2 border rounded-md"
                        />
                    </div>

                    {/* Giới tính */}
                    <div>
                        <label className="block font-medium">Giới tính</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center">
                                <input type="radio" name="gender" value="Nam" onChange={() => setGender("Nam")} />
                                <span className="ml-2">Nam</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="gender" value="Nữ" onChange={() => setGender("Nữ")} />
                                <span className="ml-2">Nữ</span>
                            </label>
                        </div>
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block font-medium">Số điện thoại</label>
                        <input type="text" value={phone} className="w-64 p-2 border rounded-md" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium">Email</label>
                        <div className="flex items-center gap-2">
                            <input type="text" value={email} className="w-64 p-2 border rounded-md" />
                            <button className="text-blue-500 hover:underline">Thay đổi</button>
                        </div>
                    </div>

                    {/* Ngày sinh */}
                    <div>
                        <label className="block font-medium">Ngày sinh</label>
                        <div className="flex gap-2">
                            <select
                                className="p-2 border rounded-md"
                                onChange={(e) => setBirthDate({ ...birthDate, day: e.target.value })}
                            >
                                <option>Ngày</option>
                                {[...Array(31).keys()].map((d) => (
                                    <option key={d + 1} value={d + 1}>
                                        {d + 1}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="p-2 border rounded-md"
                                onChange={(e) => setBirthDate({ ...birthDate, month: e.target.value })}
                            >
                                <option>Tháng</option>
                                {[...Array(12).keys()].map((m) => (
                                    <option key={m + 1} value={m + 1}>
                                        {m + 1}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="p-2 border rounded-md"
                                onChange={(e) => setBirthDate({ ...birthDate, year: e.target.value })}
                            >
                                <option>Năm</option>
                                {[...Array(100).keys()].map((y) => (
                                    <option key={y + 1925} value={y + 1925}>
                                        {y + 1925}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Nút Lưu */}
                    <button className="w-64 bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                        LƯU THAY ĐỔI
                    </button>
                </div>
            </div>
        </div>
    );
}
