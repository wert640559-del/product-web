import React, { useState } from 'react';
import { useCartOperations } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const { cartItems, totalPrice, clearCart } = useCartOperations();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: currentUser?.name || '',
        email: currentUser?.email || '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'credit-card'
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulasi proses checkout
        setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            navigate('/checkout/success', { 
                state: { 
                    orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                    total: totalPrice
                }
            });
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-container">
                <div className="checkout-empty">
                    <h2>Keranjang Belanja Kosong</h2>
                    <p>Silakan tambahkan produk ke keranjang sebelum checkout.</p>
                    <button 
                        onClick={() => navigate('/products')}
                        className="cta-button primary"
                    >
                        Mulai Belanja
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h1>Checkout</h1>
                <p>Lengkapi informasi pengiriman dan pembayaran</p>
            </div>

            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-section">
                        <h3>Informasi Pengiriman</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nama Lengkap *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Alamat Lengkap *</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="form-textarea"
                                rows="3"
                                placeholder="Masukkan alamat lengkap pengiriman"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Kota *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Kode Pos *</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Metode Pembayaran</h3>
                        <div className="payment-methods">
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="credit-card"
                                    checked={formData.paymentMethod === 'credit-card'}
                                    onChange={handleInputChange}
                                />
                                <span>Kartu Kredit</span>
                            </label>
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank-transfer"
                                    checked={formData.paymentMethod === 'bank-transfer'}
                                    onChange={handleInputChange}
                                />
                                <span>Transfer Bank</span>
                            </label>
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="e-wallet"
                                    checked={formData.paymentMethod === 'e-wallet'}
                                    onChange={handleInputChange}
                                />
                                <span>E-Wallet</span>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-order-btn"
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <div className="loading-spinner"></div>
                                Memproses Pesanan...
                            </>
                        ) : (
                            `Bayar $${totalPrice.toFixed(2)}`
                        )}
                    </button>
                </form>

                <div className="order-summary-sidebar">
                    <h3>Ringkasan Pesanan</h3>
                    <div className="order-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="order-item">
                                <div className="order-item-info">
                                    <span className="item-name">{item.title}</span>
                                    <span className="item-quantity">x{item.quantity}</span>
                                </div>
                                <span className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="order-totals">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Pengiriman:</span>
                            <span>Gratis</span>
                        </div>
                        <div className="total-row grand-total">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}