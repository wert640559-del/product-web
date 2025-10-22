import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function NavigationDemo() {
    const { currentUser, logout } = useAuth();
    const { totalItems } = useCart();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="main-nav">
            <div className="nav-brand">
                <h1>🛍️ React Shop</h1>
            </div>
            <div className="nav-links">
                <NavLink
                    to="/products"
                    className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                >
                    🏪 Produk
                </NavLink>

                <NavLink 
                    to='/about'
                    className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                >
                    ℹ️ Tentang
                </NavLink>

                <NavLink 
                    to="/cart"
                    className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                >
                    🛒 Keranjang {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </NavLink>

                {/* Tampilkan Dashboard hanya jika user sudah login */}
                {currentUser && (
                    <NavLink 
                        to="/dashboard"
                        className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                    >
                        📊 Dashboard
                    </NavLink>
                )}

                <NavLink 
                    to="/contact"
                    className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                >
                    📞 Kontak
                </NavLink>

                {/* Performance Demo Links */}
                <div className="nav-dropdown">
                    <span className="nav-link">⚡ Performance</span>
                    <div className="dropdown-content">
                        <NavLink to="/performance/react-memo" className="dropdown-link">
                            React.memo
                        </NavLink>
                        <NavLink to="/performance/use-memo" className="dropdown-link">
                            useMemo
                        </NavLink>
                        <NavLink to="/performance/use-callback" className="dropdown-link">
                            useCallback
                        </NavLink>
                        <NavLink to="/performance/code-splitting" className="dropdown-link">
                            Code Splitting
                        </NavLink>
                        <NavLink to="/performance/profiling" className="dropdown-link">
                            Profiling
                        </NavLink>
                    </div>
                </div>

                {/* Auth Section */}
                <div className="auth-section">
                    {currentUser ? (
                        <div className="user-menu">
                            <span className="user-greeting">
                                👋 {currentUser.name}
                            </span>
                            <div className="user-dropdown">
                                <NavLink to="/profile" className="dropdown-link">
                                    👤 Profile
                                </NavLink>
                                <NavLink to="/settings" className="dropdown-link">
                                    ⚙️ Settings
                                </NavLink>
                                <button onClick={handleLogout} className="logout-btn-nav">
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <NavLink 
                            to="/login"
                            className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                        >
                            🔐 Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}