import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCart';
import ErrorBoundary from '../components/ErrorBoundary';

function ProductCard({ product }) {
    const { addToCart, isInCart, getItemQuantity } = useCartOperations();
    const quantity = getItemQuantity(product.id);
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img 
                    src={imageError ? 'https://via.placeholder.com/300x200?text=No+Image' : product.images?.[0]} 
                    alt={product.title}
                    className="product-image"
                    onError={handleImageError}
                />
                <div className="product-overlay">
                    <Link to={`/products/${product.id}`} className="view-detail-btn">
                        Lihat Detail
                    </Link>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-category">{product.category?.name || 'Uncategorized'}</p>
                <div className="product-price">${product.price}</div>
                <div className="product-actions">
                    <button 
                        onClick={handleAddToCart}
                        className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                    >
                        {isInCart(product.id) ? (
                            `✅ Dalam Keranjang (${quantity})`
                        ) : (
                            '🛒 Tambah ke Keranjang'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProductsContent() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(res => {
                if (!res.ok) throw new Error('Gagal memuat produk');
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Memuat produk...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="products-container">
            <div className="products-header">
                <h1>🛍️ Semua Produk</h1>
                <p>Temukan produk terbaik untuk kebutuhan Anda</p>
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <ErrorBoundary key={product.id}>
                        <ProductCard product={product} />
                    </ErrorBoundary>
                ))}
            </div>
        </div>
    );
}

export default function Products() {
    return (
        <ErrorBoundary>
            <ProductsContent />
        </ErrorBoundary>
    );
}