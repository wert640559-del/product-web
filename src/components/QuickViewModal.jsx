import React from 'react';
import { useCartOperations } from '../hooks/useCart';

export default function QuickViewModal({ product, isOpen, onClose }) {
    const { addToCart, isInCart } = useCartOperations();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>✕</button>
                
                <div className="modal-content">
                    <div className="modal-images">
                        <img src={product.images[0]} alt={product.title} />
                    </div>
                    
                    <div className="modal-info">
                        <h2>{product.title}</h2>
                        <p className="modal-price">${product.price}</p>
                        <p className="modal-description">{product.description}</p>
                        
                        <div className="modal-actions">
                            <button 
                                className={`quick-add-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                                onClick={() => addToCart(product)}
                            >
                                {isInCart(product.id) ? '✓ Dalam Keranjang' : '+ Tambah ke Keranjang'}
                            </button>
                            <button className="view-detail-btn">
                                Lihat Detail Lengkap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}