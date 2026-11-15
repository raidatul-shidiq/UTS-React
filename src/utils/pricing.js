/**
 * Utility functions for pricing, promo calculation, tax, and currency formatting.
 */

export const PROMO_CODES = {
  UTS26: { code: 'UTS26', rate: 0.25, label: 'Diskon 25%', description: 'Spesial UTS Diskon 25%' },
  HEMAT10: { code: 'HEMAT10', rate: 0.10, label: 'Diskon 10%', description: 'Hemat Ceria Diskon 10%' },
  KOPI15: { code: 'KOPI15', rate: 0.15, label: 'Diskon 15%', description: 'Pecinta Kopi Diskon 15%' },
};

export const TAX_RATE = 0.10; // Pajak PPN 10%

/**
 * Format number to Indonesian Rupiah (e.g. 25000 -> "Rp 25.000")
 */
export function formatRupiah(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp 0';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount based on subtotal and promo code string
 */
export function calculateDiscount(subtotal, promoCode) {
  if (!promoCode || typeof promoCode !== 'string') return 0;
  const cleanCode = promoCode.trim().toUpperCase();
  const promo = PROMO_CODES[cleanCode];
  if (!promo) return 0;
  return Math.round(subtotal * promo.rate);
}

/**
 * Calculate 10% tax on the amount after discount
 */
export function calculateTax(taxableAmount, rate = TAX_RATE) {
  if (taxableAmount <= 0) return 0;
  return Math.round(taxableAmount * rate);
}

/**
 * Compute the complete order pricing summary
 */
export function computePricingSummary(subtotal, promoCode) {
  const discount = calculateDiscount(subtotal, promoCode);
  const afterDiscount = Math.max(0, subtotal - discount);
  const tax = calculateTax(afterDiscount, TAX_RATE);
  const total = afterDiscount + tax;

  return {
    subtotal,
    discount,
    afterDiscount,
    tax,
    total,
    promoCode: promoCode ? promoCode.trim().toUpperCase() : null,
    promoDetails: promoCode ? PROMO_CODES[promoCode.trim().toUpperCase()] || null : null,
  };
}
