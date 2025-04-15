import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";
import api from "../config/axiosConfig";
import {FiChevronUp, FiChevronDown} from "react-icons/fi";
// import { Base64 } from "js-base64";

export default function CartPage() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleVNPayCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống");
            return;
        }
        console.log(cartItems);
        // const orderItemsEncoded = Base64.encode(JSON.stringify(cartItems));

        const response = await api.post("/customer/payments/create-payment", {
            orderAmount: totalPrice,
            orderItems: cartItems.map(item => ({
                productId: item.productId,
                imageUrl: item.imageUrl,
                quantity: item.quantity,
                price: item.price
            }))
        });
        // const data = await response.json();
        const data = response.data;
        console.log(data);
        if (data.vnpayUrl) {
            window.location.href = data.vnpayUrl; // chuyển hướng tới cổng VNPAY
        } else {
            alert("Không tạo được thanh toán");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-6 text-gray-800">Giỏ hàng của bạn</h1>

            {cartItems.length === 0 ? (
                <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
                    <img src="src/assets/empty_cart.jpg" alt="empty cart" className="w-48 h-auto" />
                    <p className="text-gray-600 text-lg">Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                    <button
                        className="border border-redPrimary bg-redPrimary hover:bg-white text-white hover:text-redPrimary px-6 py-2 rounded shadow-md transition"
                        onClick={() => navigate("/shop")}
                    >
                        Tiếp tục mua hàng
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        
                        <div
                            key={item.productId}
                            className="flex flex-col md:flex-row justify-between items-center border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
                        >
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24" />
                            <div className="flex-1 mb-2 md:mb-0">
                                <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                                <p className="text-gray-600 text-sm">Đơn giá: {item.price.toLocaleString()}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <p>Số lượng:</p>
                                <span className="text-lg font-medium">{item.quantity}</span>
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        className="rounded text-gray-700 hover:bg-blue-100"
                                    >
                                        <FiChevronUp />
                                    </button>
                                    <button
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="rounded text-gray-700 hover:bg-blue-100 disabled:opacity-50"
                                    >
                                        <FiChevronDown />
                                    </button>
                                </div>
                               
                            </div>

                            <div className="w-28 text-right">
                                <p className="text-gray-800 font-medium">{(item.price * item.quantity).toLocaleString()}</p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="text-red-500 hover:text-red-700 transition ml-2"
                            >
                                Xoá
                            </button>
                        </div>
                    ))}

                    <div className="text-right font-semibold text-2xl text-red-600 border-t pt-4">
                        Tổng tiền: {totalPrice.toLocaleString()}₫
                    </div>
                </div>
            )}

            <div className="text-right mt-4">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
                    onClick={handleVNPayCheckout}
                >
                    Thanh toán bằng VNPAY
                </button>
            </div>
        </div>
    );
}
