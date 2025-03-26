import ProductCard from "../components/ProductCard";

const products = [
    {
        id: 1,
        name: "XE MÔ HÌNH BENTLEY CONTINENTAL GT 1:18 WELLY-FX",
        price: "1,179,000₫",
        stock: "Còn 1 sản phẩm",
        img: "https://pagedone.io/asset/uploads/1688031162.jpg",
    },
    {
        id: 2,
        name: "XE MÔ HÌNH PORSCHE 911 GT3 CUP 1:18 WELLY (TRẮNG)",
        price: "1,499,000₫",
        stock: "Hết hàng",
        img: "https://product.hstatic.net/1000288177/product/20201124_093724_4ac22f2c9e08459f8e9ec4303287b799_grande.jpg",
    },
    {
        id: 3,
        name: "XE MÔ HÌNH FERRARI CALIFORNIA T SPIDER 1:18 BBURAGO (ĐỎ)",
        price: "Liên hệ",
        stock: "Còn 1 sản phẩm",
        img: "https://product.hstatic.net/1000288177/product/20201124_093724_4ac22f2c9e08459f8e9ec4303287b799_grande.jpg",
    },
    {
        id: 4,
        name: "XE MÔ HÌNH AUDI R8 V10 1:18 WELLY (ĐỎ)",
        price: "950,000₫",
        stock: "Hết hàng",
        img: "https://product.hstatic.net/1000288177/product/20201124_093724_4ac22f2c9e08459f8e9ec4303287b799_grande.jpg",
    },
    {
        id: 5,
        name: "XE MÔ HÌNH AUDI R8 V10 1:18 WELLY (ĐỎ)",
        price: "950,000₫",
        stock: "Hết hàng",
        img: "https://product.hstatic.net/1000288177/product/20201124_093724_4ac22f2c9e08459f8e9ec4303287b799_grande.jpg",
    }
];

export default function ProductPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sidebar - Bộ lọc */}
                <div className="w-full md:w-3/12 bg-white p-4 shadow-md border">
                    <h2 className="text-lg font-semibold mb-4">Lọc Sản Phẩm</h2>
                    <div>
                        <h3 className="font-medium">Loại Sản Phẩm</h3>

                        <div className="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium">Default checkbox</label>
                        </div>
                        <div className="flex items-center">
                            <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium">Checked state</label>
                        </div>

                        
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="flex-row md:w-9/12">
                    <h2>Tất cả sản phẩm</h2>
                    <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border">
                        {products.map((product) => (
                            // eslint-disable-next-line react/jsx-key
                            <ProductCard
                                image={product.img}
                                name={product.name}
                                price={product.price}
                                stock={product.stock}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
