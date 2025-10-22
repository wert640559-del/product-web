import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";
import ContactSuccess from "./components/ContactSuccess";
import ProductSearch from "./pages/ProductSearch";
import Checkout from "./pages/Checkout";
import ErrorBoundary from "./components/ErrorBoundary";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess"; // Tambahkan import ini

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check login status when component mounts
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (authToken) {
      setIsLoggedIn(true);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  // Function to handle login
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="app-container">
      {/* Professional Navigation */}
      <nav className="professional-nav">
        <div className="nav-container">
          {/* Logo/Brand */}
          <div className="nav-brand">
            <NavLink to="/" className="brand-link">
              <div className="brand-logo">🛍️</div>
              <span className="brand-text">E-Commerce</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-menu-desktop">
            <div className="nav-links-primary">
              <NavLink to="/" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                Beranda
              </NavLink>
              <NavLink to="/about" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                Tentang
              </NavLink>
              <NavLink to="/products" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                Produk
              </NavLink>
              <NavLink to="/contact" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                Kontak
              </NavLink>
              <NavLink to="/product-search" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                Cari Produk
              </NavLink>
            </div>

            <div className="nav-links-secondary">
              {/* Cart Icon - Tampilkan untuk semua pengguna */}
              <NavLink to="/cart" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                <div className="cart-nav-item">
                  <span className="cart-icon">🛒</span>
                  <span className="cart-text">Keranjang</span>
                </div>
              </NavLink>

              {isLoggedIn ? (
                <div className="user-menu">
                  <NavLink to="/dashboard" className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Dashboard
                  </NavLink>
                  <div className="user-dropdown">
                    <button className="user-toggle">
                      <span className="user-avatar">👤</span>
                      <span className="user-name">{user?.name || 'User'}</span>
                      <span className="dropdown-arrow">▼</span>
                    </button>
                    <div className="dropdown-menu">
                      <NavLink to="/profile" className="dropdown-link">
                        Profil Saya
                      </NavLink>
                      <NavLink to="/settings" className="dropdown-link">
                        Pengaturan
                      </NavLink>
                      <NavLink to="/checkout" className="dropdown-link">
                        Checkout
                      </NavLink>
                      <div className="dropdown-divider"></div>
                      <Logout onLogout={handleLogout} />
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink to="/login" className="login-btn">
                  Login
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`nav-menu-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <NavLink 
              to="/" 
              className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang
            </NavLink>
            <NavLink 
              to="/products" 
              className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Produk
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kontak
            </NavLink>
            <NavLink 
              to="/product-search" 
              className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cari Produk
            </NavLink>
            <NavLink 
              to="/cart" 
              className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🛒 Keranjang
            </NavLink>

            {isLoggedIn ? (
              <>
                <div className="mobile-divider"></div>
                <NavLink 
                  to="/dashboard" 
                  className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/profile" 
                  className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profil Saya
                </NavLink>
                <NavLink 
                  to="/settings" 
                  className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pengaturan
                </NavLink>
                <NavLink 
                  to="/checkout" 
                  className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Checkout
                </NavLink>
                <div className="mobile-logout">
                  <Logout onLogout={handleLogout} />
                </div>
              </>
            ) : (
              <NavLink 
                to="/login" 
                className="mobile-login-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:productId" element={<ProductDetail/>}/>
            <Route path="/login" element={<Login onLogin={handleLogin} />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/contact-success" element={<ContactSuccess />}/>
            <Route path="/product-search" element={<ProductSearch />}/>
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </PrivateRoute>
            }/>
            <Route path="/profile" element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </PrivateRoute>
            }/>
            <Route path="/settings" element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Settings />
              </PrivateRoute>
            }/>
            <Route 
              path="/checkout" 
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route 
              path="/checkout/success" 
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <CheckoutSuccess />
                </PrivateRoute>
              }
            />
            <Route 
              path="/cart"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Cart/>
                </PrivateRoute>
              }
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}