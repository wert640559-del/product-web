import React, { useState } from 'react';

export default function AdvancedFilter({ onFilterChange }) {
    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        categories: [],
        ratings: [],
        inStock: false,
        onSale: false
    });

    const priceMarks = {
        0: '$0',
        250: '$250',
        500: '$500',
        750: '$750',
        1000: '$1000+'
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="advanced-filter">
            <h3>Filter Lanjutan</h3>
            
            {/* Price Range */}
            <div className="filter-section">
                <h4>Rentang Harga</h4>
                <div className="price-slider">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange({
                            ...filters,
                            priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                        })}
                    />
                    <div className="price-labels">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Stock Filter */}
            <div className="filter-section">
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange({
                            ...filters,
                            inStock: e.target.checked
                        })}
                    />
                    Tersedia Stok
                </label>
            </div>

            {/* Sale Filter */}
            <div className="filter-section">
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.onSale}
                        onChange={(e) => handleFilterChange({
                            ...filters,
                            onSale: e.target.checked
                        })}
                    />
                    Sedang Diskon
                </label>
            </div>

            {/* Clear Filters */}
            <button 
                className="clear-filters-btn"
                onClick={() => handleFilterChange({
                    priceRange: [0, 1000],
                    categories: [],
                    ratings: [],
                    inStock: false,
                    onSale: false
                })}
            >
                Hapus Semua Filter
            </button>
        </div>
    );
}
