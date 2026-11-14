export default function ReviewsPage() {
  return (
    <div>
      <h2>⭐ Manajemen Ulasan & Review Produk</h2>
      <p className="muted" style={{ marginBottom: '1.5rem' }}>Terhubung dengan Review Service (MongoDB) untuk memantau feedback pelanggan.</p>
      
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3>Daftar Ulasan Masuk</h3>
        <div className="review-card" style={{ marginTop: '1rem' }}>
          <strong>User 2 (Siti)</strong> <span className="muted">| Laptop Gaming Pro RTX</span>
          <div className="stars">★★★★★</div>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Barangnya original, pengiriman cepat, dan kualitas sesuai deskripsi. Sangat puas!</p>
        </div>
        <div className="review-card" style={{ marginTop: '1rem' }}>
          <strong>User 3 (Andi)</strong> <span className="muted">| Sepatu Sneakers Casual</span>
          <div className="stars">★★★★☆</div>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Packing sangat rapi dan aman. Nyaman dipakai seharian.</p>
        </div>
      </div>
    </div>
  )
}