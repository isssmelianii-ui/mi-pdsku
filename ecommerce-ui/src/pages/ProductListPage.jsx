// src/pages/ProductListPage.jsx
import { getProductsWithRating } from '../api/aggregate'
import AsyncView from '../components/AsyncView'
import ProductCard from '../components/ProductCard'
import { useAsync } from '../hooks/useAsync'

export default function ProductListPage() {
  const { loading, data: products, error, reload } = useAsync(getProductsWithRating)

  return (
    <AsyncView loading={loading} error={error} onRetry={reload}>
      <h2>Daftar Produk</h2>
      {products && products.length === 0 && <p className="muted">Belum ada produk.</p>}
      <div className="grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </AsyncView>
  )
}