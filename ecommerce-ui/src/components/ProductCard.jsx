// Contoh komponen ProductCard.jsx yang modern dan estetik
import React from 'react';

export default function ProductCard({ product, onAddToCart, onViewDetail }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
      {/* Gambar Produk dengan Efek Zoom */}
      <div className="relative overflow-hidden bg-gray-100 h-52 flex items-center justify-center">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'} 
          alt={product.name}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {product.category || 'Terlaris'}
        </span>
      </div>

      {/* Informasi Produk */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description || 'Produk berkualitas tinggi pilihan terbaik untuk kebutuhan Anda sehari-hari.'}
        </p>

        {/* Harga & Rating */}
        <div className="mt-auto flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-gray-400 block">Harga</span>
            <span className="text-xl font-extrabold text-indigo-600">
              Rp {Number(product.price).toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex items-center bg-amber-50 px-2.5 py-1 rounded-lg text-amber-600 text-sm font-bold">
            ⭐ {product.rating || '4.8'}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onViewDetail(product.id || product._id)}
            className="w-full py-2.5 px-3 border border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors text-sm text-center"
          >
            Detail
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-2.5 px-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all text-sm text-center"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}