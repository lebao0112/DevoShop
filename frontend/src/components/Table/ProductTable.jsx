import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import api from "../../config/axiosConfig";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
export default function ProductTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        category: { id: "" },  
        brand: { id: "" },     
        status: "",           
        stockQuantity: "",
        description: "",
        scale: "",
    });
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = products.filter(
            (product) => product.name.toLowerCase().includes(term) || product.email.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin/products");
            if (response.status === 200) {
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleAddProduct = async () => {
        try {
            const response = await api.post("/admin/products", newProduct);
            if (response.status === 200) {
                setProducts([...products, response.data]);
                alert("Thêm sản phẩm thành công");
                setIsModalOpen(false);
            } else {
                console.log(response.data);
                alert("Thêm sản phẩm thất bại");
            }
        } catch (error) {
            console.log(error);
            alert("Thêm sản phẩm thất bại");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    const handleDeleteProduct = async (id) => {
        if(window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này không? id = ${id}`)){
            try {
                const response = await api.delete(`/admin/products/${id}`);
                if (response.status === 204) {
                    alert("Xóa sản phẩm thành công");
                    fetchProducts();
                }else{
                    alert("Xóa sản phẩm thất bại");
                }
            } catch (error) {
                console.log(error);
                alert("Xóa sản phẩm thất bại");
            }
        }
    }

    return (
        <div
            className='bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6'
        >
            <div className='flex justify-between items-center mb-6'>
                <div className="flex items-center gap-4">
                    <h2 className='text-xl font-semibold'>Sản phẩm</h2>
                    <button className='border border-blue-500 rounded-md p-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300' onClick={() => setIsModalOpen(true)}>
                        <FiPlus size={20} />
                    </button>
                </div>

                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Nhập tên hoặc mã SP...'
                        className='w-100 border border-stone-300 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Mã sản phẩm
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Tên sản phẩm
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Loại
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Giá bán
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Trạng thái
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Số lượng
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Hành động
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-700'>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr
                                    key={product.id}
                                >
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='ml-4'>
                                                <div className='text-sm font-medium'>{product.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='text-sm font-medium'>{product.name}</div>
                                        </div>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm'>{product.category.name}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold'>
                                            {formatPrice(product.price)}
                                        </span>
                                    </td>

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === "AVAILABLE"
                                                ? "bg-green-800 text-green-100"
                                                : "bg-red-800 text-red-100"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <span className='px-2 inline-flex '>
                                            {product.stockQuantity}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                        <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
                                            <FiEdit size={20} />
                                        </button>
                                        <button className='text-red-400 hover:text-red-300' onClick={() => handleDeleteProduct(product.id)}>
                                            <FiTrash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex">
                    
                    <div className="bg-white p-6 rounded-lg w-full relative shadow-lg z-50">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-red-300 hover:text-red-500">
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Thêm khóa học mới</h2>
                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Giá bán"
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <select
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.brand.id}
                            onChange={(e) => setNewProduct({ ...newProduct, brand: { id: e.target.value } })}
                        >
                            <option value="">Chọn thương hiệu</option>
                            {/* Lặp qua danh sách thương hiệu */}
                            <option value="1">Hot Wheels</option>
                            
                        </select>
                        <input
                            type="text"
                            placeholder="Tỉ lệ"
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.scale}
                            onChange={(e) => setNewProduct({ ...newProduct, scale: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Số lượng"
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.stockQuantity}
                            onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                        />
                        <select
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.category.id}
                            onChange={(e) => setNewProduct({ ...newProduct, category: { id: e.target.value } })}
                        >
                            <option value="">Chọn danh mục</option>
                            {/* Lặp qua danh sách danh mục */}
                            <option value="1">Danh mục 1</option>
                            <option value="2">Danh mục 2</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Trạng thái"
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.status}
                            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Mô tả"
                            className="w-full border p-2 mb-4 rounded"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                                Hủy
                            </button>
                            <button onClick={handleAddProduct} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
                
            )}
        </div>
    );
}
