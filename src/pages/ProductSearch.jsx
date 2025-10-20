import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Get query parameters
  const category = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'name';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  // Items per page for pagination
  const itemsPerPage = 9;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, category, sortBy, minPrice, maxPrice, searchTerm, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=100');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(product => 
        product.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'newest':
          return new Date(b.creationAt) - new Date(a.creationAt);
        case 'oldest':
          return new Date(a.creationAt) - new Date(b.creationAt);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  // Update query parameters
  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === 'all' || value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    if (!updates.page) {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

  const handleCategoryChange = (newCategory) => {
    updateSearchParams({ category: newCategory });
  };

  const handleSortChange = (newSort) => {
    updateSearchParams({ sort: newSort });
  };

  const handlePriceFilter = (min, max) => {
    updateSearchParams({ 
      minPrice: min || '',
      maxPrice: max || ''
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    updateSearchParams({ search: term || '' });
  };

  const handlePageChange = (newPage) => {
    updateSearchParams({ page: newPage.toString() });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSearchParams(new URLSearchParams());
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Memuat produk...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="product-search-container">
        {/* Header */}
        <div className="search-header">
          <h1>Pencarian Produk</h1>
          <p>Temukan produk yang sesuai dengan kebutuhan Anda</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          {/* Search Input */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Active Filters Display */}
          <div className="active-filters">
            {(category !== 'all' || sortBy !== 'name' || minPrice || maxPrice || searchTerm) && (
              <>
                <span>Filter Aktif:</span>
                {category !== 'all' && (
                  <span className="filter-tag">
                    Kategori: {category}
                    <button onClick={() => handleCategoryChange('all')}>×</button>
                  </span>
                )}
                {sortBy !== 'name' && (
                  <span className="filter-tag">
                    Urutkan: {sortBy}
                    <button onClick={() => handleSortChange('name')}>×</button>
                  </span>
                )}
                {minPrice && (
                  <span className="filter-tag">
                    Harga Min: ${minPrice}
                    <button onClick={() => handlePriceFilter('', maxPrice)}>×</button>
                  </span>
                )}
                {maxPrice && (
                  <span className="filter-tag">
                    Harga Max: ${maxPrice}
                    <button onClick={() => handlePriceFilter(minPrice, '')}>×</button>
                  </span>
                )}
                {searchTerm && (
                  <span className="filter-tag">
                    Pencarian: {searchTerm}
                    <button onClick={() => handleSearch('')}>×</button>
                  </span>
                )}
                <button onClick={clearAllFilters} className="clear-all-btn">
                  Hapus Semua Filter
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="search-content">
          {/* Sidebar Filters */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3>Kategori</h3>
              <div className="filter-options">
                <button
                  className={`filter-option ${category === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('all')}
                >
                  Semua Kategori
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`filter-option ${category === cat.name.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.name.toLowerCase())}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Urutkan Berdasarkan</h3>
              <div className="filter-options">
                <button
                  className={`filter-option ${sortBy === 'name' ? 'active' : ''}`}
                  onClick={() => handleSortChange('name')}
                >
                  Nama A-Z
                </button>
                <button
                  className={`filter-option ${sortBy === 'price-low' ? 'active' : ''}`}
                  onClick={() => handleSortChange('price-low')}
                >
                  Harga Terendah
                </button>
                <button
                  className={`filter-option ${sortBy === 'price-high' ? 'active' : ''}`}
                  onClick={() => handleSortChange('price-high')}
                >
                  Harga Tertinggi
                </button>
                <button
                  className={`filter-option ${sortBy === 'newest' ? 'active' : ''}`}
                  onClick={() => handleSortChange('newest')}
                >
                  Terbaru
                </button>
                <button
                  className={`filter-option ${sortBy === 'oldest' ? 'active' : ''}`}
                  onClick={() => handleSortChange('oldest')}
                >
                  Terlama
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h3>Rentang Harga</h3>
              <div className="price-filter">
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => handlePriceFilter(e.target.value, maxPrice)}
                    className="price-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => handlePriceFilter(minPrice, e.target.value)}
                    className="price-input"
                  />
                </div>
                <button 
                  onClick={() => handlePriceFilter('', '')}
                  className="clear-price-btn"
                >
                  Reset Harga
                </button>
              </div>
            </div>

            {/* Query Parameters Info */}
            <div className="query-info">
              <h4>Parameter URL Saat Ini:</h4>
              <div className="query-params">
                {Array.from(searchParams.entries()).map(([key, value]) => (
                  <div key={key} className="query-param">
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
                {searchParams.size === 0 && (
                  <div className="no-params">Tidak ada parameter</div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-results">
            {/* Results Info */}
            <div className="results-info">
              <p>
                Menampilkan {paginatedProducts.length} dari {filteredProducts.length} produk
                {searchParams.toString() && ` (dengan filter)`}
              </p>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <Link 
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
                    <p className="product-category">{product.category?.name || 'Uncategorized'}</p>
                    <div className="product-price">${product.price}</div>
                    <div className="product-meta">
                      <small>Kategori: {product.category?.name}</small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {paginatedProducts.length === 0 && (
              <div className="no-results">
                <h3>Tidak ada produk yang ditemukan</h3>
                <p>Coba ubah filter atau kata kunci pencarian Anda</p>
                <button onClick={clearAllFilters} className="cta-button primary">
                  Tampilkan Semua Produk
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  ← Sebelumnya
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`pagination-btn ${pageNum === page ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="pagination-btn"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links for Demo */}
        <div className="demo-links">
          <h3>Demo Query Parameters:</h3>
          <div className="demo-buttons">
            <Link 
              to="/product-search?category=clothes&sort=price-low" 
              className="demo-link"
            >
              Pakaian Termurah
            </Link>
            <Link 
              to="/product-search?category=electronics&sort=price-high&minPrice=100" 
              className="demo-link"
            >
              Elektronik Mahal
            </Link>
            <Link 
              to="/product-search?sort=newest" 
              className="demo-link"
            >
              Produk Terbaru
            </Link>
            <Link 
              to="/product-search?maxPrice=50&sort=price-low" 
              className="demo-link"
            >
              Dibawah $50
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}