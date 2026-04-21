import { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart, updateCart, removeFromCart, clearCart } from '../services/cartServices';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(false);

    // fetch cart on page load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getCart();
                setCart(res.data);
            } catch (err) {
                setCart({ items: [], totalPrice: 0 });
            }
        };
        fetchCart();
    }, []);

    const addToCartHandler = async (menuItemId, quantity) => {
        try {
            const res = await addToCart(menuItemId, quantity);
            setCart(res.data);
        } catch (err) {
            console.error('Error adding to cart', err);
        }
    };

    const updateQuantity = async (menuItemId, quantity) => {
        if (quantity <= 0) {
            removeFromCartHandler(menuItemId);
            return;
        }
        try {
            const res = await updateCart(menuItemId, quantity);
            setCart(res.data);
        } catch (err) {
            console.error('Error updating cart', err);
        }
    };

    const removeFromCartHandler = async (menuItemId) => {
        try {
            const res = await removeFromCart(menuItemId);
            setCart(res.data);
        } catch (err) {
            console.error('Error removing from cart', err);
        }
    };

    const clearCartHandler = async () => {
        try {
            await clearCart();
            setCart({ items: [], totalPrice: 0 });
        } catch (err) {
            console.error('Error clearing cart', err);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart: addToCartHandler,
            updateQuantity,
            removeFromCart: removeFromCartHandler,
            clearCart: clearCartHandler,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartContext;