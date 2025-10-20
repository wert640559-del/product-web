import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    // PROGRAMMATIC NAVIGATION: Kembali ke halaman sebelumnya
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleGoHome = () => {
    // PROGRAMMATIC NAVIGATION: Ke halaman beranda
    navigate('/', { replace: true });
  };

  const handleGoToProducts = () => {
    // PROGRAMMATIC NAVIGATION: Ke halaman produk
    navigate('/products');
  };

  // Dapatkan path yang tidak ditemukan
  const invalidPath = location.pathname;

  return (
    <div className="page-container">
      <div className="not-found-container">
        <div className="not-found-content">
          {/* Illustration/Icon */}
          <div className="not-found-illustration">
            <div className="error-icon">404</div>
            <div className="error-emoji">😕</div>
          </div>

          {/* Main Message */}
          <h1>Halaman Tidak Ditemukan</h1>
          <p className="not-found-description">
            Maaf, halaman yang Anda cari di <strong>{invalidPath}</strong> tidak ada 
            atau mungkin telah dipindahkan.
          </p>

          {/* Suggested Actions */}
          <div className="suggested-actions">
            <h3>Mungkin yang Anda cari:</h3>
            <div className="suggestion-links">
              <Link to="/" className="suggestion-link">
                <span className="suggestion-icon">🏠</span>
                <span className="suggestion-text">
                  <strong>Beranda</strong>
                  <span>Kembali ke halaman utama</span>
                </span>
              </Link>
              
              <Link to="/products" className="suggestion-link">
                <span className="suggestion-icon">🛍️</span>
                <span className="suggestion-text">
                  <strong>Produk</strong>
                  <span>Jelajahi koleksi produk kami</span>
                </span>
              </Link>
              
              <Link to="/product-search" className="suggestion-link">
                <span className="suggestion-icon">🔍</span>
                <span className="suggestion-text">
                  <strong>Cari Produk</strong>
                  <span>Temukan produk dengan filter</span>
                </span>
              </Link>
              
              <Link to="/contact" className="suggestion-link">
                <span className="suggestion-icon">📞</span>
                <span className="suggestion-text">
                  <strong>Kontak</strong>
                  <span>Hubungi kami untuk bantuan</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button onClick={handleGoBack} className="action-btn secondary">
              ← Kembali
            </button>
            <button onClick={handleGoHome} className="action-btn primary">
              🏠 Ke Beranda
            </button>
            <button onClick={handleGoToProducts} className="action-btn primary">
              🛍️ Lihat Produk
            </button>
          </div>

          {/* Technical Info (optional, bisa di-hidden) */}
          <details className="technical-info">
            <summary>Informasi Teknis</summary>
            <div className="tech-details">
              <p><strong>Path yang tidak ditemukan:</strong> {invalidPath}</p>
              <p><strong>Waktu:</strong> {new Date().toLocaleString('id-ID')}</p>
              <p><strong>Referrer:</strong> {document.referrer || 'Tidak ada'}</p>
            </div>
          </details>

          {/* Search Suggestion */}
          <div className="search-suggestion">
            <p>Tidak menemukan yang Anda cari? Coba gunakan pencarian:</p>
            <Link to="/product-search" className="search-link">
              🔍 Gunakan Pencarian Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}