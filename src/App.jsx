import { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import CartDrawer from './components/CartDrawer';
import NotificationsModal from './components/NotificationsModal';
import HistoryModal from './components/HistoryModal';
import InfoModal from './components/InfoModal';
import CommentModal from './components/CommentModal';
import ReceiptModal from './components/ReceiptModal';

import { ToastProvider, useToast } from './context/ToastContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import { CartProvider, useCart } from './context/CartContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_MENU } from './data/menu';

const DEFAULT_FAVORITES = [
  { id: 2, addedAt: 1731600000000 }, // Caramel Macchiato pre-favorited
  { id: 4, addedAt: 1731650000000 }, // Kopi Susu Gula Aren pre-favorited
];

function KopiKuApp() {
  const { addToast } = useToast();
  const { addNotification } = useNotifications();
  const { items: cartItems, addItem, clearCart } = useCart();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Modals Visibility State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [infoModalMenu, setInfoModalMenu] = useState(null);
  const [commentModalMenu, setCommentModalMenu] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  // Persistent States via useLocalStorage
  // 1. Favorites: Array of { id: number, addedAt: number }
  const [favorites, setFavorites] = useLocalStorage('kopiku_favorites', DEFAULT_FAVORITES);

  // 2. Reviews Map: { [menuId]: Array of review objects }
  const initialReviewsMap = useMemo(() => {
    const map = {};
    INITIAL_MENU.forEach((m) => {
      map[m.id] = m.reviews || [];
    });
    return map;
  }, []);
  const [reviewsMap, setReviewsMap] = useLocalStorage('kopiku_reviews', initialReviewsMap);

  // 3. Stocks Map: { [menuId]: currentStockNumber }
  const initialStockMap = useMemo(() => {
    const map = {};
    INITIAL_MENU.forEach((m) => {
      map[m.id] = m.stock;
    });
    return map;
  }, []);
  const [stocks, setStocks] = useLocalStorage('kopiku_stocks', initialStockMap);

  // 4. Order History: Array of completed orders
  const [history, setHistory] = useLocalStorage('kopiku_history', []);

  // Compute live menus with updated reviews and recalculated ratings
  const currentMenus = useMemo(() => {
    return INITIAL_MENU.map((item) => {
      const itemReviews = reviewsMap[item.id] || item.reviews || [];
      let calculatedRating = item.rating;

      if (itemReviews.length > 0) {
        const sum = itemReviews.reduce((acc, r) => acc + (r.rating || 5), 0);
        calculatedRating = Number((sum / itemReviews.length).toFixed(1));
      }

      return {
        ...item,
        reviews: itemReviews,
        rating: calculatedRating,
      };
    });
  }, [reviewsMap]);

  // Action: Toggle Favorite
  const handleToggleFavorite = (menu) => {
    const isFav = favorites.some((f) => f.id === menu.id);

    if (isFav) {
      setFavorites((prev) => prev.filter((f) => f.id !== menu.id));
      addToast(`"${menu.name}" dihapus dari daftar Favorit`, 'info');
      addNotification('Dihapus dari Favorit 💔', `Menu ${menu.name} tidak lagi ada di tab favoritmu.`, 'favorite');
    } else {
      setFavorites((prev) => [{ id: menu.id, addedAt: Date.now() }, ...prev]);
      addToast(`"${menu.name}" berhasil ditambahkan ke Favorit!`, 'success');
      addNotification('Ditambahkan ke Favorit ❤️', `Menu ${menu.name} sekarang tersimpan di tab Favorit.`, 'favorite');
    }
  };

  // Action: Add Item to Cart
  const handleAddToCart = (menu) => {
    const currentStock = stocks[menu.id] !== undefined ? stocks[menu.id] : menu.stock;
    const existingCartItem = cartItems.find((i) => i.id === menu.id);
    const inCartQty = existingCartItem ? existingCartItem.quantity : 0;

    if (currentStock <= 0) {
      addToast(`Maaf, stok ${menu.name} sedang habis!`, 'error');
      return;
    }

    if (inCartQty >= currentStock) {
      addToast(`Tidak bisa menambah lagi, batas stok ${menu.name} adalah ${currentStock}`, 'warning');
      return;
    }

    addItem(menu, currentStock);
    addToast(`${menu.name} ditambahkan ke keranjang (+1)`, 'success');
    addNotification('Keranjang Diperbarui 🛒', `${menu.name} berhasil ditambahkan ke keranjang pesanan.`, 'cart');
  };

  // Action: Add Review
  const handleAddReview = (menuId, newReview) => {
    setReviewsMap((prev) => {
      const existingReviews = prev[menuId] || [];
      return {
        ...prev,
        [menuId]: [newReview, ...existingReviews],
      };
    });
  };

  // Action: Process Checkout
  const handleCheckout = (orderData) => {
    const { items, pricing } = orderData;
    const now = new Date();
    const orderId =
      'TRX-' +
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      '-' +
      Math.floor(1000 + Math.random() * 9000);

    const formattedDate = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 1. Deduct stock for all purchased items
    setStocks((prev) => {
      const updated = { ...prev };
      items.forEach((item) => {
        const current = updated[item.id] !== undefined ? updated[item.id] : item.stock;
        updated[item.id] = Math.max(0, current - item.quantity);
      });
      return updated;
    });

    // 2. Create Order Record
    const newOrder = {
      id: orderId,
      date: formattedDate,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      promo: pricing.promoCode,
      tax: pricing.tax,
      total: pricing.total,
      paymentMethod: 'QRIS / Cashless',
    };

    // 3. Save to History
    setHistory((prev) => [newOrder, ...prev]);

    // 4. Clear Cart
    clearCart();

    // 5. Close CartDrawer and Open Receipt Modal
    setIsCartOpen(false);
    setReceiptData(newOrder);

    // 6. Notify user
    addToast(`Pembayaran ${orderId} berhasil! Pesanan Anda segera disiapkan.`, 'success', 4500);
    addNotification(
      'Pembayaran Berhasil! ☕',
      `Pesanan #${orderId} telah lunas sebesar ${pricing.total}. Silakan cek struk pembayaran Anda.`,
      'order'
    );
  };

  // Action: Reset Stocks and History
  const handleResetStockAndHistory = () => {
    // Reset stocks to initial data
    setStocks(initialStockMap);
    // Clear history
    setHistory([]);
    // Clear cart
    clearCart();

    addToast('Stok seluruh menu dan riwayat transaksi telah berhasil direset ke awal!', 'info', 4000);
    addNotification(
      'Sistem Direset 🔄',
      'Stok seluruh 15 menu telah dikembalikan ke stok default dan riwayat transaksi dibersihkan.',
      'reset'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-zinc-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* 1. Header (Wajib) */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* 2. MainContent (Wajib) */}
      <MainContent
        menus={currentMenus}
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpenInfo={(menu) => setInfoModalMenu(menu)}
        onOpenComment={(menu) => setCommentModalMenu(menu)}
        onAddToCart={handleAddToCart}
        stocks={stocks}
        cartItems={cartItems}
      />

      {/* 3. Footer (Wajib) */}
      <Footer />

      {/* Modals & Drawers */}
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        stocks={stocks}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Order History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onResetStockAndHistory={handleResetStockAndHistory}
      />

      {/* Detail Info Modal */}
      <InfoModal
        isOpen={!!infoModalMenu}
        onClose={() => setInfoModalMenu(null)}
        menu={
          infoModalMenu
            ? currentMenus.find((m) => m.id === infoModalMenu.id) || infoModalMenu
            : null
        }
        isFavorite={
          infoModalMenu ? favorites.some((f) => f.id === infoModalMenu.id) : false
        }
        onToggleFavorite={handleToggleFavorite}
        onOpenComment={(menu) => setCommentModalMenu(menu)}
        onAddToCart={handleAddToCart}
        currentStock={
          infoModalMenu
            ? stocks[infoModalMenu.id] !== undefined
              ? stocks[infoModalMenu.id]
              : infoModalMenu.stock
            : 0
        }
      />

      {/* Comment & Rating Modal */}
      <CommentModal
        isOpen={!!commentModalMenu}
        onClose={() => setCommentModalMenu(null)}
        menu={commentModalMenu}
        reviews={commentModalMenu ? reviewsMap[commentModalMenu.id] || [] : []}
        onAddReview={handleAddReview}
      />

      {/* Receipt / Struk Modal */}
      <ReceiptModal
        isOpen={!!receiptData}
        onClose={() => setReceiptData(null)}
        receiptData={receiptData}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <NotificationProvider>
        <CartProvider>
          <KopiKuApp />
        </CartProvider>
      </NotificationProvider>
    </ToastProvider>
  );
}
