import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'

// styles
import './styles/index.css'
import './styles/components/Navigation.css'
import './styles/components/ProductCard.css'
import './styles/pages/Home.css'
import './styles/pages/About.css'
import './styles/pages/Products.css'
import './styles/pages/ProductDetail.css'
import './styles/pages/Contact.css'
import './styles/pages/Dashboard.css'
import './styles/pages/Profile.css'
import './styles/pages/Settings.css'
import './styles/pages/Login.css'
import './styles/pages/NotFound.css'
import './styles/pages/ProductSearch.css'
import './styles/pages/Cart.css'
import './styles/pages/Checkout.css'
import './styles/pages/CheckoutSuccess.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
