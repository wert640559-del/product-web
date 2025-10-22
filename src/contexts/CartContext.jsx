import React, { createContext, useContext, useMemo, useCallback } from 'react';

const CartContext = createContext();

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = React.useState([]);

    // Add item to cart dengan useCallback
    const addToCart = useCallback((product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    }, []);

    // Remove item from cart dengan useCallback
    const removeFromCart = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    // Update quantity dengan useCallback
    const updateQuantity = useCallback((productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    }, [removeFromCart]);

    // Clear cart dengan useCallback
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Calculate total items dengan useMemo
    const totalItems = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    // Calculate total price dengan useMemo
    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    // Check if item is in cart dengan useMemo
    const isInCart = useCallback((productId) => {
        return cartItems.some(item => item.id === productId);
    }, [cartItems]);

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart
    }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isInCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}