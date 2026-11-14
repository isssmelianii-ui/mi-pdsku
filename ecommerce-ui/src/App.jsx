import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductListPage from './pages/ProductListPage'
import ReviewsPage from './pages/ReviewsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const [userId, setUserId] = useState(() => Number(localStorage.getItem('userId')) || 1)

  function changeUser(value) {
    setUserId(value)
    localStorage.setItem('userId', String(value))
  }

  return (
    <div className="admin-container">
      {/* Sidebar Kiri Tetap (Seperti Panel Admin/Dashboard) */}
      <AdminSidebar userId={userId} onUserChange={changeUser} />

      {/* Area Konten Utama di Sebelah Kanan */}
      <div className="admin-main-wrapper">
        <header className="admin-topbar">
          <div>
            <span style={{ fontSize: '0.85rem', color: '#646cff', fontWeight: 'bold' }}>PANEL KONTROL SISTEM</span>
            <h1 style={{ fontSize: '1.25rem', margin: 0, color: '#1e293b' }}>Dashboard Pengelola E-Commerce</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>● Sistem Online</span>
          </div>
        </header>

        <main className="admin-content">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage userId={userId} />} />
            <Route path="/cart" element={<CartPage userId={userId} />} />
            <Route path="/orders" element={<OrdersPage userId={userId} />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<p style={{ textAlign: 'center', padding: '3rem' }}>Halaman tidak ditemukan.</p>} />
          </Routes>
        </main>

        <footer style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '1rem 2rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Mi-PDSKU Microservices Dashboard • Tugas Ismeliani Sistem Informasi
        </footer>
      </div>
    </div>
  )
}