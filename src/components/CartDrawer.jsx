import { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  Check,
  AlertCircle,
  Receipt,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNotifications } from '../context/NotificationContext';
import { formatRupiah, PROMO_CODES } from '../utils/pricing';

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
  stocks,
}) {
  const {
    items,
    promoCode,
    updateQuantity,
    removeItem,
    applyPromo,
    removePromo,
    pricing,
  } = useCart();

  const { addToast } = useToast();
  const { addNotification } = useNotifications();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = (codeToApply) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    if (!code) {
      setPromoError('Masukkan kode promo terlebih dahulu');
      return;
    }

    if (!PROMO_CODES[code]) {
      setPromoError(`Kode "${code}" tidak valid. Gunakan UTS25, HEMAT10, atau KOPI15`);
      addToast(`Kode promo "${code}" tidak valid`, 'error');
      addNotification('Gagal Menerapkan Promo', `Kode "${code}" tidak ditemukan atau sudah kadaluarsa.`, 'warning');
      return;
    }

    applyPromo(code);
    setPromoError('');
    setPromoInput('');
    const promoInfo = PROMO_CODES[code];
    addToast(`Berhasil menerapkan promo ${code} (${promoInfo.label})!`, 'success');
    addNotification('Promo Berhasil Digunakan 🎉', `Kode promo ${code} berhasil memberikan diskon pada keranjangmu.`, 'promo');
  };

  const handleRemovePromo = () => {
    const oldCode = promoCode;
    removePromo();
    addToast(`Kode promo ${oldCode} telah dihapus`, 'info');
    addNotification('Promo Dihapus', `Kode promo ${oldCode} telah dihapus dari keranjang.`, 'info');
  };

  const handleQuantityChange = (item, newQty) => {
    const currentStock = stocks[item.id] !== undefined ? stocks[item.id] : item.stock;

    if (newQty > currentStock) {
      addToast(`Maksimal pembelian ${item.name} adalah ${currentStock} item (stok terbatas)`, 'warning');
      return;
    }

    updateQuantity(item.id, newQty, currentStock);

    if (newQty <= 0) {
      addToast(`${item.name} dihapus dari keranjang`, 'info');
      addNotification('Item Dihapus', `${item.name} telah dihapus dari keranjang belanja.`, 'cart');
    }
  };

  const handleRemoveItem = (item) => {
    removeItem(item.id);
    addToast(`${item.name} dihapus dari keranjang`, 'info');
    addNotification('Item Dihapus', `${item.name} telah dikeluarkan dari keranjang belanja.`, 'cart');
  };

  const handleProcessCheckout = () => {
    if (items.length === 0) {
      addToast('Keranjang Anda masih kosong!', 'warning');
      return;
    }

    for (const item of items) {
      const availStock = stocks[item.id] !== undefined ? stocks[item.id] : item.stock;
      if (item.quantity > availStock) {
        addToast(`Maaf, stok ${item.name} tersisa ${availStock} item. Kurangi jumlah di keranjang.`, 'error');
        return;
      }
    }

    onCheckout({
      items: [...items],
      pricing: { ...pricing },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <aside aria-label="Keranjang Belanja" className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900">Keranjang Pesanan</h3>
                <p className="text-xs text-zinc-500">
                  {items.length} jenis item dipilih
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-800 rounded-xl hover:bg-stone-200 transition-colors"
              title="Tutup Keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-3 sm:space-y-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4 border border-stone-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-zinc-800 mb-1">
                  Keranjang Masih Kosong
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  Yuk jelajahi menu kopi, minuman segar, dan hidangan lezat KopiKu!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              items.map((item) => {
                const availStock = stocks[item.id] !== undefined ? stocks[item.id] : item.stock;
                const isMax = item.quantity >= availStock;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-all"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-stone-200 shrink-0 border border-stone-200"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="truncate">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-amber-700 font-semibold">
                            {item.category}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item)}
                          className="text-zinc-400 hover:text-rose-600 p-1 rounded-lg hover:bg-stone-200 transition-colors shrink-0"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/80">
                        <span className="text-xs sm:text-sm font-black text-amber-700">
                          {formatRupiah(item.price * item.quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-1 shadow-sm">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="p-1 rounded text-zinc-500 hover:text-zinc-900 hover:bg-stone-100 transition-colors"
                            title="Kurang"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-zinc-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={isMax}
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className={`p-1 rounded transition-colors ${
                              isMax
                                ? 'text-zinc-300 cursor-not-allowed'
                                : 'text-zinc-500 hover:text-zinc-900 hover:bg-stone-100'
                            }`}
                            title={isMax ? `Maksimal stok tercapai (${availStock})` : 'Tambah'}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {isMax && (
                        <span className="text-[10px] text-amber-700 font-medium mt-1">
                          Mencapai batas stok ({availStock})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer: Promo Code, Pricing Breakdown & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50/90 space-y-3 sm:space-y-4">
              {/* Promo Code Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kode Promo Diskon</span>
                </label>

                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs shadow-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold">{promoCode}</span>
                        <span className="text-zinc-600 ml-1.5 text-[11px]">
                          ({PROMO_CODES[promoCode]?.label})
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold underline ml-2"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError('');
                        }}
                        placeholder="Contoh: UTS25, HEMAT10..."
                        className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-600 uppercase shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyPromo()}
                        className="px-3 sm:px-4 py-2 bg-stone-200 hover:bg-stone-300 text-amber-800 font-bold text-xs rounded-xl border border-stone-300 transition-colors"
                      >
                        Terapkan
                      </button>
                    </div>

                    {promoError && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{promoError}</span>
                      </p>
                    )}

                    {/* Quick Promo Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Object.keys(PROMO_CODES).map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleApplyPromo(code)}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-stone-200 hover:bg-amber-100 text-zinc-700 hover:text-amber-800 border border-stone-300 transition-colors"
                        >
                          +{code} ({PROMO_CODES[code].label})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal Pesanan</span>
                  <span>{formatRupiah(pricing.subtotal)}</span>
                </div>

                {pricing.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Diskon ({pricing.promoCode})</span>
                    <span>-{formatRupiah(pricing.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-600">
                  <span>Pajak Restoran (PPN 10%)</span>
                  <span>{formatRupiah(pricing.tax)}</span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-black text-zinc-900 pt-2 border-t border-stone-200">
                  <span>Total Pembayaran</span>
                  <span className="text-amber-700">{formatRupiah(pricing.total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProcessCheckout}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                <span>Bayar Sekarang ({formatRupiah(pricing.total)})</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
