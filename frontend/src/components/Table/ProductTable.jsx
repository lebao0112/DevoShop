import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import api from "../../config/axiosConfig";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import AddProductModal from "../Modal/AddProductModal";
import UpdateProductModal from "../Modal/UpdateProductModal";

export default function ProductTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [productToUpdate, setProductToUpdate] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        category: { id: "" },  
        brand: { id: "" },     
        status: "",           
        stockQuantity: "",
        description: "",
        scale: "",
        image_file: "",
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
            const formData = new FormData();
            formData.append("image", newProduct.image_file);
            formData.append("name", newProduct.name);
            formData.append("description", newProduct.description);
            formData.append("price", newProduct.price);
            formData.append("stockQuantity", newProduct.stockQuantity);
            formData.append("brand", newProduct.brand.id);
            formData.append("scale", newProduct.scale);
            formData.append("category", newProduct.category.id);
            formData.append("status", newProduct.status);

            const response = await api.post("/admin/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                setProducts([...products, response.data]);
                alert("Thêm sản phẩm thành công");
                fetchProducts();
                console.log(response.data);
                setIsAddModalOpen(false);
            } else {
                console.log(response.data);
                alert("Thêm sản phẩm thất bại");
            }
        } catch (error) {
            console.log(error);
            alert("Thêm sản phẩm thất bại");
        }
    };

    const handleUpdateProduct = async () => {
        try{
            const response = await api.put(`/admin/products/${productToUpdate.id}`, productToUpdate);
            if (response.status === 200) {
                setProducts(products.map(product => product.id === productToUpdate.id ? response.data : product));
                alert("Cập nhật sản phẩm thành công");
                fetchProducts();
                setIsUpdateModalOpen(false);
            } else {
                console.log(response.data);
                alert("Cập nhật sản phẩm thất bại");
            }
        } catch (error) {
            console.log(error);
            alert("Cập nhật sản phẩm thất bại");
        }
    }


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
                    <button className='border border-blue-500 rounded-md p-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300'
                            onClick={() => setIsAddModalOpen(true)}>
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
                                            <FiEdit size={20} 
                                                onClick={() => {
                                                    setIsUpdateModalOpen(true);
                                                    setProductToUpdate(product);
                                                }}/>
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
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddProduct={handleAddProduct}
                newProduct={newProduct}
                setNewProduct={setNewProduct}
            />

            <UpdateProductModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSubmit={handleUpdateProduct}
                product={productToUpdate} 
                setProduct={setProductToUpdate} 
            />
        </div>
    );
}
