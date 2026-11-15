import { useState } from 'react';
import Modal from './Modal';
import {
  History,
  Receipt,
  RotateCcw,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { formatRupiah } from '../utils/pricing';

export default function HistoryModal({
  isOpen,
  onClose,
  history,
  onResetStockAndHistory,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const totalSpend = history.reduce((sum, order) => sum + (order.total || 0), 0);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleConfirmReset = () => {
    setShowConfirmReset(false);
    onResetStockAndHistory();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Riwayat Transaksi Pesanan"
      icon={History}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Total Spending Stat Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-800/80 uppercase tracking-wider block">
              Akumulasi Belanja Keseluruhan
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700 mt-0.5 block">
              {formatRupiah(totalSpend)}
            </span>
            <span className="text-xs text-zinc-600 mt-1 block">
              Dari total <strong className="text-zinc-900 font-bold">{history.length} transaksi</strong> yang telah dibayar
            </span>
          </div>

          {/* Reset Button (Opens custom confirm popup) */}
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all text-xs font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-sm"
            title="Reset semua stok menu dan riwayat belanja"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Reset Stok + Riwayat</span>
          </button>
        </div>

        {/* Custom Confirmation Dialog for Reset (Bukan confirm() bawaan browser!) */}
        {showConfirmReset && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 shadow-md space-y-3 animate-scale-up">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-900">
                  Konfirmasi Reset Stok & Riwayat?
                </h4>
                <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                  Tindakan ini akan mengembalikan stok seluruh 15 menu ke nilai awal dan menghapus seluruh daftar riwayat transaksi ini. Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-zinc-800 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {history.length === 0 ? (
            <div className="py-16 text-center text-zinc-400">
              <Receipt className="w-10 h-10 mx-auto mb-2 opacity-40 text-stone-400" />
              <p className="text-sm font-bold text-zinc-700">
                Belum ada transaksi pembayaran
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
                Lakukan pemesanan pertama dari menu KopiKu untuk melihat struk dan riwayat transaksi di sini.
              </p>
            </div>
          ) : (
            history.map((order) => {
              const isExpanded = expandedId === order.id;

              return (
                <div
                  key={order.id}
                  className="rounded-xl border border-stone-200 bg-white overflow-hidden transition-all shadow-sm"
                >
                  {/* Order Summary Row */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-900">
                            {order.id}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Lunas
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{order.date}</span>
                          <span>•</span>
                          <span>{order.items.length} jenis item</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-black text-amber-700 block">
                          {formatRupiah(order.total)}
                        </span>
                        {order.promo && (
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            Hemat {formatRupiah(order.discount)} ({order.promo})
                          </span>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Order Items Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-stone-200 bg-stone-50/70 space-y-3">
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1.5 border-b border-stone-200/60 last:border-0"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded bg-stone-200 text-zinc-800 font-mono text-[10px] flex items-center justify-center font-bold">
                                {item.quantity}x
                              </span>
                              <span className="text-zinc-800 font-medium">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-zinc-600 font-mono font-semibold">
                              {formatRupiah(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Calculation Breakdown */}
                      <div className="pt-2 border-t border-stone-200 text-xs space-y-1 text-zinc-600">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatRupiah(order.subtotal)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-emerald-700 font-bold">
                            <span>Diskon Promo ({order.promo}):</span>
                            <span>-{formatRupiah(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>PPN (10%):</span>
                          <span>{formatRupiah(order.tax)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-zinc-900 pt-1 border-t border-stone-200">
                          <span>Total Dibayar:</span>
                          <span className="text-amber-700 font-black">
                            {formatRupiah(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
}
