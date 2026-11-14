import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductListPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [maxPrice, setMaxPrice] = useState(15000000)
  const [sortBy, setSortBy] = useState('default')

  const products = [
    {
      id: 1,
      name: 'Laptop Gaming Pro RTX',
      category: 'Elektronik',
      price: 12000000,
      stock: 10,
      rating: 4.9,
      reviewsCount: 24,
      description: 'Laptop gaming performa tinggi dengan prosesor generasi terbaru dan layar 144Hz.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: 'Sepatu Sneakers Casual',
      category: 'Fashion',
      price: 350000,
      stock: 25,
      rating: 4.7,
      reviewsCount: 58,
      description: 'Sepatu ringan dan empuk untuk aktivitas kuliah maupun jalan santai.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: 'Jam Tangan Minimalis',
      category: 'Aksesori',
      price: 750000,
      stock: 15,
      rating: 4.8,
      reviewsCount: 19,
      description: 'Jam tangan strap kulit sintetis premium tahan air dengan desain elegan.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      name: 'Headphone Wireless ANC',
      category: 'Elektronik',
      price: 850000,
      stock: 8,
      rating: 4.6,
      reviewsCount: 31,
      description: 'Audio jernih dengan fitur Active Noise Cancelling dan baterai 30 jam.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      name: 'AC Inverter 1/2 PK Hemat Listrik',
      category: 'Elektronik',
      price: 3800000,
      stock: 6,
      rating: 4.9,
      reviewsCount: 14,
      description: 'AC pendingin ruangan hemat energi dengan teknologi inverter dan mode pendinginan cepat.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      name: 'Tas Ransel Kulit Premium',
      category: 'Aksesori',
      price: 450000,
      stock: 20,
      rating: 4.8,
      reviewsCount: 35,
      description: 'Tas ransel elegan berbahan kulit sintetis premium untuk kerja dan kuliah.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60'
    }
  ]

  const categories = ['Semua', 'Elektronik', 'Fashion', 'Aksesori']

  const filteredProducts = products
    .filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory
      const matchPrice = item.price <= maxPrice
      return matchSearch && matchCategory && matchPrice
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const resetFilters = () => {
    setSearch('')
    setSelectedCategory('Semua')
    setMaxPrice(15000000)
    setSortBy('default')
  }

  return (
    <div className="shop-container">
      {/* BANNER UTAMA */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '12px', padding: '2rem', color: '#fff', boxShadow: '0 4px 20px rgba(79, 70, 229, 0.15)' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          🔥 Flash Sale & Promo Spesial
        </span>
        <h1 style={{ fontSize: '1.85rem', margin: '0.5rem 0 0.5rem 0', fontWeight: '800' }}>Temukan Produk Impian Anda</h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>Belanja aman, cepat, dan terpercaya dengan pilihan produk berkualitas tinggi.</p>
      </div>

      {/* BAR FILTER ATAS (Kategori, Pencarian, Batas Harga, & Urutkan tersusun rapi secara horizontal) */}
      <div className="filter-bar">
        {/* Kategori Tab */}
        <div className="category-tabs">
          {categories.map((cat) => {
            const count = cat === 'Semua' ? products.length : products.filter((p) => p.category === cat).length
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-tab-btn ${isActive ? 'active' : ''}`}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>

        {/* Kolom Pencarian */}
        <div style={{ flex: '1', minWidth: '200px', maxWidth: '280px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '10px', fontSize: '0.9rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 2.1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>
        </div>

        {/* Slider Batas Harga & Tombol Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '240px' }}>
          <div style={{ flex: '1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#4f46e5', marginBottom: '0.2rem' }}>
              <span>Maks Harga</span>
              <span>Rp {maxPrice.toLocaleString('id-ID')}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="15000000"
              step="100000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#4f46e5', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff', cursor: 'pointer' }}
            >
              <option value="default">Urutkan</option>
              <option value="rating">Rating ★</option>
              <option value="price-asc">Termurah</option>
              <option value="price-desc">Termahal</option>
            </select>

            <button
              onClick={resetFilters}
              title="Reset Filter"
              style={{ padding: '0.5rem 0.75rem', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* AREA KATALOG PRODUK (Full-width / Lebar Penuh ke samping) */}
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>
            {selectedCategory === 'Semua' ? 'Semua Katalog Produk' : `Kategori: ${selectedCategory}`}
          </h2>
          <span className="muted" style={{ fontSize: '0.88rem' }}>Menampilkan {filteredProducts.length} produk</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>Produk tidak ditemukan</p>
            <p className="muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Coba ubah kata kunci pencarian atau batas harga.</p>
            <button onClick={resetFilters} style={{ padding: '0.5rem 1.25rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Reset Filter</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.15rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div>
                  <div style={{ position: 'relative', height: '170px', overflow: 'hidden', borderRadius: '8px', marginBottom: '0.85rem', background: '#f1f5f9' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="badge" style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(255,255,255,0.92)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#4f46e5' }}>
                      {product.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                    <span className="stars" style={{ color: '#f59e0b' }}>★</span>
                    <strong style={{ color: '#1e293b' }}>{product.rating}</strong>
                    <span className="muted" style={{ color: '#64748b' }}>({product.reviewsCount} ulasan)</span>
                  </div>

                  <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem' }}>
                    <Link to={`/products/${product.id}`} style={{ color: '#1e293b', textDecoration: 'none', fontWeight: '700' }}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.4', color: '#64748b' }}>
                    {product.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginBottom: '0.85rem' }}>
                    <span className="price" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>Rp {product.price.toLocaleString('id-ID')}</span>
                    <span className="muted" style={{ fontSize: '0.80rem', color: '#64748b' }}>Stok: {product.stock}</span>
                  </div>

                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{ width: '100%', padding: '0.5rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textAlign: 'center' }}>Detail & Ulasan</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}