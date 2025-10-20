import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ContactSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // PROGRAMMATIC NAVIGATION: Auto redirect setelah 5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/contact', { 
        replace: true,
        state: { autoRedirect: true }
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoBack = () => {
    // PROGRAMMATIC NAVIGATION: Kembali ke halaman contact
    navigate('/contact', { 
      state: { fromSuccess: true }
    });
  };

  const handleGoHome = () => {
    // PROGRAMMATIC NAVIGATION: Ke halaman home
    navigate('/');
  };

  const handleNewMessage = () => {
    // PROGRAMMATIC NAVIGATION: Ke halaman contact dengan state reset
    navigate('/contact', { 
      replace: true,
      state: { newMessage: true }
    });
  };

  return (
    <div className="page-container">
      <div className="success-page">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h1>Pesan Terkirim!</h1>
          <p>Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda dalam 1-2 hari kerja.</p>
          
          {location.state?.message && (
            <div className="success-message-detail">
              <p><strong>Detail:</strong> {location.state.message}</p>
            </div>
          )}

          <div className="success-actions">
            <button onClick={handleNewMessage} className="cta-button primary">
              Kirim Pesan Baru
            </button>
            <button onClick={handleGoBack} className="cta-button secondary">
              Kembali ke Kontak
            </button>
            <button onClick={handleGoHome} className="cta-button secondary">
              Ke Beranda
            </button>
          </div>

          <div className="auto-redirect-notice">
            <p>Anda akan diarahkan otomatis ke halaman kontak dalam 5 detik...</p>
          </div>
        </div>
      </div>
    </div>
  );
}