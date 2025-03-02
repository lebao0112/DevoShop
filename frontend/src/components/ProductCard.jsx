import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";

export default function ProductCard({image, name, price, stock, brand, scale }) {
    return (
        <div className=" overflow-hidden w-full relative shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 p-4">
            <img src={image} alt={name} className="w-full h-auto relative z-0 rounded-lg" />
            <h3 className="mt-4 text-sm font-semibold">{name}</h3>
            <p className="mt-2 text-xs text-gray-500">{stock}</p>
            <p className="mt-2 text-red-600 font-bold">{price}</p>
            <p className="mt-2 italic">Hãng: {brand}</p>
            <p className="mt-2 italic">Tỉ lệ: {scale}</p>

            {/* Add to Cart Button */}
            <button className="mt-4 flex items-center justify-center text-white gap-2 w-full bg-redPrimary py-2 rounded-md hover:bg-red-700">
                <FaShoppingCart /> Thêm vào giỏ
            </button>
        </div>
    );
}

ProductCard.propTypes = {
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
