import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import CatalogPage from './components/CatalogPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import CartPage from './components/CartPage.jsx'
import OrdersPage from './components/OrdersPage.jsx'
import AdminPage from './components/AdminPage.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
