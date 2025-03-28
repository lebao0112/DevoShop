// context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
const CartContext = createContext();

// export function CartProvider({ children }) {
//     const [cartItems, setCartItems] = useState([]);

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

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}


CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
