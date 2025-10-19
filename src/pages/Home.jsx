import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch featured products
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=6')
            .then(res => res.json())
            .then(data => {
                setFeaturedProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });

        // Fetch categories
        fetch('https://api.escuelajs.co/api/v1/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data.slice(0, 4)); // Ambil 4 kategori pertama
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
            });
    }, []);

    if (loading) {
        return (
            <div className="home-container">
                <div className="loading">Memuat konten...</div>
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Temukan Produk Terbaik untuk Kebutuhan Anda</h1>
                    <p className="hero-subtitle">
                        Jelajahi koleksi produk berkualitas tinggi dengan harga terbaik. 
                        Pengalaman berbelanja yang mudah, aman, dan terpercaya.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/products" className="cta-button primary">
                            Jelajahi Produk
                        </Link>
                        <Link to="/about" className="cta-button secondary">
                            Tentang Kami
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-section">
                <div className="container">
                    <h2 className="section-title">Produk Unggulan</h2>
                    <p className="section-subtitle">
                        Produk pilihan dengan kualitas terbaik yang direkomendasikan untuk Anda
                    </p>
                    
                    <div className="home-products-grid">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="home-product-card">
                                <div className="home-product-image-container">
                                    <img 
                                        src={product.images[0]} 
                                        alt={product.title}
                                        className="home-product-image"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                        }}
                                    />
                                    <div className="home-product-overlay">
                                        <Link to={`/products/${product.id}`} className="view-detail-btn">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                                <div className="home-product-info">
                                    <h3 className="home-product-title">{product.title}</h3>
                                    <p className="home-product-category">{product.category?.name || 'Uncategorized'}</p>
                                    <div className="home-product-price">${product.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-cta">
                        <Link to="/products" className="view-all-btn">
                            Lihat Semua Produk
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Kategori Produk</h2>
                    <p className="section-subtitle">
                        Temukan produk berdasarkan kategori favorit Anda
                    </p>
                    
                    <div className="categories-grid">
                        {categories.map(category => (
                            <div key={category.id} className="category-card">
                                <div className="category-icon">
                                    <span>📁</span>
                                </div>
                                <h3 className="category-name">{category.name}</h3>
                                <p className="category-desc">
                                    Jelajahi berbagai produk dalam kategori {category.name.toLowerCase()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Produk Tersedia</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Pelanggan Puas</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">99%</div>
                            <div className="stat-label">Kepuasan Pelanggan</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Dukungan</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2 className="cta-title">Siap Memulai Belanja?</h2>
                    <p className="cta-subtitle">
                        Bergabunglah dengan ribuan pelanggan puas yang telah mempercayai kami
                    </p>
                    <div className="cta-buttons">
                        <Link to="/products" className="cta-button primary large">
                            Mulai Belanja Sekarang
                        </Link>
                        <Link to="/contact" className="cta-button secondary large">
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}