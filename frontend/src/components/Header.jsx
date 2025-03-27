import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
export default function Header(){
    return (
      <header className="container mx-auto hidden lg:flex items-center justify-between py-4 px-6">
        
        <div className="flex items-center gap-4">
          <FaMapMarkerAlt className="text-red-500" />
          <span>14 Đường số 30, Bình Trị Đông B, Bình Tân</span>
          <a href="#" className="text-redPrimary">Xem bản đồ</a>
        </div>

        {/* Email và số điện thoại */}
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-redPrimary" />
          <span>devoshop@gmail.com</span>
          <FaPhone className="text-redPrimary" />
          <span>0824.020.564</span>
        </div>
      </header>
    );
}

