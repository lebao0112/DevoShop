import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import ReactDom from "react-dom";

export default function UpdateProductModal({ isOpen, onClose, onSubmit, product, setProduct }) {
    if (!isOpen) return null;

    return ReactDom.createPortal(
        <div className="relative z-50">
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-white p-6 rounded-lg w-1/3 shadow-xl">
                <button onClick={onClose} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                    <FaTimes />
                </button>
                <h2 className="text-xl font-bold mb-6">Cập nhật sản phẩm</h2>

                {[
                    { id: "name", label: "Tên sản phẩm", value: product.name },
                    { id: "price", label: "Giá bán", value: product.price },
                    { id: "scale", label: "Tỉ lệ", value: product.scale },
                    { id: "stockQuantity", label: "Số lượng", value: product.stockQuantity },
                    { id: "description", label: "Mô tả", value: product.description },
                ].map(({ id, label, value }) => (
                    <div key={id} className="relative w-full mb-4">
                        {id !== "description" ? (
                            <input
                                type="text"
                                id={id}
                                value={value || ""}
                                placeholder=" "
                                className="peer w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setProduct({ ...product, [id]: e.target.value })}
                            />
                        ) : (
                            <textarea
                                id={id}
                                rows="4"
                                value={value || ""}
                                placeholder=" "
                                className="peer w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                onChange={(e) => setProduct({ ...product, [id]: e.target.value })}
                            />
                        )}
                        <label
                            htmlFor={id}
                            className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all bg-white px-1
                            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                            peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            {label}
                        </label>
                    </div>
                ))}

                {/* Select: Brand */}

                <label className="text-sm mb-1 block">Trạng thái</label>
                <select
                    className="w-full border px-3 py-2 mb-4 rounded text-sm"
                    value={product.status || ""}
                    onChange={(e) => setProduct({ ...product, status: e.target.value })}
                >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="DISCONTINUED">DISCONTINUED</option>
                    <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                </select>

                <label className="text-sm mb-1 block">Thương hiệu</label>
                <select
                    className="w-full border px-3 py-2 mb-4 rounded text-sm"
                    value={product.brand?.id || ""}
                    onChange={(e) => setProduct({ ...product, brand: { id: e.target.value } })}
                >
                    <option value="">Chọn thương hiệu</option>
                    <option value="1">Hot Wheels</option>
                    <option value="2">Tomica</option>
                    <option value="3">MiniGT</option>
                    <option value="4">Pop Race</option>
                    <option value="5">Kaido House</option>
                </select>

                {/* Select: Category */}
                <label className="text-sm mb-1 block">Danh mục</label>
                <select
                    className="w-full border px-3 py-2 mb-6 rounded text-sm"
                    value={product.category?.id || ""}
                    onChange={(e) => setProduct({ ...product, category: { id: e.target.value } })}
                >
                    <option value="">Chọn danh mục</option>
                    <option value="1">Ô tô</option>
                    <option value="2">Danh mục 2</option>
                </select>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                        Hủy
                    </button>
                    <button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

UpdateProductModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.any,
        brand: PropTypes.shape({
            id: PropTypes.any,
        }),
        scale: PropTypes.string,
        stockQuantity: PropTypes.any,
        category: PropTypes.shape({
            id: PropTypes.any,
        }),
        status: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    setProduct: PropTypes.func.isRequired,
};
