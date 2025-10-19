import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CategoryProducts() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('title');

    // Fetch category details
    useEffect(() => {
        if (categoryId) {
            fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`)
                .then(res => res.json())
                .then(data => setCategory(data))
                .catch(err => console.error('Error fetching category:', err));
        }
    }, [categoryId]);

    // Fetch products by category
    useEffect(() => {
        setLoading(true);
        fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching category products:', err);
                setLoading(false);
            });
    }, [categoryId]);

    // Optimized sorting dengan useMemo
    const sortedProducts = useMemo(() => {
        const sorted = [...products];
        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sorted;
        }
    }, [products, sortBy]);

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Memuat produk...</div>
            </div>
        );
    }

    return (
        <div className="category-products-container">
            {/* Header Section */}
            <div className="category-header">
                <Link to="/" className="back-button">
                    ← Kembali ke Beranda
                </Link>
                <h1 className="category-title">
                    {category?.name || 'Kategori'} 
                    <span className="product-count"> ({products.length} produk)</span>
                </h1>
                <p className="category-description">
                    Jelajahi berbagai produk dalam kategori {category?.name?.toLowerCase() || 'ini'}
                </p>
            </div>

            {/* Sorting Controls */}
            <div className="sorting-controls">
                <label htmlFor="sort">Urutkan berdasarkan:</label>
                <select 
                    id="sort"
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="title">Nama Produk</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                </select>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img 
                                    src={product.images[0]} 
                                    alt={product.title}
                                    className="product-image"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                    }}
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
                                <div className="product-rating">
                                    {'⭐'.repeat(Math.floor(product.rating || 4))} 
                                    ({product.rating || '4.0'})
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-products">
                        <h3>Tidak ada produk dalam kategori ini</h3>
                        <p>Silakan pilih kategori lain atau kembali ke beranda</p>
                        <Link to="/" className="cta-button primary">
                            Kembali ke Beranda
                        </Link>
                    </div>
                )}
            </div>

            {/* Back to Categories */}
            <div className="section-cta">
                <Link to="/categories" className="view-all-btn">
                    Lihat Semua Kategori
                </Link>
            </div>
        </div>
    );
}