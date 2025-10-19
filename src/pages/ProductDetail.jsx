import { useEffect } from "react";
import { useState } from "react"
import { useParams, Link } from 'react-router-dom'

export default function ProductDetail(){
    const { productId } = useParams();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(`Error fetching product:`, err);
                setLoading(false)
            })
    }, [productId]);

    if (loading) return <div className="loading">Memuat detail produk...</div>
    if (!product) return <div className="error-message">Produk tidak ditemukan</div>

    return (
        <div className="product-detail-container">
            <div className="product-detail-card">
                <div className="product-detail-header">
                    <div className="product-images-vertical">
                        <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="product-detail-image" 
                    />
                    <img 
                        src={product.images[1]} 
                        alt={product.title} 
                        className="product-detail-image" 
                    />
                    <img 
                        src={product.images[2]} 
                        alt={product.title} 
                        className="product-detail-image" 
                    />
                    </div>
                    <div className="product-detail-info">
                        <h2 className="product-detail-title">{product.title}</h2>
                        <p className="product-detail-price">${product.price}</p>
                        <p className="product-detail-description">
                            <strong>Deskripsi: </strong> 
                            {product.description}
                        </p>
                        <Link to="/products" className="back-link">
                            ← Kembali ke Daftar Produk
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}