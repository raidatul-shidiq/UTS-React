import { useState, useMemo } from 'react';
import MenuCard from './MenuCard';
import {
  Coffee, CupSoda, Utensils, Cookie, Heart, SlidersHorizontal,
  Sparkles, TrendingUp, Award, Clock,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Semua',    label: 'Semua',    icon: Sparkles  },
  { id: 'Kopi',     label: 'Kopi',     icon: Coffee    },
  { id: 'Non-Kopi', label: 'Non-Kopi', icon: CupSoda   },
  { id: 'Makanan',  label: 'Makanan',  icon: Utensils  },
  { id: 'Snack',    label: 'Snack',    icon: Cookie    },
  { id: 'Favorit',  label: 'Favorit',  icon: Heart     },
];

const HIGHLIGHTS = [
  { icon: Award,     label: 'Premium Beans',    sub: 'Single Origin' },
  { icon: TrendingUp, label: 'Terlaris Hari Ini', sub: '500+ Pesanan' },
  { icon: Clock,     label: 'Siap dalam 5 Menit', sub: 'Fresh Brewed' },
];

export default function MainContent({
  menus,
  searchQuery,
  activeCategory,
  setActiveCategory,
  favorites,
  onToggleFavorite,
  onOpenInfo,
  onOpenComment,
  onAddToCart,
  stocks,
  cartItems,
}) {
  const [sortBy, setSortBy] = useState('default');

  const categoryCounts = useMemo(() => {
    const counts = { Semua: menus.length, Kopi: 0, 'Non-Kopi': 0, Makanan: 0, Snack: 0, Favorit: favorites.length };
    menus.forEach((m) => { if (counts[m.category] !== undefined) counts[m.category]++; });
    return counts;
  }, [menus, favorites]);

  const filteredAndSortedMenus = useMemo(() => {
    let result = [...menus];
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
      );
    }
    if (activeCategory === 'Favorit') {
      const favoriteIds = new Set(favorites.map((f) => f.id));
      result = result.filter((m) => favoriteIds.has(m.id));
    } else if (activeCategory !== 'Semua') {
      result = result.filter((m) => m.category === activeCategory);
    }
    if (activeCategory === 'Favorit' && sortBy === 'fav-newest') {
      const timeMap = new Map(favorites.map((f) => [f.id, f.addedAt]));
      result.sort((a, b) => (timeMap.get(b.id) || 0) - (timeMap.get(a.id) || 0));
    } else if (activeCategory === 'Favorit' && sortBy === 'fav-oldest') {
      const timeMap = new Map(favorites.map((f) => [f.id, f.addedAt]));
      result.sort((a, b) => (timeMap.get(a.id) || 0) - (timeMap.get(b.id) || 0));
    } else {
      switch (sortBy) {
        case 'price-asc':    result.sort((a, b) => a.price - b.price); break;
        case 'price-desc':   result.sort((a, b) => b.price - a.price); break;
        case 'rating-desc':  result.sort((a, b) => b.rating - a.rating); break;
        case 'name-asc':     result.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'name-desc':    result.sort((a, b) => b.name.localeCompare(a.name)); break;
        default:             result.sort((a, b) => a.id - b.id); break;
      }
    }
    return result;
  }, [menus, searchQuery, activeCategory, favorites, sortBy]);

  const favoriteIdSet = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);
  const cartQtyMap = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => { map[item.id] = item.quantity; });
    return map;
  }, [cartItems]);

  return (
    <main className="flex-1 w-full">

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1c0a00 0%, #78350f 40%, #451a03 70%, #1c1917 100%)' }}
      >
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.22) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(251,191,36,0.07) 0%, transparent 50%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Text side */}
            <div className="flex-1 text-center lg:text-left space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', color: '#fcd34d' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Artisan Coffee & Kitchen 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight" style={{ color: '#fff' }}>
                Setiap Tegukan{' '}
                <span style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Adalah Karya
                </span>
              </h1>

              <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: 'rgba(254,243,199,0.75)' }}>
                Nikmati racikan kopi premium single origin, makanan lezat, dan snack istimewa yang disiapkan dengan penuh cinta oleh para barista berpengalaman KopiKu.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                {[
                  { val: '15+', lbl: 'Varian Menu' },
                  { val: '4.8★', lbl: 'Rating Rata-rata' },
                  { val: '500+', lbl: 'Pelanggan Puas' },
                ].map((s) => (
                  <div key={s.lbl} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}>
                    <span className="text-sm font-black" style={{ color: '#fbbf24' }}>{s.val}</span>
                    <span className="text-[11px]" style={{ color: 'rgba(254,243,199,0.65)' }}>{s.lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight cards */}
            <div className="flex lg:flex-col gap-3 w-full lg:w-auto lg:min-w-[230px]">
              {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex-1 lg:flex-none flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <Icon className="w-4 h-4" style={{ color: '#fcd34d' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: '#fff' }}>{label}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(254,215,170,0.65)' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Menu Section ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-7 sm:py-10">

        {/* Section heading & categories */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 gap-2">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Menu Pilihan</p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-900 leading-tight">
                Temukan Favorit{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                  Kamu
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs text-left sm:text-right leading-relaxed">
              {menus.length} menu tersedia · Stok real-time · Order langsung dari sini
            </p>
          </div>

          {/* Category tabs */}
          <div className="-mx-3.5 px-3.5 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id === 'Favorit' && sortBy === 'default') setSortBy('fav-newest');
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/30 scale-[1.03]'
                      : 'bg-white hover:bg-amber-50 text-zinc-600 hover:text-amber-700 border border-stone-200 hover:border-amber-200 shadow-sm'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-amber-500'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-stone-100 text-zinc-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Toolbar */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Menampilkan{' '}
            <span className="font-black text-amber-700 mx-0.5">{filteredAndSortedMenus.length}</span> menu
            {searchQuery && (
              <span> untuk "<span className="text-zinc-800 font-semibold">{searchQuery}</span>"</span>
            )}
            {activeCategory !== 'Semua' && (
              <span> · <span className="text-zinc-700 font-semibold">{activeCategory}</span></span>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <label htmlFor="sort-select" className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
              <span>Urutkan:</span>
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-initial bg-white border border-stone-300 hover:border-amber-400 text-zinc-800 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors cursor-pointer shadow-sm font-semibold"
            >
              {activeCategory === 'Favorit' && (
                <>
                  <option value="fav-newest">Favorit Terbaru</option>
                  <option value="fav-oldest">Favorit Terlama</option>
                </>
              )}
              <option value="default">Rekomendasi</option>
              <option value="price-asc">Harga: Termurah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="rating-desc">Rating: Tertinggi</option>
              <option value="name-asc">Nama: A - Z</option>
              <option value="name-desc">Nama: Z - A</option>
            </select>
          </div>
        </section>

        {/* Menu Grid */}
        {filteredAndSortedMenus.length > 0 ? (
          <section className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredAndSortedMenus.map((menu, idx) => (
              <div key={menu.id} className="menu-card-enter" style={{ animationDelay: `${Math.min(idx * 0.05, 0.4)}s` }}>
                <MenuCard
                  menu={menu}
                  isFavorite={favoriteIdSet.has(menu.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenInfo={onOpenInfo}
                  onOpenComment={onOpenComment}
                  onAddToCart={onAddToCart}
                  currentStock={stocks[menu.id] !== undefined ? stocks[menu.id] : menu.stock}
                  cartQuantity={cartQtyMap[menu.id] || 0}
                />
              </div>
            ))}
          </section>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-amber-500 mb-5 border border-amber-200 shadow-md shadow-amber-100">
              <Coffee className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-zinc-800 mb-2">Menu Tidak Ditemukan</h3>
            <p className="text-sm text-zinc-500 max-w-xs mb-6 leading-relaxed">
              {activeCategory === 'Favorit'
                ? 'Belum ada menu favorit. Klik ikon hati ❤️ pada kartu menu untuk menyimpannya!'
                : 'Tidak ada menu yang cocok dengan pencarian atau filter Anda saat ini.'}
            </p>
            {(searchQuery || activeCategory !== 'Semua') && (
              <button
                type="button"
                onClick={() => setActiveCategory('Semua')}
                className="px-5 py-2.5 text-sm font-bold rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white transition-all shadow-lg shadow-amber-500/25 active:scale-95"
              >
                Lihat Semua Menu
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
