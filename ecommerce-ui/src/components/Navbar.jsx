import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ userId, onUserChange }) {
  const location = useLocation()

  return (
    <div className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100, background: '#fff' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', color: '#111827' }}>
        <span style={{ fontSize: '1.5rem', background: '#4f46e5', color: '#fff', padding: '0.35rem 0.6rem', borderRadius: '8px' }}>
          🛒
        </span>
        <div>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', display: 'block', lineHeight: '1.1' }}>Mi-PDSKU</span>
          <span className="muted" style={{ fontSize: '0.7rem', letterSpacing: '1px', fontWeight: '600' }}>MICROSERVICES STORE</span>
        </div>
      </Link>

      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Katalog Produk
        </Link>
        <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
          Keranjang
        </Link>
        <Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>
          Pesanan Saya
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f3f4f6', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>
          <span className="muted" style={{ fontSize: '0.8rem', fontWeight: '600' }}>User Aktif:</span>
          <select
            value={userId}
            onChange={(e) => onUserChange(Number(e.target.value))}
            style={{ padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontWeight: '600', color: '#4f46e5' }}
          >
            <option value="1">User 1 (Budi)</option>
            <option value="2">User 2 (Siti)</option>
            <option value="3">User 3 (Andi)</option>
            <option value="4">User 4 (Rina)</option>
            <option value="5">User 5 (Meliani)</option>
          </select>
        </div>
      </nav>
    </div>
  )
}