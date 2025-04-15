import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axiosConfig";
import { useCart } from "../contexts/cartContext";

export default function ProductDetailPage() {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const { addToCart } = useCart();
    
    const fetchProduct = async () => {
        try {
            const response = await api.get(`/shop/get-product?id=${id}`);
            if (response.status !== 200) {
                alert("Lỗi khi tải sản phẩm");
                return;
            }
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const increaseQuantity = () => {
        if (quantity < product.stockQuantity) setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }
    return (
        <div className="container mx-auto flex flex-col lg:flex-row gap-4 ">
            {/* Ảnh sản phẩm */}
            <div className="w-full bg-white lg:w-1/2 flex flex-col items-center rounded-lg">
                <div className="overflow-hidden group relative ">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="rounded w-full h-100 object-contain shadow-md transition-transform duration-300 group-hover:scale-110 p-4"
                    />
                </div>

                {/* Thumbnails nếu cần */}
                <div className="mt-4">
                    <img
                        src={product.imageUrl}
                        className="w-16 h-16 border-2 border-blue-500"
                    />
                </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="w-full lg:w-1/2 space-y-4 rounded-lg p-4 bg-white">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-red-600 text-xl font-semibold">
                    {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </p>
                <p>Tỉ lệ: {product.scale}</p>
                <p>Hãng: {product.brand.brandName}</p>
                <p className="text-gray-500 text-sm">
                    Còn lại: {product.stockQuantity} sản phẩm
                </p>

                {/* Thanh tăng giảm */}
                <div className="flex items-center space-x-4 mt-4">
                    <button
                        onClick={decreaseQuantity}
                        className="px-3 py-1 text-xl border rounded"
                    >
                        −
                    </button>
                    <span className="text-lg">{quantity}</span>
                    <button
                        onClick={increaseQuantity}
                        className="px-3 py-1 text-xl border rounded"
                    >
                        +
                    </button>
                </div>

                {/* Nút hành động */}
                <div className="flex space-x-4 mt-6">
                    <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                        onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity })}
                    >
                        Cho vào giỏ hàng
                    </button>
                    <button className="bg-redPrimary text-white px-6 py-2 rounded hover:bg-red-600">
                        Mua ngay
                    </button>
                </div>
                <div className="grid grid-cols-2 justify-between mt-6 border-b border-gray-200">
                    <button
                        className={`pb-2 px-4 font-medium ${activeTab === "description" ? "border-b-2 border-redPrimary" : "text-gray-500"}`}
                        onClick={() => setActiveTab("description")}
                    >
                        Mô tả sản phẩm
                    </button>
                    <button
                        className={`pb-2 px-4 font-medium ${activeTab === "review" ? "border-b-2 border-redPrimary" : "text-gray-500"}`}
                        onClick={() => setActiveTab("review")}
                    >
                        Đánh giá sản phẩm
                    </button>
                </div>
                <div className="mt-4 text-gray-700">
                    {activeTab === "description" && (
                        <div>
                            <h4 className="font-semibold mb-2">Chi tiết mô tả:</h4>
                            <p>{product.description || "Chưa có mô tả cho sản phẩm này."}</p>
                        </div>
                    )}
                    {activeTab === "review" && (
                        <div>
                            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
