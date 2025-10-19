import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        revenue: 0
    });
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch products untuk stats
                const productsResponse = await fetch('https://api.escuelajs.co/api/v1/products?limit=100');
                const productsData = await productsResponse.json();
                
                // Fetch users untuk stats
                const usersResponse = await fetch('https://api.escuelajs.co/api/v1/users?limit=50');
                const usersData = await usersResponse.json();

                // Simulasi data dashboard
                setStats({
                    totalProducts: productsData.length,
                    totalUsers: usersData.length,
                    totalOrders: Math.floor(Math.random() * 1000) + 500,
                    revenue: Math.floor(Math.random() * 100000) + 50000
                });

                // Recent products (ambil 4 produk terbaru)
                setRecentProducts(productsData.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading">Memuat dashboard...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Overview dan statistik sistem</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <h3>Total Produk</h3>
                        <div className="stat-number">{stats.totalProducts}</div>
                        <div className="stat-trend positive">+12% dari bulan lalu</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>Total Pengguna</h3>
                        <div className="stat-number">{stats.totalUsers}</div>
                        <div className="stat-trend positive">+8% dari bulan lalu</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🛒</div>
                    <div className="stat-content">
                        <h3>Total Pesanan</h3>
                        <div className="stat-number">{stats.totalOrders}</div>
                        <div className="stat-trend positive">+15% dari bulan lalu</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3>Pendapatan</h3>
                        <div className="stat-number">${stats.revenue.toLocaleString()}</div>
                        <div className="stat-trend positive">+20% dari bulan lalu</div>
                    </div>
                </div>
            </div>

            {/* Recent Products & Quick Actions */}
            <div className="dashboard-content">
                <div className="recent-products">
                    <div className="section-header">
                        <h2>Produk Terbaru</h2>
                        <Link to="/products" className="view-all-link">Lihat Semua</Link>
                    </div>
                    <div className="products-list">
                        {recentProducts.map(product => (
                            <div key={product.id} className="product-item">
                                <img 
                                    src={product.images[0]} 
                                    alt={product.title}
                                    className="product-thumb"
                                />
                                <div className="product-details">
                                    <h4>{product.title}</h4>
                                    <p className="product-price">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="quick-actions">
                    <div className="section-header">
                        <h2>Menu Cepat</h2>
                    </div>
                    <div className="actions-grid">
                        <Link to="/products" className="action-card">
                            <div className="action-icon">📦</div>
                            <h3>Kelola Produk</h3>
                            <p>Tambahkan, edit, atau hapus produk</p>
                        </Link>

                        <Link to="/profile" className="action-card">
                            <div className="action-icon">👤</div>
                            <h3>Profil Saya</h3>
                            <p>Kelola informasi profil Anda</p>
                        </Link>

                        <Link to="/settings" className="action-card">
                            <div className="action-icon">⚙️</div>
                            <h3>Pengaturan</h3>
                            <p>Ubah preferensi sistem</p>
                        </Link>

                        <div className="action-card">
                            <div className="action-icon">📊</div>
                            <h3>Laporan</h3>
                            <p>Lihat laporan dan analitik</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}