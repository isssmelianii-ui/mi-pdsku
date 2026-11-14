import { Link, useLocation } from 'react-router-dom'

export default function AdminSidebar({ userId, onUserChange }) {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Ringkasan & Katalog', icon: '📊' },
    { path: '/cart', label: 'Keranjang Belanja', icon: '🛒' },
    { path: '/orders', label: 'Laporan Pesanan', icon: '📦' },
    { path: '/reviews', label: 'Ulasan Produk', icon: '⭐' },
    { path: '/settings', label: 'Pengaturan Toko', icon: '⚙️' }
  ]

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <span style={{ fontSize: '1.4rem', background: '#4f46e5', padding: '0.3rem 0.5rem', borderRadius: '6px', color: '#fff' }}>🛍️</span>
        <div>
          <span>Mi-PDSKU</span>
          <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'normal' }}>Admin & Store Panel</div>
        </div>
      </div>

      <div className="admin-sidebar-menu">
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', padding: '0.5rem 1rem', fontWeight: '700', letterSpacing: '0.5px' }}>
          Menu Utama
        </div>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-menu-item ${isActive ? 'active' : ''}`}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Bagian Bawah Sidebar (Ganti User Akun) */}
      <div style={{ padding: '1rem', borderTop: '1px solid #1e293b', background: '#090d16' }}>
        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.35rem' }}>Akun Aktif Sistem:</div>
        <select
          value={userId}
          onChange={(e) => onUserChange(Number(e.target.value))}
          style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', background: '#1e293b', color: '#fff', border: '1px solid #334155', fontSize: '0.85rem' }}
        >
          <option value="1">User 1 (Budi)</option>
          <option value="2">User 2 (Siti)</option>
          <option value="3">User 3 (Andi)</option>
          <option value="4">User 4 (Rina)</option>
          <option value="5">User 5 (Meliani)</option>
        </select>
      </div>
    </aside>
  )
}