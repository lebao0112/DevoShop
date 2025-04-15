export default function Footer() {
    return (
        <footer className="w-full h-auto bg-black text-white text-sm py-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
                {/* Cột 1: Thông tin công ty */}
                <div>
                    <h3 className="font-bold">CÔNG TY TNHH PT & TM DV XNK KIM LONG</h3>
                    <p>Trụ sở chính: 14 Đường số 30, P. Bình Trị Đông B, Q. Bình Tân, Tp. Hồ Chí Minh</p>
                    <p>Điện thoại: 09.2222.8945 | Email: <a href="mailto:xemohinhtinh@gmail.com" className="text-blue-500">xemohinhtinh@gmail.com</a></p>
                    <p>Mã số doanh nghiệp: 0313758440 do Sở Kế Hoạch và Đầu Tư TPHCM Cấp ngày 15/04/2016</p>
                </div>

                {/* Cột 2: Thông tin */}
                <div>
                    <h3 className="font-bold">THÔNG TIN</h3>
                    <ul className="text-blue-500">
                        <li><a href="#">Hướng dẫn đặt hàng</a> | <a href="#">Điều khoản sử dụng</a></li>
                        <li><a href="#">Chính sách bảo mật</a> | <a href="#">Giao hàng - Đổi hàng</a></li>
                        <li><a href="#">Giới thiệu</a> | <a href="#">Đồng ý đặt hàng</a></li>
                    </ul>
                </div>

                {/* Cột 3: Chăm sóc khách hàng */}
                <div>
                    <h3 className="font-bold">CHĂM SÓC KHÁCH HÀNG</h3>
                    <p className="text-red-500 font-bold">HOTLINE: 8888 8888 8888 8888</p>
                    <p>Thứ 2 - CN: từ 9:00 - 21:00</p>
                 
                </div>
            </div>
        </footer>
    );
}