import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetailPage({ userId }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const productsData = {
    '1': {
      id: 1,
      name: 'Laptop Gaming Pro',
      category: 'Elektronik',
      price: 12000000,
      stock: 10,
      description: 'Laptop gaming performa tinggi dengan grafis mutakhir untuk kebutuhan gaming dan pekerjaan berat Anda.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60'
    },
    '2': {
      id: 2,
      name: 'Sepatu Sneakers Casual',
      category: 'Fashion',
      price: 350000,
      stock: 25,
      description: 'Sepatu nyaman untuk aktivitas sehari-hari dan santai dengan bahan berkualitas tinggi.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'
    },
    '3': {
      id: 3,
      name: 'Jam Tangan Minimalis',
      category: 'Aksesori',
      price: 750000,
      stock: 15,
      description: 'Jam tangan elegan dengan desain minimalis modern yang cocok untuk acara formal maupun santai.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
    },
    '4': {
      id: 4,
      name: 'Headphone Bluetooth',
      category: 'Elektronik',
      price: 850000,
      stock: 8,
      description: 'Suara jernih dengan fitur peredam bising aktif untuk pengalaman mendengarkan musik terbaik.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
    }
  }

  const product = productsData[id] || productsData['1']

  const handleAddToCart = () => {
    // Ambil data keranjang dari localStorage atau buat baru
    const existingCart = JSON.parse(localStorage.getItem(`cart_user_${userId}`)) || []
    
    // Cek apakah produk sudah ada di keranjang
    const itemIndex = existingCart.findIndex(item => item.product.id === product.id)
    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1
    } else {
      existingCart.push({ id: Date.now(), product, quantity: 1 })
    }

    localStorage.setItem(`cart_user_${userId}`, JSON.stringify(existingCart))
    alert(`Berhasil menambahkan ${product.name} ke keranjang (User ${userId})!`)
    navigate('/cart')
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '1.5rem', background: '#f0f0f0', color: '#213547' }}
      >
        ← Kembali
      </button>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', height: '320px', borderRadius: '8px', overflow: 'hidden', background: '#f5f5f5' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div>
          <span className="muted" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{product.category}</span>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem 0', color: '#213547' }}>{product.name}</h1>
          <div className="price" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
            Rp {Number(product.price).toLocaleString('id-ID')}
          </div>
          <p className="muted" style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {product.description}
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="muted">Stok Tersedia: </span>
            <strong style={{ color: '#2e7d32' }}>{product.stock} Unit</strong>
          </div>

          <button onClick={handleAddToCart} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>
            🛒 Tambahkan ke Keranjang
          </button>
        </div>
      </div>
    </div>
  )
}