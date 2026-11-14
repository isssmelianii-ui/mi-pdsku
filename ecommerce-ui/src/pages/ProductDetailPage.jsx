import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetailPage({ userId }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([])

  const productsData = {
    '1': {
      id: 1,
      name: 'Laptop Gaming Pro RTX',
      category: 'Elektronik',
      price: 12000000,
      stock: 10,
      specs: { Kondisi: 'Baru', Garansi: '2 Tahun Resmi', Berat: '2.3 kg', Pengiriman: 'Dari Padang' },
      description: 'Laptop gaming performa tinggi dengan GPU RTX Series, RAM 16GB DDR5, SSD NVMe 512GB, dan layar 144Hz.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60'
    },
    '2': {
      id: 2,
      name: 'Sepatu Sneakers Casual',
      category: 'Fashion',
      price: 350000,
      stock: 25,
      specs: { Kondisi: 'Baru', Bahan: 'Mesh & Karet', Berat: '800 gr', Pengiriman: 'Dari Padang' },
      description: 'Sepatu sneakers ringan dengan sirkulasi udara baik dan sol anti-slip.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60'
    },
    '3': {
      id: 3,
      name: 'Jam Tangan Minimalis',
      category: 'Aksesori',
      price: 750000,
      stock: 15,
      specs: { Kondisi: 'Baru', 'Ketahanan Air': '3 ATM', Garansi: '1 Tahun', Pengiriman: 'Dari Padang' },
      description: 'Jam tangan analog minimalis dengan kaca mineral tahan gores dan tali kulit sintetis.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60'
    },
    '4': {
      id: 4,
      name: 'Headphone Wireless ANC',
      category: 'Elektronik',
      price: 850000,
      stock: 8,
      specs: { Kondisi: 'Baru', Koneksi: 'Bluetooth 5.3', Baterai: '30 Jam', Pengiriman: 'Dari Padang' },
      description: 'Headphone over-ear empuk dengan fitur peredam bising aktif (ANC).',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60'
    },
    '5': {
      id: 5,
      name: 'AC Inverter 1/2 PK Hemat Listrik',
      category: 'Elektronik',
      price: 3800000,
      stock: 6,
      specs: { Kondisi: 'Baru', PK: '1/2 PK Inverter', Garansi: '5 Tahun Kompresor', Pengiriman: 'Dari Padang' },
      description: 'AC pendingin ruangan hemat energi dengan teknologi inverter dan mode pendinginan cepat tanpa bising.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=60'
    },
    '6': {
      id: 6,
      name: 'Tas Ransel Kulit Premium',
      category: 'Aksesori',
      price: 450000,
      stock: 20,
      specs: { Kondisi: 'Baru', Bahan: 'Kulit Sintetis', Kapasitas: '25 Liter', Pengiriman: 'Dari Padang' },
      description: 'Tas ransel elegan berbahan kulit sintetis premium untuk kerja dan kuliah dengan kompartemen laptop.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60'
    }
  }

  const product = productsData[id] || productsData['1']

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews_product_${product.id}`)) || [
      {
        id: 101,
        userName: 'User 2 (Siti)',
        rating: 5,
        date: '12 Nov 2026',
        comment: 'Barangnya original, pengiriman cepat, dan kualitas sesuai deskripsi. Sangat puas!'
      }
    ]
    setReviews(savedReviews)
  }, [product.id])

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem(`cart_user_${userId}`)) || []
    const itemIndex = existingCart.findIndex((item) => item.product.id === product.id)

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += qty
    } else {
      existingCart.push({ id: Date.now(), product, quantity: qty })
    }

    localStorage.setItem(`cart_user_${userId}`, JSON.stringify(existingCart))
    alert(`Berhasil menambahkan ${qty}x ${product.name} ke keranjang!`)
    navigate('/cart')
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newReview = {
      id: Date.now(),
      userName: `User ${userId}`,
      rating: Number(rating),
      date: 'Hari ini',
      comment: comment.trim()
    }

    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)
    localStorage.setItem(`reviews_product_${product.id}`, JSON.stringify(updatedReviews))
    setComment('')
    setRating(5)
  }

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  return (
    <div className="container">
      <button
        onClick={() => navigate('/')}
        style={{ marginBottom: '1.5rem', background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db' }}
      >
        ← Kembali ke Katalog
      </button>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ width: '100%', height: '360px', borderRadius: '8px', overflow: 'hidden', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="badge">{product.category}</span>
              <span style={{ fontSize: '0.9rem' }}>
                <span className="stars">★</span> <strong>{averageRating}</strong> ({reviews.length} Ulasan)
              </span>
            </div>

            <h1 style={{ fontSize: '1.85rem', margin: '0.25rem 0 0.75rem 0', color: '#111827' }}>{product.name}</h1>

            <div className="price" style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>
              Rp {product.price.toLocaleString('id-ID')}
            </div>

            <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#374151' }}>Spesifikasi Produk:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <span className="muted">{key}: </span>
                    <strong>{val}</strong>
                  </div>
                ))}
              </div>
            </div>

            <p className="muted" style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {product.description}
            </p>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Jumlah Beli:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ background: 'transparent', color: '#111827', padding: '0.35rem 0.75rem' }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.75rem', fontWeight: 'bold' }}>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  style={{ background: 'transparent', color: '#111827', padding: '0.35rem 0.75rem' }}
                >
                  +
                </button>
              </div>
              <span className="muted">Tersisa {product.stock} unit</span>
            </div>

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}>
              🛒 Tambahkan ke Keranjang (Rp {(product.price * qty).toLocaleString('id-ID')})
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem' }}>⭐ Ulasan Pembeli ({reviews.length})</h2>
            <span className="muted">Data terintegrasi dengan Review Service (MongoDB)</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>{averageRating}</span>
            <span className="muted"> / 5.0</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ marginTop: 0, fontSize: '1.05rem' }}>Tulis Ulasan Anda (sebagai User {userId})</h3>
            <form onSubmit={handleSubmitReview} className="form" style={{ marginTop: '0.75rem' }}>
              <label>
                Rating Bintang:
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="5">⭐⭐⭐⭐⭐ (5 - Sangat Puas)</option>
                  <option value="4">⭐⭐⭐⭐ (4 - Puas)</option>
                  <option value="3">⭐⭐⭐ (3 - Cukup)</option>
                  <option value="2">⭐⭐ (2 - Kurang)</option>
                  <option value="1">⭐ (1 - Kecewa)</option>
                </select>
              </label>

              <label>
                Komentar Ulasan:
                <textarea
                  rows="3"
                  placeholder="Bagikan pengalaman Anda menggunakan produk ini..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </label>

              <button type="submit">Kirim Ulasan</button>
            </form>
          </div>

          <div>
            <h3 style={{ marginTop: 0, fontSize: '1.05rem', marginBottom: '0.75rem' }}>Semua Komentar</h3>
            {reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong>{rev.userName}</strong>
                  <span className="muted">{rev.date}</span>
                </div>
                <div className="stars" style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151' }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}