import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import ReactDom from "react-dom";

export default function AddProductModal({ isOpen, onClose, onAddProduct, newProduct, setNewProduct }) {
    if (!isOpen) return null;

    return ReactDom.createPortal(
        <div className="relative z-50">
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-white p-6 rounded-lg w-1/3 shadow-xl">
                <button onClick={onClose} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                    <FaTimes />
                </button>
                <h2 className="text-xl font-bold mb-6">Thêm sản phẩm mới</h2>

                {/* Floating Label Input */}
                <div className="relative w-full mb-4">
                    <input
                        type="text"
                        id="name"
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <label
                        htmlFor="name"
                        className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all bg-white px-1
                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-500"
                    >
                        Tên sản phẩm
                    </label>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-full mb-4">
                        <input
                            type="number"
                            id="price"
                            placeholder=" "
                            className="peer w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <label
                            htmlFor="price"
                            className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all bg-white px-1
                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Giá bán
                        </label>
                    </div>
                    <div className="relative w-full mb-4">
                        <label className="text-sm block">Ảnh sản phẩm</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, image_file: e.target.files[0] })
                            }
                            className="block w-full text-sm border border-gray-300 rounded p-2"
                        />
                    </div>
                </div>
               

                <label className="text-sm mb-1 block">Thương hiệu</label>
                <select
                    className="w-full border px-3 py-2 mb-4 rounded text-sm"
                    onChange={(e) => setNewProduct({ ...newProduct, brand: { id: e.target.value } })}
                >
                    <option value="">Chọn thương hiệu</option>
                    <option value="1">Hot Wheels</option>
                </select>

                <div className="flex gap-4">
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            id="scale"
                            placeholder=" "
                            className="peer w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setNewProduct({ ...newProduct, scale: e.target.value })}
                        />
                        <label
                            htmlFor="scale"
                            className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all bg-white px-1
                            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                            peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Tỉ lệ
                        </label>
                    </div>
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            id="stockQuantity"
                            placeholder=" "
                            className="peer w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                        />
                        <label
                            htmlFor="stockQuantity"
                            className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all bg-white px-1
                            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                            peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Số lượng
                        </label>
                    </div>
                </div>

                <label className="text-sm mb-1 block">Danh mục</label>
                <select
                    className="w-full border px-3 py-2 mb-4 rounded text-sm"
                    onChange={(e) => setNewProduct({ ...newProduct, category: { id: e.target.value } })}
                >
                    <option value="">Chọn danh mục</option>
                    <option value="1">ô tô</option>
                    <option value="2">Danh mục 2</option>
                </select>

                <label className="text-sm mb-1 block">Trạng thái</label>

                <select className="w-full border px-3 py-2 mb-4 rounded text-sm"
                   
                    onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}>
                    <option value="">Chọn trạng thái</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="DISCONTINUED">DISCONTINUED</option>
                    <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                </select>



                <div className="relative w-full mb-6">
                    <textarea
                        id="description"
                        rows="4"
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded-md pt-6 pb-2 px-3 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    ></textarea>
                    <label
                        htmlFor="description"
                        className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all bg-white px-1
                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-500"
                    >
                        Mô tả
                    </label>
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                        Hủy
                    </button>
                    <button onClick={onAddProduct} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

AddProductModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddProduct: PropTypes.func.isRequired,
    newProduct: PropTypes.shape({
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
    setNewProduct: PropTypes.func.isRequired,
};
