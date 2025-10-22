import { useCart } from '../contexts/CartContext';

// Custom hook untuk logika cart yang lebih spesifik
export function useCartOperations() {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart
    } = useCart();

    const incrementQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            updateQuantity(productId, item.quantity + 1);
        }
    };

    const decrementQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            updateQuantity(productId, item.quantity - 1);
        }
    };

    const getItemQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart,
        incrementQuantity,
        decrementQuantity,
        getItemQuantity
    };
}