import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
    const {
        cartItems,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        totalItems,
        totalPrice
    } = useCartOperations();

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <div className="cart-empty">
                    <h2>🛒 Keranjang Belanja Kosong</h2>
                    <p>Belum ada produk di keranjang belanja Anda.</p>
                    <Link to="/products" className="cta-button primary">
                        Mulai Belanja
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Keranjang Belanja</h1>
                <div className="cart-summary">
                    <span>{totalItems} item</span>
                    <span>Total: ${totalPrice.toFixed(2)}</span>
                </div>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="item-image">
                                <img 
                                    src={item.images?.[0] || 'https://via.placeholder.com/100x100?text=No+Image'} 
                                    alt={item.title}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                                    }}
                                />
                            </div>
                            <div className="item-details">
                                <h3 className="item-title">{item.title}</h3>
                                <p className="item-category">{item.category?.name || 'Uncategorized'}</p>
                                <p className="item-price">${item.price}</p>
                            </div>
                            <div className="item-controls">
                                <div className="quantity-controls">
                                    <button 
                                        onClick={() => decrementQuantity(item.id)}
                                        className="quantity-btn"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button 
                                        onClick={() => incrementQuantity(item.id)}
                                        className="quantity-btn"
                                    >
                                        +
                                    </button>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="remove-btn"
                                >
                                    🗑️ Hapus
                                </button>
                            </div>
                            <div className="item-total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-sidebar">
                    <div className="order-summary">
                        <h3>Ringkasan Pesanan</h3>
                        <div className="summary-row">
                            <span>Total Item:</span>
                            <span>{totalItems}</span>
                        </div>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Pengiriman:</span>
                            <span>Gratis</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        
                        <button 
                            onClick={handleCheckout}
                            className="checkout-btn"
                        >
                            🛍️ Lanjut ke Checkout
                        </button>

                        <button 
                            onClick={clearCart}
                            className="clear-cart-btn"
                        >
                            🗑️ Kosongkan Keranjang
                        </button>

                        <Link to="/products" className="continue-shopping">
                            ← Lanjutkan Belanja
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}