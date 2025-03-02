import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";

const products = [
    {
        id: 1,
        name: "XE MÔ HÌNH BENTLEY CONTINENTAL GT 1:18 WELLY-FX",
        price: "1,179,000₫",
        stock: "Còn 1 sản phẩm",
        img: "https://product.hstatic.net/1000288177/product/20201124_093724_4ac22f2c9e08459f8e9ec4303287b799_grande.jpg",
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

export default function ProductCarousel() {
    return (
        <div className="container">
            <div className="flex justify-between items-center my-4">
                <h2 className="font-bold text-lg">DEAL GIÁ SỐC</h2>
                <div className="flex">
                    <button className="button-prev border bg-white hover:bg-redPrimary hover:text-white px-4 py-1 mr-2">
                        <FaChevronLeft className="text-lg" />
                    </button>
                    <button className="button-next border bg-white hover:bg-redPrimary hover:text-white px-4 py-1">
                        <FaChevronRight className="text-lg" />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={4}
                navigation={{
                    nextEl: ".button-next",
                    prevEl: ".button-prev",
                }}
                pagination={{ 
                    el: ".swiper-pagination", 
                    clickable: true 
                }}
                loop={false}
                breakpoints={{
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 3 },
                    640: { slidesPerView: 2 },
                    480: { slidesPerView: 1 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide 
                        key={product.id} 
                        className="shadow-md"
                    >
                        <ProductCard
                            image={product.img}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                        />
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination"></div>
            </Swiper>
        </div>
    );
}
