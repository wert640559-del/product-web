import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigationDemo() {
  const navigate = useNavigate();

  const navigationExamples = [
    {
      label: 'Go Back (-1)',
      action: () => navigate(-1),
      description: 'Kembali ke halaman sebelumnya'
    },
    {
      label: 'Go Forward (+1)',
      action: () => navigate(1),
      description: 'Maju ke halaman berikutnya'
    },
    {
      label: 'Go Home (Replace)',
      action: () => navigate('/', { replace: true }),
      description: 'Ke beranda dan ganti history'
    },
    {
      label: 'With State Data',
      action: () => navigate('/about', { 
        state: { 
          from: 'navigation-demo',
          message: 'Ini data state dari navigasi programatik!',
          timestamp: new Date().toISOString()
        }
      }),
      description: 'Navigasi dengan membawa data state'
    },
    {
      label: 'Relative Path',
      action: () => navigate('../products'),
      description: 'Navigasi dengan path relatif'
    }
  ];

  return (
    <div className="navigation-demo">
      <h3>Demo Programmatic Navigation</h3>
      <div className="navigation-buttons">
        {navigationExamples.map((example, index) => (
          <button
            key={index}
            onClick={example.action}
            className="nav-demo-btn"
            title={example.description}
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}