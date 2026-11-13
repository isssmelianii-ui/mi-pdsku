import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ userId, onUserChange }) {
  const location = useLocation()

  return (
    <div className="navbar">
      {/* Logo Toko dengan Ikon Keranjang Belanja */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#213547' }}>
        <span style={{ fontSize: '1.5rem', background: '#eef2ff', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🛍️
        </span>
        <div>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'block', lineHeight: '1.2' }}>Mi-PDSKU</span>
          <span className="muted" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>OFFICIAL E-SHOP</span>
        </div>
      </Link>

      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Beranda & Produk
        </Link>
        <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
          Keranjang Saya 🛒
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="muted">Akun:</span>
          <select
            value={userId}
            onChange={(e) => onUserChange(Number(e.target.value))}
            style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
            <option value="4">User 4</option>
            <option value="5">User 5</option>
          </select>
        </div>
      </nav>
    </div>
  )
}