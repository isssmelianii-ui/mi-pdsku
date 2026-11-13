import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductListPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  const products = [
    {
      id: 1,
      name: 'Laptop Gaming Pro',
      category: 'Elektronik',
      price: 12000000,
      stock: 10,
      description: 'Laptop gaming performa tinggi dengan grafis mutakhir.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: 'Sepatu Sneakers Casual',
      category: 'Fashion',
      price: 350000,
      stock: 25,
      description: 'Sepatu nyaman untuk aktivitas sehari-hari.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: 'Jam Tangan Minimalis',
      category: 'Aksesori',
      price: 750000,
      stock: 15,
      description: 'Jam tangan elegan dengan desain minimalis modern.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      name: 'Headphone Bluetooth',
      category: 'Elektronik',
      price: 850000,
      stock: 8,
      description: 'Suara jernih dengan fitur peredam bising.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
    }
  ]

  const categories = ['Semua', ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Header Katalog yang Elegan dan Unik */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
        <div>
          <span className="muted" style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Katalog Mi-PDSKU</span>
          <h1 style={{ fontSize: '1.75rem', margin: '0.25rem 0 0 0', color: '#213547' }}>Daftar Produk Unggulan</h1>
        </div>
        <span className="muted">Menampilkan {filteredProducts.length} produk pilihan</span>
      </div>

      {/* Filter Kategori & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: selectedCategory === cat ? '#646cff' : '#f0f0f0',
                color: selectedCategory === cat ? '#fff' : '#213547',
                borderRadius: '6px',
                padding: '0.5rem 1rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Cari produk berdasarkan nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ccc', minWidth: '280px' }}
        />
      </div>

      {/* Grid Produk */}
      {filteredProducts.length === 0 ? (
        <div className="alert alert-error">Produk yang Anda cari tidak ditemukan dalam sistem.</div>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '170px', overflow: 'hidden', borderRadius: '6px', marginBottom: '1rem', background: '#f5f5f5' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span className="muted" style={{ fontSize: '0.8rem' }}>{product.category}</span>
                <h3 style={{ margin: '0.25rem 0 0.5rem 0' }}>
                  <Link to={`/products/${product.id}`} style={{ color: '#213547', textDecoration: 'none' }}>{product.name}</Link>
                </h3>
                <p className="muted" style={{ fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '1rem', minHeight: '38px' }}>
                  {product.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '0.75rem' }}>
                  <span className="price">Rp {Number(product.price).toLocaleString('id-ID')}</span>
                  <span className="muted" style={{ fontSize: '0.8rem' }}>Stok: {product.stock}</span>
                </div>

                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <button style={{ width: '100%' }}>Lihat Detail Produk</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}