import React, { useState } from 'react';

export default function ProductComparison() {
    const [comparisonProducts, setComparisonProducts] = useState([]);

    const addToComparison = (product) => {
        if (comparisonProducts.length < 4 && !comparisonProducts.find(p => p.id === product.id)) {
            setComparisonProducts(prev => [...prev, product]);
        }
    };

    const removeFromComparison = (productId) => {
        setComparisonProducts(prev => prev.filter(p => p.id !== productId));
    };

    return (
        <div className="product-comparison">
            <h3>Bandingkan Produk ({comparisonProducts.length}/4)</h3>
            
            {comparisonProducts.length > 0 && (
                <div className="comparison-table">
                    <div className="comparison-header">
                        <div className="header-cell">Fitur</div>
                        {comparisonProducts.map(product => (
                            <div key={product.id} className="header-cell">
                                <button 
                                    onClick={() => removeFromComparison(product.id)}
                                    className="remove-comparison-btn"
                                >
                                    ✕
                                </button>
                                <img src={product.images[0]} alt={product.title} />
                                <h4>{product.title}</h4>
                                <p className="price">${product.price}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Comparison Rows */}
                    <div className="comparison-row">
                        <div className="row-label">Rating</div>
                        {comparisonProducts.map(product => (
                            <div key={product.id} className="row-value">
                                ⭐⭐⭐⭐☆
                            </div>
                        ))}
                    </div>
                    
                    <div className="comparison-row">
                        <div className="row-label">Kategori</div>
                        {comparisonProducts.map(product => (
                            <div key={product.id} className="row-value">
                                {product.category?.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
