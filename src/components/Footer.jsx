import { Coffee, Clock, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-stone-100 border-t border-stone-200 text-zinc-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-sm">
                <Coffee className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black text-zinc-900">
                Kopi<span className="text-amber-600">Ku</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Menghadirkan kenikmatan kopi nusantara berkualitas premium dipadukan sajian kuliner istimewa dengan suasana hangat dan nyaman.
            </p>
          </div>

          {/* Jam Operasional */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Jam Operasional</span>
            </h4>
            <ul className="text-xs space-y-1.5 text-zinc-600">
              <li className="flex justify-between">
                <span>Senin - Jumat:</span>
                <span className="text-zinc-900 font-semibold">08:00 - 22:00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu - Minggu:</span>
                <span className="text-amber-700 font-bold">07:00 - 23:00 WIB</span>
              </li>
              <li className="text-[11px] text-zinc-400 pt-1">
                *Tersedia Dine-in, Takeaway, dan Online Order
              </li>
            </ul>
          </div>

          {/* Lokasi & Fasilitas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Lokasi & Fasilitas</span>
            </h4>
            <ul className="text-xs space-y-1.5 text-zinc-600">
              <li>Jl. Boulevard Kopi No. 26, Menteng</li>
              <li>Free High-speed Wi-Fi (100 Mbps)</li>
              <li>Musholla & Ruang Meeting Privat</li>
              <li>Colokan Listrik di Setiap Meja</li>
            </ul>
          </div>

          {/* Kode Promo Populer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-amber-600" />
              <span>Voucher Aktif</span>
            </h4>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-white border border-stone-200 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs font-bold text-amber-700">UTS26</span>
                  <p className="text-[10px] text-zinc-500">Diskon 25% Semua Menu</p>
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 font-mono font-bold">
                  -25%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-stone-200 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs font-bold text-amber-700">HEMAT10</span>
                  <p className="text-[10px] text-zinc-500">Diskon 10% Pengguna Baru</p>
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 font-mono font-bold">
                  -10%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 KopiKu — UTS React Fundamental. All rights reserved.</p>
          <div className="flex items-center gap-1 text-zinc-600">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 inline mx-0.5" />
            <span>menggunakan React, Tailwind CSS & Lucide React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
