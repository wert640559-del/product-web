import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Dapatkan halaman sebelumnya dari state location, default ke dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validasi input
    if (!username.trim() || !password.trim()) {
      setError('Username dan password harus diisi!');
      setIsLoading(false);
      return;
    }

    // Simulasi proses login dengan timeout
    setTimeout(() => {
      // Validasi credentials khusus
      if (username === 'admin' && password === 'password123') {
        // Generate random token untuk simulasi
        const authToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const userData = { 
          name: 'Muhammad Harits', 
          username: username,
          role: 'Administrator'
        };
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Panggil fungsi onLogin dari prop
        onLogin(userData);
        
        // PROGRAMMATIC NAVIGATION: Redirect setelah login berhasil
        console.log('Login berhasil! Mengarahkan ke:', from);
        
        // Navigasi dengan replace: true agar halaman login tidak bisa di-back
        navigate(from, { 
          replace: true,
          state: { 
            message: 'Login berhasil! Selamat datang kembali.',
            timestamp: new Date().toISOString()
          }
        });
      } else {
        setError('Username atau password salah!');
      }
      setIsLoading(false);
    }, 1500);

    setUsername('');
    setPassword('');
    setError('');
  };

  const handleCancel = () => {
    // PROGRAMMATIC NAVIGATION: Kembali ke halaman sebelumnya
    if (location.key !== 'default') {
      navigate(-1); // Kembali 1 langkah dalam history
    } else {
      navigate('/'); // Kembali ke home jika tidak ada history
    }
  };

  const handleGoToHome = () => {
    // PROGRAMMATIC NAVIGATION: Navigasi langsung ke home
    navigate('/', { 
      state: { from: 'login-page' }
    });
  };

  const clearForm = () => {
    
  };

  return (
    <div className="page-container" style={{ paddingTop: '2rem' }}>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Login</h1>
            <p>Masuk ke akun Anda</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              <div className="error-icon">⚠️</div>
              <div className="error-message">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="Masukkan username"
                className="form-input"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Masukkan password"
                className="form-input"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Memproses...
                  </>
                ) : 'Login'}
              </button>
            </div>
          </form>

          <div className="login-secondary-actions">
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Kembali
            </button>
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleGoToHome}
              disabled={isLoading}
            >
              Ke Beranda
            </button>
          </div>

          <div className="login-info">
            <p><strong>Testing Login:</strong></p>
            <p>Username: <strong>admin</strong></p>
            <p>Password: <strong>password123</strong></p>
            <p className="note">*Hanya akun di atas yang bisa login</p>
          </div>
        </div>
      </div>
    </div>
  );
}