export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 mb-8 text-white shadow-xl overflow-hidden">
      <div className="relative z-10 max-w-xl">
        <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-4 backdrop-blur-md">
          🔥 Promo Spesial November
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
          Temukan Produk Impian Anda dengan Mudah
        </h1>
        <p className="text-indigo-100 text-base md:text-lg mb-6">
          Belanja aman, cepat, dan terpercaya dengan berbagai pilihan produk berkualitas tinggi langsung dari genggaman Anda.
        </p>
        <div className="flex gap-4">
          <a href="#produk" className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-all">
            Mulai Belanja
          </a>
        </div>
      </div>
      {/* Dekorasi Background */}
      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 pointer-events-none">
        <span className="text-9xl font-black">SHOP</span>
      </div>
    </div>
  );
}