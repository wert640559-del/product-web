import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // PROGRAMMATIC NAVIGATION: Redirect ke login setelah logout
    onLogout();
    
    // Navigasi ke halaman login dengan state message
    navigate('/login', { 
      replace: true,
      state: { 
        message: 'Logout berhasil! Sampai jumpa kembali.',
        from: 'logout'
      }
    });
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Keluar
    </button>
  );
}