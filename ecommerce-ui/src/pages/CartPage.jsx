import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CartPage({ userId }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(`cart_user_${userId}`)) || [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Laptop Gaming Pro',
          price: 12000000,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60'
        },
        quantity: 1
      }
    ]
    setCartItems(savedCart)
  }, [userId])

  const handleRemove = (cartId) => {
    const updatedCart = cartItems.filter(item => item.id !== cartId)
    setCartItems(updatedCart)
    localStorage.setItem(`cart_user_${userId}`, JSON.stringify(updatedCart))
  }

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0
    const qty = item.quantity || 1
    return acc + price * qty
  }, 0)

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>🛒 Keranjang Belanja Anda (User {userId})</h2>

      {cartItems.length === 0 ? (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="alert" style={{ background: '#f5f5f5', color: '#666', border: '1px solid #ddd' }}>
            Keranjang belanja Anda masih kosong.
          </div>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
            <button>Mulai Belanja</button>
          </Link>
        </div>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Subtotal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <span style={{ fontWeight: '500' }}>{item.product.name}</span>
                  </td>
                  <td>Rp {Number(item.product.price).toLocaleString('id-ID')}</td>
                  <td>{item.quantity}</td>
                  <td className="price" style={{ fontSize: '1rem' }}>
                    Rp {Number(item.product.price * item.quantity).toLocaleString('id-ID')}
                  </td>
                  <td>
                    <button className="btn-danger" onClick={() => handleRemove(item.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary card" style={{ marginTop: '2rem' }}>
            <div>
              <span className="muted">Total Pembayaran:</span>
              <div className="price" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>
                Rp {Number(totalPrice).toLocaleString('id-ID')}
              </div>
            </div>
            <button onClick={() => alert('Checkout berhasil! Terima kasih sudah berbelanja.')}>
              Lanjutkan ke Checkout 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}