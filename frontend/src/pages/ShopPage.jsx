import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import api from "../config/axiosConfig";
import ProductFilter from "../components/ProductFilter";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0); // Trang hiện tại (0-based)
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    const fetchProducts = async () => {
        try{
            const response = await api.get(`http://localhost:8080/api/customer/shop/all?page=${page}&size=4`);
            if(response.status !== 200){
                alert("Lỗi khi tải sản phẩm");
                return;
            }
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalProducts(response.data.totalElements);
        }catch(error){
            alert(`Lỗi khi tải sản phẩm: ${error.response.data.message}`);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sidebar - Bộ lọc */}
                <ProductFilter />

                {/* Danh sách sản phẩm */}
                <div className="flex flex-col md:w-10/12">
                    <div className="flex items-center mb-4">
                        <h2 className="text-lg font-semibold mb-2">Tất cả sản phẩm</h2>
                        <div className="flex items-center mb-2 mx-2 font-bold">|</div>
                        <span className="text-sm mb-2">Hiện có {totalProducts} sản phẩm</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                image={product.imageUrl} // bạn có thể sửa nếu API trả về hình
                                name={product.name}
                                price={product.price}
                                stock={`Còn ${product.stockQuantity} sản phẩm`}
                                brand={product.brand.brandName}
                                scale={product.scale}
                            />
                        ))}
                    </div>

                    {/* Phân trang */}
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 0}
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-redPrimary hover:text-white"
                        >
                            <FiChevronLeft />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                className={`px-3 py-1 border rounded ${page === i ? "bg-redPrimary text-white" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages - 1}
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-redPrimary hover:text-white"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
