import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function CheckoutSuccess() {
    const location = useLocation();
    const { orderId, total } = location.state || {};

    return (
        <div className="checkout-success-container">
            <div className="success-content">
                <div className="success-icon">✅</div>
                <h1>Pesanan Berhasil!</h1>
                <p>Terima kasih telah berbelanja di toko kami. Pesanan Anda sedang diproses.</p>
                
                {orderId && (
                    <div className="order-details">
                        <p><strong>ID Pesanan:</strong> {orderId}</p>
                        <p><strong>Total:</strong> ${total?.toFixed(2)}</p>
                    </div>
                )}

                <div className="success-actions">
                    <Link to="/products" className="cta-button primary">
                        Lanjutkan Belanja
                    </Link>
                    <Link to="/dashboard" className="cta-button secondary">
                        Lihat Dashboard
                    </Link>
                    <Link to="/" className="cta-button secondary">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}