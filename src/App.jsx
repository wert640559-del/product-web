import React from "react"
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./App.css";

export default function App() {
    return (
        <div className="app-container">
            <nav>
                <h1>Aplikasi React Router</h1>
                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                    >
                        Beranda
                    </NavLink>

                    <NavLink 
                        to='/about'
                        className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                    >
                        Tentang
                    </NavLink>

                    <NavLink 
                        to="/products"
                        className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                    >
                        Produk
                    </NavLink>

                    <NavLink 
                        to="/dashboard"
                        className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink 
                        to="/contact"
                        className={({isActive}) => (isActive ? 'active-link' : 'nav-link')}
                    >
                        Kontak
                    </NavLink>
                </div>
            </nav>

            <hr />

            <main>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:productId" element={<ProductDetail/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/contact" element={<Contact />}/>
                </Routes>
            </main>
        </div>
    )
}