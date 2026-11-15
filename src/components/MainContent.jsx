import { useState, useMemo } from 'react';
import MenuCard from './MenuCard';
import { Coffee, CupSoda, Utensils, Cookie, Heart, SlidersHorizontal, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'Semua', label: 'Semua', icon: Sparkles },
  { id: 'Kopi', label: 'Kopi', icon: Coffee },
  { id: 'Non-Kopi', label: 'Non-Kopi', icon: CupSoda },
  { id: 'Makanan', label: 'Makanan', icon: Utensils },
  { id: 'Snack', label: 'Snack', icon: Cookie },
  { id: 'Favorit', label: 'Favorit', icon: Heart },
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

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      Semua: menus.length,
      Kopi: 0,
      'Non-Kopi': 0,
      Makanan: 0,
      Snack: 0,
      Favorit: favorites.length,
    };

    menus.forEach((m) => {
      if (counts[m.category] !== undefined) {
        counts[m.category]++;
      }
    });

    return counts;
  }, [menus, favorites]);

  // Filter & Sort menus
  const filteredAndSortedMenus = useMemo(() => {
    let result = [...menus];

    // Filter by Search Query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (activeCategory === 'Favorit') {
      const favoriteIds = new Set(favorites.map((f) => f.id));
      result = result.filter((m) => favoriteIds.has(m.id));
    } else if (activeCategory !== 'Semua') {
      result = result.filter((m) => m.category === activeCategory);
    }

    // Sorting Logic
    if (activeCategory === 'Favorit' && sortBy === 'fav-newest') {
      const timeMap = new Map(favorites.map((f) => [f.id, f.addedAt]));
      result.sort((a, b) => (timeMap.get(b.id) || 0) - (timeMap.get(a.id) || 0));
    } else if (activeCategory === 'Favorit' && sortBy === 'fav-oldest') {
      const timeMap = new Map(favorites.map((f) => [f.id, f.addedAt]));
      result.sort((a, b) => (timeMap.get(a.id) || 0) - (timeMap.get(b.id) || 0));
    } else {
      switch (sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          result.sort((a, b) => a.id - b.id);
          break;
      }
    }

    return result;
  }, [menus, searchQuery, activeCategory, favorites, sortBy]);

  const favoriteIdSet = useMemo(() => {
    return new Set(favorites.map((f) => f.id));
  }, [favorites]);

  const cartQtyMap = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => {
      map[item.id] = item.quantity;
    });
    return map;
  }, [cartItems]);

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Category Tabs Section */}
      <section className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-1">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-zinc-900 flex items-center gap-2">
              <span>Pilihan Menu Istimewa</span>
              <span className="text-xs sm:text-sm font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                KopiKu
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 sm:mt-1">
              Nikmati racikan kopi aromatik dan kuliner lezat yang disajikan dengan penuh cinta.
            </p>
          </div>
        </div>

        {/* Categories Bar: Touch scrollable on mobile */}
        <div className="-mx-3.5 px-3.5 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
                  if (cat.id === 'Favorit' && sortBy === 'default') {
                    setSortBy('fav-newest');
                  }
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                  isActive
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25'
                    : 'bg-white hover:bg-stone-100 text-zinc-700 hover:text-zinc-900 border-stone-200 shadow-sm'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-zinc-600 border border-stone-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Toolbar: Responsive on phone and tablet */}
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-stone-200">
        <div className="text-xs sm:text-sm text-zinc-600">
          Menampilkan{' '}
          <span className="font-bold text-amber-700">{filteredAndSortedMenus.length}</span> menu
          {searchQuery && (
            <span>
              {' '}
              untuk "<span className="text-zinc-900 font-semibold">{searchQuery}</span>"
            </span>
          )}
          {activeCategory !== 'Semua' && (
            <span>
              {' '}
              di kategori <span className="text-zinc-900 font-semibold">{activeCategory}</span>
            </span>
          )}
        </div>

        {/* Sorting Dropdown (full width on mobile for easy finger tap) */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <label htmlFor="sort-select" className="text-xs font-semibold text-zinc-600 flex items-center gap-1.5 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span>Urutkan:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 sm:flex-initial bg-white border border-stone-300 hover:border-amber-500 text-zinc-800 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors cursor-pointer shadow-sm"
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

      {/* Menu Cards Grid: 1 col on xs, 2 cols on sm, 3 on md/lg, 4 on xl */}
      {filteredAndSortedMenus.length > 0 ? (
        <section className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              isFavorite={favoriteIdSet.has(menu.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenInfo={onOpenInfo}
              onOpenComment={onOpenComment}
              onAddToCart={onAddToCart}
              currentStock={stocks[menu.id] !== undefined ? stocks[menu.id] : menu.stock}
              cartQuantity={cartQtyMap[menu.id] || 0}
            />
          ))}
        </section>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center bg-white border border-stone-200 rounded-3xl shadow-sm">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 border border-amber-100">
            <Coffee className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-800 mb-1">
            Menu Tidak Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mb-6">
            {activeCategory === 'Favorit'
              ? 'Anda belum menambahkan menu ke tab Favorit. Klik ikon hati pada kartu menu untuk menambahkan!'
              : 'Tidak ada menu yang sesuai dengan kriteria filter atau pencarian Anda.'}
          </p>
          {(searchQuery || activeCategory !== 'Semua') && (
            <button
              type="button"
              onClick={() => setActiveCategory('Semua')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-md shadow-amber-600/20"
            >
              Lihat Semua Menu
            </button>
          )}
        </div>
      )}
    </main>
  );
}
