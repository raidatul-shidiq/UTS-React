import Modal from './Modal';
import { Receipt, CheckCircle2, Coffee, Printer } from 'lucide-react';
import { formatRupiah } from '../utils/pricing';

export default function ReceiptModal({
  isOpen,
  onClose,
  receiptData,
}) {
  if (!isOpen || !receiptData) return null;

  const {
    id,
    date,
    items = [],
    subtotal = 0,
    discount = 0,
    promo = null,
    tax = 0,
    total = 0,
    paymentMethod = 'QRIS / Cashless',
  } = receiptData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Struk Pembayaran Resmi"
      icon={Receipt}
      maxWidth="max-w-md"
    >
      <div className="space-y-6">
        {/* Thermal Receipt Paper Style Box */}
        <div
          id="printable-receipt"
          className="p-6 rounded-2xl bg-white border border-stone-300 text-zinc-900 font-mono text-xs shadow-lg relative overflow-hidden"
        >
          {/* Top Notch Decor */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700" />

          {/* Receipt Header */}
          <div className="text-center pb-4 border-b border-dashed border-stone-300 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-amber-700 font-sans font-black text-lg">
              <Coffee className="w-5 h-5" />
              <span>KOPIKU COFFEE</span>
            </div>
            <p className="text-[11px] text-zinc-600 font-sans">
              Jl. Boulevard Kopi No. 26, Menteng
            </p>
            <p className="text-[10px] text-zinc-400 font-sans">
              Telp: (021) 555-KOPI • NPWP: 98.765.432.1-012.000
            </p>
          </div>

          {/* Meta Info */}
          <div className="py-3 border-b border-dashed border-stone-300 space-y-1 text-[11px] text-zinc-600">
            <div className="flex justify-between">
              <span>No. Transaksi:</span>
              <span className="font-bold text-zinc-900">{id}</span>
            </div>
            <div className="flex justify-between">
              <span>Waktu:</span>
              <span className="text-zinc-800">{date}</span>
            </div>
            <div className="flex justify-between">
              <span>Kasir:</span>
              <span className="text-zinc-800">Self Service / Online</span>
            </div>
            <div className="flex justify-between">
              <span>Metode:</span>
              <span className="text-amber-700 font-bold">{paymentMethod}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-3 border-b border-dashed border-stone-300 space-y-2">
            <div className="flex justify-between font-bold text-zinc-900 pb-1 border-b border-stone-200">
              <span>Item Menu</span>
              <span>Total</span>
            </div>
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-[11px]">
                <div className="pr-2">
                  <div className="font-semibold text-zinc-900">{item.name}</div>
                  <div className="text-zinc-500 text-[10px]">
                    {item.quantity} x {formatRupiah(item.price)}
                  </div>
                </div>
                <div className="font-bold text-zinc-900 shrink-0">
                  {formatRupiah(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="py-3 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal:</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Diskon Promo ({promo}):</span>
                <span>-{formatRupiah(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-600">
              <span>Pajak Restoran (PPN 10%):</span>
              <span>{formatRupiah(tax)}</span>
            </div>

            <div className="flex justify-between text-sm font-black text-amber-700 pt-2 border-t border-stone-300 font-sans">
              <span>TOTAL BAYAR:</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>

          {/* Status Lunas Badge */}
          <div className="pt-4 text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PEMBAYARAN LUNAS</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-sans italic pt-1">
              Terima kasih atas kunjungan Anda di KopiKu!
            </p>
            <p className="text-[9px] text-zinc-400 font-sans">
              Simpan struk ini sebagai bukti pembayaran yang sah.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-800 text-xs font-bold border border-stone-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-600" />
            <span>Cetak Struk</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Tutup & Selesai</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
