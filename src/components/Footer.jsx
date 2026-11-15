import { Coffee, Clock, Heart, Sparkles, MapPin, Wifi, Tag, Phone } from 'lucide-react';

const PROMOS = [
  { code: 'UTS25',   desc: 'Diskon 25% Semua Menu', pct: '-25%', color: 'from-amber-500 to-amber-700' },
  { code: 'HEMAT10', desc: 'Diskon 10% Pengguna Baru', pct: '-10%', color: 'from-emerald-500 to-emerald-700' },
  { code: 'KOPI15',  desc: 'Diskon 15% Menu Kopi', pct: '-15%', color: 'from-sky-500 to-sky-700' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 mt-auto">

      {/* Top decorative strip */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-700/30">
                <Coffee className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black text-white">Kopi<span className="text-amber-500">Ku</span></span>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Artisan Coffee</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              Menghadirkan kenikmatan kopi nusantara berkualitas premium dipadukan sajian kuliner istimewa dengan suasana hangat dan nyaman.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sedang buka · Tutup 22:00 WIB</span>
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Jam Operasional
            </h4>
            <ul className="text-xs space-y-2.5">
              {[
                { day: 'Senin – Jumat', time: '08:00 – 22:00 WIB', highlight: false },
                { day: 'Sabtu – Minggu', time: '07:00 – 23:00 WIB', highlight: true  },
              ].map(({ day, time, highlight }) => (
                <li key={day} className="flex flex-col gap-0.5">
                  <span className="text-zinc-500">{day}</span>
                  <span className={`font-bold ${highlight ? 'text-amber-400' : 'text-zinc-200'}`}>{time}</span>
                </li>
              ))}
              <li className="text-[11px] text-zinc-600 pt-1 border-t border-zinc-800 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Dine-in · Takeaway · Online Order
              </li>
            </ul>
          </div>

          {/* Lokasi & Fasilitas */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Lokasi & Fasilitas
            </h4>
            <ul className="text-xs space-y-2.5 text-zinc-500">
              {[
                { icon: MapPin, text: 'Jl. Boulevard Kopi No. 26, Menteng' },
                { icon: Phone, text: '+62 812 3456 7890' },
                { icon: Wifi,  text: 'Free Wi-Fi 100 Mbps' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Colokan Listrik · Musholla · Meeting Room</span>
              </li>
            </ul>
          </div>

          {/* Voucher */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300 flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              Voucher Aktif
            </h4>
            <div className="space-y-2.5">
              {PROMOS.map(({ code, desc, pct, color }) => (
                <div
                  key={code}
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-default"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-black text-amber-400 font-mono tracking-wider block">{code}</span>
                    <p className="text-[10px] text-zinc-500 leading-tight mt-0.5">{desc}</p>
                  </div>
                  <span className={`ml-2 shrink-0 text-[10px] font-black px-2 py-1 rounded-lg bg-gradient-to-r ${color} text-white shadow-sm`}>
                    {pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-600">
          <p>© 2026 <span className="text-zinc-400 font-semibold">KopiKu</span> — UTS React Fundamental. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>menggunakan <span className="text-zinc-400 font-semibold">React · Tailwind CSS · Lucide React</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
