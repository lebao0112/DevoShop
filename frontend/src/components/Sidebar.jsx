import{ useState } from "react";

export default function Sidebar(){
    const [categories] = useState([
      "Mô hình Ô Tô",
      "Hãng sản xuất",
      "Hãng xe",
      "Mô hình Mô Tô",
      "Xe điều khiển",
      "Figure",
      "Mô hình Công Trình Quân Sự",
      "Pre-Order",
      "Khuyến mãi",
    ]);
    
    return (
      <aside className="w-1/4 bg-gray-100 pr-2">
        <h2 className="text-lg font-bold mb-4 bg-redPrimary text-white p-2">DANH MỤC SẢN PHẨM</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="py-2 border-b">
              <a href="#" className="hover:text-blue-500">
                {category}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    );
}

