import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function OrdersPage({ userId }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem(`orders_user_${userId}`)) || []
    setOrders(savedOrders)
  }, [userId])

  return (
    <div className="container">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>📦 Riwayat Pesanan (User {userId})</h2>
        <span className="muted">Terhubung dengan Order Service (MySQL)</span>
      </div>

      {orders.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Belum ada riwayat transaksi untuk User {userId}</p>
          <p className="muted" style={{ marginBottom: '1.5rem' }}>Silakan pilih produk dan lakukan checkout dari keranjang belanja Anda.</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button>Belanja Sekarang</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div key={order.orderId} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <strong>Order ID: #{order.orderId}</strong>
                  <span className="muted" style={{ marginLeft: '1rem' }}>{order.date}</span>
                </div>
                <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>
                  ✓ {order.status}
                </span>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <span>{item.product.name} (x{item.quantity})</span>
                  <strong>Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</strong>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="muted">Total Pembayaran</span>
                <span className="price">Rp {order.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}