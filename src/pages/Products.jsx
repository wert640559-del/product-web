import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch (err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            })
    }, [])

    if (loading) return <div className="loading">Memuat produk...</div>

    return (
        <div className="products-page"> {/* Tambahkan wrapper class */}
            <div className="products-container">
                <h2 className="products-title">Daftar Produk</h2>
                <div className="products-grid">
                    {products.map((product) => (
                        <NavLink 
                            to={`/products/${product.id}`} 
                            key={product.id}
                            className="product-card"
                        >
                            <img 
                                src={product.images[0]} 
                                alt={product.title}
                                className="product-image"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                }}
                            />
                            <div className="product-info">
                                <h4 className="product-title">{product.title}</h4>
                                <p className="product-price">${product.price}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}