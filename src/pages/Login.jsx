import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dapatkan halaman sebelumnya dari state location, default ke dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi proses login dengan timeout
    setTimeout(() => {
      if (username && password) {
        // Generate random token untuk simulasi
        const authToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const userData = { 
          name: 'Muhammad Harits', 
          username: username 
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
        alert('Username dan password harus diisi!');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = () => {
    setUsername('admin');
    setPassword('password123');
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

  return (
    <div className="page-container" style={{ paddingTop: '2rem' }}>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Login</h1>
            <p>Masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="form-input"
                required
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

              <button 
                type="button" 
                className="demo-btn"
                onClick={handleDemoLogin}
              >
                Isi Demo Credentials
              </button>
            </div>
          </form>

          <div className="login-secondary-actions">
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleCancel}
            >
              Kembali
            </button>
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleGoToHome}
            >
              Ke Beranda
            </button>
          </div>

          <div className="login-info">
            <p><strong>Demo credentials:</strong></p>
            <p>Username: admin</p>
            <p>Password: password123</p>
            <p className="note">*Isi form dan klik Login</p>
          </div>
        </div>
      </div>
    </div>
  );
}