import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductListPage from './pages/ProductListPage'

// Komponen Hero Banner
function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 mb-8 text-white shadow-xl overflow-hidden">
      <div className="relative z-10 max-w-xl">
        <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-4 backdrop-blur-md">
          🔥 Promo Spesial E-Commerce
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
          Temukan Produk Impian Anda dengan Mudah
        </h1>
        <p className="text-indigo-100 text-base md:text-lg mb-6">
          Belanja aman, cepat, dan terpercaya dengan pilihan produk berkualitas tinggi langsung dari genggaman Anda.
        </p>
      </div>
      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 pointer-events-none">
        <span className="text-9xl font-black">SHOP</span>
      </div>
    </div>
  )
}

// Komponen Footer
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20 py-8 text-center text-gray-500 text-sm">
      <div className="container mx-auto px-4">
        <p className="font-bold text-gray-700 mb-1">Mi-PDSKU Microservices E-Commerce</p>
        <p className="text-xs text-gray-400">Dibuat dengan penuh dedikasi untuk tugas kuliah sistem informasi.</p>
      </div>
    </footer>
  )
}

// Komponen Utama App (Footer diletakkan di luar fungsi ini)
export default function App() {
  const [userId, setUserId] = useState(() => Number(localStorage.getItem('userId')) || 1)

  function changeUser(value) {
    setUserId(value)
    localStorage.setItem('userId', String(value))
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col justify-between">
      <div>
        <Navbar userId={userId} onUserChange={changeUser} />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <HeroBanner />
                  <ProductListPage />
                </>
              } 
            />
            <Route path="/products/:id" element={<ProductDetailPage userId={userId} />} />
            <Route path="/cart" element={<CartPage userId={userId} />} />
            <Route path="*" element={<p className="text-center py-10 text-gray-500">Halaman tidak ditemukan.</p>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}