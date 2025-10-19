import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Memuat kategori...</div>
            </div>
        );
    }

    return (
        <div className="categories-page-container">
            <div className="page-header">
                <Link to="/" className="back-button">
                    ← Kembali ke Beranda
                </Link>
                <h1>Semua Kategori</h1>
                <p>Temukan produk berdasarkan kategori favorit Anda</p>
            </div>

            <div className="categories-grid-large">
                {categories.map(category => (
                    <Link 
                        key={category.id} 
                        to={`/category/${category.id}`}
                        className="category-card-link"
                    >
                        <div className="category-card-large">
                            <div className="category-icon-large">
                                <span>📁</span>
                            </div>
                            <h3 className="category-name-large">{category.name}</h3>
                            <p className="category-desc-large">
                                Jelajahi berbagai produk dalam kategori {category.name.toLowerCase()}
                            </p>
                            <div className="category-cta">
                                Lihat Produk →
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}