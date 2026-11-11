// src/pages/ProductDetailPage.jsx
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { addToCart } from '../api/cartApi'
import { getProductDetail } from '../api/aggregate'
import AsyncView from '../components/AsyncView'
import ReviewForm from '../components/ReviewForm'
import StarRating from '../components/StarRating'
import { describeError, formatRupiah } from '../utils/format'
import { useAsync } from '../hooks/useAsync'

export default function ProductDetailPage({ userId }) {
  const { id } = useParams()
  const { loading, data, error, reload } = useAsync(() => getProductDetail(Number(id)), [id])

  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [message, setMessage] = useState(null)
  const [cartError, setCartError] = useState(null)

  async function handleAddToCart() {
    setAdding(true)
    setMessage(null)
    setCartError(null)
    try {
      await addToCart(userId, Number(id), quantity)
      setMessage('Produk berhasil dimasukkan ke keranjang!')
    } catch (err) {
      setCartError(err)
    } finally {
      setAdding(false)
    }
  }

  return (
    <AsyncView loading={loading} error={error} onRetry={reload}>
      {data && (
        <div className="product-detail">
          <h2>{data.product.name}</h2>
          <p className="price">{formatRupiah(data.product.price)}</p>
          <p className="muted">Stok: {data.product.stock}</p>
          <p>{data.product.description}</p>

          <div className="cart-action">
            <input
              type="number"
              min="1"
              max={data.product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button type="button" onClick={handleAddToCart} disabled={adding}>
              {adding ? 'Menambahkan...' : 'Tambah ke Keranjang'}
            </button>
          </div>
          {message && <p className="alert alert-success">{message}</p>}
          {cartError && <p className="alert alert-error">{describeError(cartError)}</p>}

          <hr />
          <section>
            <h3>Ulasan Produk</h3>
            {data.reviews ? (
              <>
                <StarRating
                  average={data.reviews.summary.average_rating}
                  total={data.reviews.summary.total_reviews}
                />
                <ul className="review-list">
                  {data.reviews.items.map((rev) => (
                    <li key={rev.id}>
                      <strong>User {rev.user_id}</strong> -{' '}
                      <StarRating average={rev.rating} total={1} compact />
                      <p>{rev.comment}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="muted">Gagal memuat ulasan.</p>
            )}

            <ReviewForm productId={Number(id)} userId={userId} onCreated={reload} />
          </section>
        </div>
      )}
    </AsyncView>
  )
}