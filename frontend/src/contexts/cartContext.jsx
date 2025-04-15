// context/cartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import api from "../config/axiosConfig";


const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // 🟡 Load cart từ session backend khi component mount
    useEffect(() => {
        api.get("/customer/cart")
            .then((res) => setCartItems(res.data))
            .catch(() => setCartItems([]));
    }, []);

    const addToCart = async (product) => {
        const response = await api.post("/customer/cart/add", {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
        });

        if(response.status !== 200) {
            alert("Lỗi khi thêm sản phẩm vào giỏ hàng");
            return;
        }

        setCartItems((prev) => {
            const exists = prev.find((item) => item.productId === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            alert("Thêm sản phẩm vào giỏ hàng thành công!");    
            return [...prev, { ...product, productId: product.id, quantity: 1 }];
        });
    };

    const removeFromCart = async (productId) => {
        await api.post("/customer/cart/remove", { productId });
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    const updateQuantity = async (productId, quantity) => {
        await api.post("/customer/cart/update", { productId, quantity });
        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = async () => {
        await api.post("/customer/cart/clear");
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);


// // context/CartContext.jsx
// import { createContext, useState, useContext, useEffect } from "react";
// import PropTypes from "prop-types";
// const CartContext = createContext();

// export function CartProvider({ children }) {
//     const [cartItems, setCartItems] = useState(() => {
//         const stored = localStorage.getItem("cart");
//         return stored ? JSON.parse(stored) : [];
//     });

//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cartItems));
//     }, [cartItems]);

//     const addToCart = (product) => {
//         setCartItems((prev) => {
//             const exists = prev.find((item) => item.id === product.id);
//             if (exists) {
//                 return prev.map((item) =>
//                     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//                 );
//             }
//             return [...prev, { ...product, quantity: 1 }];
//         });
//     };

//     const removeFromCart = (id) => {
//         setCartItems((prev) => prev.filter((item) => item.id !== id));
//     };

//     const updateQuantity = (id, quantity) => {
//         setCartItems((prev) =>
//             prev.map((item) =>
//                 item.id === id ? { ...item, quantity } : item
//             )
//         );
//     };

//     const clearCart = () => setCartItems([]);

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// }


// CartProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export const useCart = () => useContext(CartContext);
