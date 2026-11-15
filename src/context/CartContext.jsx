/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { computePricingSummary, PROMO_CODES } from '../utils/pricing';

const CartContext = createContext(null);

const initialState = {
  items: [], // Array of { id, name, price, image, category, quantity, stock }
  promoCode: '',
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_CART': {
      return {
        ...state,
        items: action.payload.items || [],
        promoCode: action.payload.promoCode || '',
      };
    }

    case 'ADD_ITEM': {
      const { item, maxStock } = action.payload;
      const existingIndex = state.items.findIndex((i) => i.id === item.id);

      if (existingIndex > -1) {
        const currentQty = state.items[existingIndex].quantity;
        const currentStock = typeof maxStock === 'number' ? maxStock : item.stock;

        if (currentQty >= currentStock) {
          return state; // Cannot add beyond stock
        }

        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: currentQty + 1,
          stock: currentStock,
        };
        return { ...state, items: updatedItems };
      }

      // New item in cart
      const currentStock = typeof maxStock === 'number' ? maxStock : item.stock;
      if (currentStock <= 0) return state;

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            quantity: 1,
            stock: currentStock,
          },
        ],
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity, maxStock } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === id) {
            const stockLimit = typeof maxStock === 'number' ? maxStock : item.stock;
            const finalQty = Math.min(quantity, stockLimit);
            return { ...item, quantity: finalQty, stock: stockLimit };
          }
          return item;
        }),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'APPLY_PROMO': {
      const cleanCode = (action.payload.code || '').trim().toUpperCase();
      if (!PROMO_CODES[cleanCode]) {
        return state;
      }
      return {
        ...state,
        promoCode: cleanCode,
      };
    }

    case 'REMOVE_PROMO': {
      return {
        ...state,
        promoCode: '',
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        promoCode: '',
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [persistedCart, setPersistedCart] = useLocalStorage('kopiku_cart', initialState);
  const [state, dispatch] = useReducer(cartReducer, persistedCart || initialState);

  // Sync reducer changes back to localStorage
  useEffect(() => {
    setPersistedCart({
      items: state.items,
      promoCode: state.promoCode,
    });
  }, [state.items, state.promoCode, setPersistedCart]);

  const addItem = (item, maxStock) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, maxStock } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id, quantity, maxStock) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity, maxStock } });
  };

  const applyPromo = (code) => {
    dispatch({ type: 'APPLY_PROMO', payload: { code } });
  };

  const removePromo = () => {
    dispatch({ type: 'REMOVE_PROMO' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const pricing = computePricingSummary(subtotal, state.promoCode);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        items: state.items,
        promoCode: state.promoCode,
        totalItems,
        subtotal,
        pricing,
        addItem,
        removeItem,
        updateQuantity,
        applyPromo,
        removePromo,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
