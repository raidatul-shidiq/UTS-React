import Modal from './Modal';
import StarRating from './StarRating';
import { Info, ShoppingCart, MessageCircle, Heart } from 'lucide-react';
import { formatRupiah } from '../utils/pricing';

export default function InfoModal({
  isOpen,
  onClose,
  menu,
  isFavorite,
  onToggleFavorite,
  onOpenComment,
  onAddToCart,
  currentStock,
}) {
  if (!isOpen || !menu) return null;

  const stock = typeof currentStock === 'number' ? currentStock : menu.stock;
  const isOutOfStock = stock <= 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Informasi Detail Menu"
      icon={Info}
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Hero Image & Tags */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (menu.fallbackUrl && e.currentTarget.src !== menu.fallbackUrl) {
                e.currentTarget.src = menu.fallbackUrl;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow-md">
              {menu.category}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleFavorite(menu)}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFavorite
                ? 'bg-white text-rose-600 border border-rose-300'
                : 'bg-white/90 text-zinc-600 hover:text-zinc-900 border border-stone-200'
            }`}
            title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-rose-600 text-rose-600' : ''
              }`}
            />
          </button>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-md">
            <span className="text-base sm:text-lg font-black text-amber-700">
              {formatRupiah(menu.price)}
            </span>
          </div>
        </div>

        {/* Title & Core Metrics */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-black text-zinc-900">{menu.name}</h3>
            <div className="flex items-center gap-2">
              <StarRating rating={menu.rating} readOnly size={16} showValue />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-zinc-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Status Stok:</span>
              <strong className={isOutOfStock ? 'text-rose-600' : 'text-zinc-900 font-bold'}>
                {isOutOfStock ? 'Habis' : `${stock} porsi tersedia`}
              </strong>
            </span>
            <span>•</span>
            <span>Kategori: <strong className="text-amber-700 font-bold">{menu.category}</strong></span>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            Deskripsi Rasa & Bahan
          </h4>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {menu.description}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ulasan & Komentar Pelanggan ({menu.reviews?.length || 0})</span>
            </h4>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenComment(menu);
              }}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
            >
              + Tulis Ulasan
            </button>
          </div>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {!menu.reviews || menu.reviews.length === 0 ? (
              <p className="text-xs text-zinc-400 py-3 text-center">
                Belum ada ulasan untuk menu ini. Jadilah yang pertama memberikan ulasan!
              </p>
            ) : (
              menu.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800">
                      {rev.name}
                    </span>
                    <StarRating rating={rev.rating} readOnly size={12} />
                  </div>
                  <p className="text-xs text-zinc-600 leading-normal">
                    {rev.comment}
                  </p>
                  <span className="text-[10px] text-zinc-400 block">
                    {rev.date}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons in Modal */}
        <div className="flex gap-2.5 pt-2 border-t border-stone-200">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenComment(menu);
            }}
            className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-800 font-bold text-xs flex items-center justify-center gap-2 border border-stone-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Tulis Komentar</span>
          </button>
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => {
              onAddToCart(menu);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              isOutOfStock
                ? 'bg-stone-100 text-zinc-400 cursor-not-allowed border border-stone-200'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
