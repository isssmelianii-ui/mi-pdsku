// src/pages/CartPage.jsx
import { clearCart, removeCartItem, updateCartItem } from '../api/cartApi'
import { getCartDetail } from '../api/aggregate'
import AsyncView from '../components/AsyncView'
import { useAsync } from '../hooks/useAsync'
import { formatRupiah } from '../utils/format'

export default function CartPage({ userId }) {
  const { loading, data, error, reload } = useAsync(() => getCartDetail(userId), [userId])

  async function handleQuantityChange(itemId, qty) {
    if (qty <= 0) await removeCartItem(itemId)
    else await updateCartItem(itemId, qty)
    reload()
  }

  async function handleRemove(itemId) {
    await removeCartItem(itemId)
    reload()
  }

  async function handleClear() {
    await clearCart(userId)
    reload()
  }

  return (
    <AsyncView loading={loading} error={error} onRetry={reload}>
      <h2>Keranjang Belanja (User {userId})</h2>
      {data && data.items.length === 0 && <p className="muted">Keranjang kosong.</p>}
      {data && data.items.length > 0 && (
        <div className="cart-container">
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
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product ? item.product.name : `Produk #${item.product_id}`}</td>
                  <td>{item.product ? formatRupiah(item.product.price) : '-'}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    />
                  </td>
                  <td>
                    {item.product
                      ? formatRupiah(Number(item.product.price) * item.quantity)
                      : '-'}
                  </td>
                  <td>
                    <button type="button" onClick={() => handleRemove(item.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Total: {formatRupiah(data.totalPrice)}</h3>
            <button type="button" className="btn-danger" onClick={handleClear}>
              Kosongkan Keranjang
            </button>
          </div>
        </div>
      )}
    </AsyncView>
  )
}