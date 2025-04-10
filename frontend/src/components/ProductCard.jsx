import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({id, image, name, price, stock, brand, scale }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    return (
        <div className=" overflow-hidden w-full relative shadow-none transition-shadow duration-300 cursor-pointer border-1 border-gray-300 hover:border-redPrimary p-4">
            <img
                src={image}
                alt={name}
                className="object-cover relative z-0 rounded-lg"
            />
            <h3 className="mt-4 text-sm font-semibold">{name}</h3>
            <p className="mt-2 text-xs text-gray-500">{stock}</p>
            <p className="mt-2 text-red-600 font-bold">{price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
            <p className="mt-2 text-sm italic">Hãng: {brand}</p>
            <p className="mt-2 text-sm italic">Tỉ lệ: {scale}</p>

           
            <div className="flex mt-4">
                <button className="mt-4 flex items-center justify-center text-black gap-2 w-1/2 bg-stone-300 py-2 rounded-l-md hover:bg-stone-400 hover:text-stone-300 text-sm"
                    onClick={() => navigate(`/products/${id}`)}
                >
                    Chi tiết
                </button>
                <button className="mt-4 flex items-center justify-center text-white gap-2 w-full bg-redPrimary py-2 rounded-r-md hover:bg-red-700"
                    onClick={() => addToCart({ id: id, name: name, price: price, image: image })}
                >
                    <FaShoppingCart /> Thêm vào giỏ
                </button>
            </div>
            
        </div>
    );
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    priceExVat: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    scale: PropTypes.string.isRequired,
};
