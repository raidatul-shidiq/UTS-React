export const INITIAL_MENU = [
  {
    id: 1,
    name: 'Espresso Single Origin',
    category: 'Kopi',
    price: 22000,
    stock: 12,
    image: '/images/menu-1.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    description: 'Ekstraksi murni biji kopi Arabika Gayo pilihan dengan crema tebal keemasan, menghadirkan aroma floral dan notes fruity caramel yang intens.',
    rating: 4.8,
    reviews: [
      { id: 'r1-1', name: 'Budi Santoso', rating: 5, comment: 'Crema sangat tebal dan rasa asam segarnya pas sekali!', date: '2026-11-10' },
      { id: 'r1-2', name: 'Rina Wijaya', rating: 4, comment: 'Kopi hitam yang sangat mantap untuk menemani kerja sore.', date: '2026-11-12' }
    ]
  },
  {
    id: 2,
    name: 'Caramel Macchiato',
    category: 'Kopi',
    price: 34000,
    stock: 15,
    image: '/images/menu-2.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80',
    description: 'Kombinasi harmonis antara espresso bold, susu steamed velvet yang lembut, vanilla syrup, dan drizzle saus karamel panggang manis gurih.',
    rating: 4.9,
    reviews: [
      { id: 'r2-1', name: 'Anisa Putri', rating: 5, comment: 'Manisnya pas tidak bikin enek, rasa kopinya tetap dominan!', date: '2026-11-11' },
      { id: 'r2-2', name: 'Dimas Kurnia', rating: 5, comment: 'Menu favorit setiap ke KopiKu, wajib dicoba!', date: '2026-11-14' }
    ]
  },
  {
    id: 3,
    name: 'Iced Americano',
    category: 'Kopi',
    price: 25000,
    stock: 20,
    image: '/images/menu-3.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    description: 'Double shot espresso freshly brewed dituangkan di atas es kristal bening dan purified cold water, memberikan kesegaran kafein bersih tanpa gula.',
    rating: 4.7,
    reviews: [
      { id: 'r3-1', name: 'Fajar Nugraha', rating: 5, comment: 'Super refreshing di siang terik! Tidak terlalu pahit.', date: '2026-11-09' }
    ]
  },
  {
    id: 4,
    name: 'Kopi Susu Gula Aren',
    category: 'Kopi',
    price: 28000,
    stock: 18,
    image: '/images/menu-4.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    description: 'Kopi susu kekinian racikan house blend KopiKu dengan creamy fresh milk dan manis legit gula aren murni organik khas nusantara.',
    rating: 4.9,
    reviews: [
      { id: 'r4-1', name: 'Siti Rahma', rating: 5, comment: 'Gula arennya otentik banget, harum dan creamy.', date: '2026-11-13' },
      { id: 'r4-2', name: 'Eko Prasetyo', rating: 5, comment: 'Best kopi susu aren in town!', date: '2026-11-14' }
    ]
  },
  {
    id: 5,
    name: 'Avocado Coffee Float',
    category: 'Kopi',
    price: 38000,
    stock: 8,
    image: '/images/menu-5.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    description: 'Puree buah alpukat mentega segar yang kental dipadu espresso harum dan topping satu scoop es krim cokelat vanila lezat.',
    rating: 4.8,
    reviews: [
      { id: 'r5-1', name: 'Maya Indah', rating: 5, comment: 'Alpukatnya asli kental bukan sirup, nikmat banget!', date: '2026-11-08' }
    ]
  },
  {
    id: 6,
    name: 'Matcha Latte Kyoto',
    category: 'Non-Kopi',
    price: 32000,
    stock: 14,
    image: '/images/menu-6.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=800&h=600&q=85',
    description: 'Ceremonial grade matcha asli dari Uji, Kyoto yang di-whisk tradisional dengan fresh milk lembut, menghadirkan rasa earthy dan umami autentik.',
    rating: 4.8,
    reviews: [
      { id: 'r6-1', name: 'Kevin Ardiansyah', rating: 5, comment: 'Beneran matcha jepang yang berasa pahit getir nikmatnya.', date: '2026-11-12' }
    ]
  },
  {
    id: 7,
    name: 'Earl Grey Artisan Tea',
    category: 'Non-Kopi',
    price: 24000,
    stock: 16,
    image: '/images/menu-7.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Seduhan daun teh hitam Ceylon berkualitas tinggi dengan infusi minyak bergamot Mediterania wangi, disajikan hangat atau dingin dengan irisan lemon.',
    rating: 4.6,
    reviews: [
      { id: 'r7-1', name: 'Dewi Lestari', rating: 4, comment: 'Aroma bergamotnya sangat menenangkan dan elegan.', date: '2026-11-07' }
    ]
  },
  {
    id: 8,
    name: 'Belgian Dark Chocolate',
    category: 'Non-Kopi',
    price: 30000,
    stock: 10,
    image: '/images/menu-8.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    description: 'Cokelat hitam murni Belgia 70% dilelehkan perlahan bersama susu hangat menciptakan tekstur velvet tebal dan taburan toasted marshmallow.',
    rating: 4.9,
    reviews: [
      { id: 'r8-1', name: 'Rizky Pratama', rating: 5, comment: 'Cokelatnya pekat dan rich, cocok sekali pas lagi hujan!', date: '2026-11-13' }
    ]
  },
  {
    id: 9,
    name: 'Classic Beef Cheeseburger',
    category: 'Makanan',
    price: 48000,
    stock: 10,
    image: '/images/menu-9.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Patty daging sapi Australia 120g panggang juicy, lelehan keju cheddar merah, crisp butter lettuce, tomat segar, dan house sauce dalam toasted brioche bun.',
    rating: 4.8,
    reviews: [
      { id: 'r9-1', name: 'Andi Saputra', rating: 5, comment: 'Dagingnya sangat juicy dan sausnya juara!', date: '2026-11-10' }
    ]
  },
  {
    id: 10,
    name: 'Spaghetti Carbonara Truffle',
    category: 'Makanan',
    price: 52000,
    stock: 9,
    image: '/images/menu-10.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    description: 'Pasta al dente dibalut creamy emulsion kuning telur dan keju Grana Padano, potongan beef bacon gurih renyah, serta sentuhan aroma white truffle oil.',
    rating: 4.9,
    reviews: [
      { id: 'r10-1', name: 'Nadia Safitri', rating: 5, comment: 'Wangi trufflenya langsung semerbak, porsinya pas mengenyangkan.', date: '2026-11-14' }
    ]
  },
  {
    id: 11,
    name: 'Nasi Goreng Spesial KopiKu',
    category: 'Makanan',
    price: 42000,
    stock: 15,
    image: '/images/menu-11.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    description: 'Nasi goreng racikan bumbu rempah tradisional beraroma smoky wok, disajikan lengkap dengan ayam suwir asap, telur mata sapi, acar, dan kerupuk udang.',
    rating: 4.8,
    reviews: [
      { id: 'r11-1', name: 'Hendra Gunawan', rating: 5, comment: 'Wok hei berasa banget, pedas gurihnya nikmat!', date: '2026-11-11' }
    ]
  },
  {
    id: 12,
    name: 'Chicken Katsu Curry Rice',
    category: 'Makanan',
    price: 45000,
    stock: 11,
    image: '/images/menu-12.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
    description: 'Fillet dada ayam goreng tepung panko renyah keemasan, disajikan bersama nasi Jepang pulen hangat dan kuah kari Jepang kental berisi wortel dan kentang.',
    rating: 4.7,
    reviews: [
      { id: 'r12-1', name: 'Alif Fauzan', rating: 5, comment: 'Katsunya renyah garing tapi dagingnya tetap empuk.', date: '2026-11-09' }
    ]
  },
  {
    id: 13,
    name: 'Butter Croissant Paris',
    category: 'Snack',
    price: 26000,
    stock: 12,
    image: '/images/menu-13.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    description: 'Pastry tradisional Prancis dengan serpihan renyah berlapis butter premium, harum semerbak dan lembut di dalam. Dipanggang fresh setiap pagi.',
    rating: 4.8,
    reviews: [
      { id: 'r13-1', name: 'Citra Kirana', rating: 5, comment: 'Crispy di luar dan flaky banget, dicelup kopi espresso enak banget!', date: '2026-11-12' }
    ]
  },
  {
    id: 14,
    name: 'Truffle Parmesan Fries',
    category: 'Snack',
    price: 32000,
    stock: 18,
    image: '/images/menu-14.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    description: 'Kentang goreng crinkle cut renyah ditaburi keju Parmesan parut melimpah, daun parsley segar, dan infused truffle oil dengan dipping saus garlic aioli.',
    rating: 4.7,
    reviews: [
      { id: 'r14-1', name: 'Taufik Hidayat', rating: 4, comment: 'Cemilan wajib kalau nongkrong lama di KopiKu.', date: '2026-11-13' }
    ]
  },
  {
    id: 15,
    name: 'Spanish Churros with Chocolate',
    category: 'Snack',
    price: 29000,
    stock: 14,
    image: '/images/menu-15.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=800&q=80',
    description: 'Churros spanyol hangat digoreng renyah bertabur gula kayu manis aromatik, disajikan bersama mangkuk cocolan saus cokelat leleh ganache pekat.',
    rating: 4.9,
    reviews: [
      { id: 'r15-1', name: 'Wulan Guritno', rating: 5, comment: 'Saus cokelatnya kental banget dan churrosnya renyah sempurna.', date: '2026-11-15' }
    ]
  }
];
