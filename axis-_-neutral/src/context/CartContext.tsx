import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AU_COMMERCE } from '../data/site';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  priceAud: number;
  image: string;
  size: string;
  quantity: number;
};

export type ShippingMethod = 'standard' | 'express';

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotalAud: number;
  shippingMethod: ShippingMethod;
  shippingAud: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setShippingMethod: (method: ShippingMethod) => void;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'axis-neutral-cart';
const SHIPPING_KEY = 'axis-neutral-shipping';

function computeShippingAud(subtotalAud: number, method: ShippingMethod): number {
  if (method === 'express') return AU_COMMERCE.expressShippingAud;
  return subtotalAud >= AU_COMMERCE.freeShippingThresholdAud ? 0 : AU_COMMERCE.standardShippingAud;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [shippingMethod, setShippingMethodState] = useState<ShippingMethod>(() => {
    try {
      const raw = localStorage.getItem(SHIPPING_KEY);
      return raw === 'express' ? 'express' : 'standard';
    } catch {
      return 'standard';
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(SHIPPING_KEY, shippingMethod);
  }, [shippingMethod]);

  const itemCount = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const subtotalAud = useMemo(
    () => items.reduce((sum, i) => sum + i.priceAud * i.quantity, 0),
    [items],
  );
  const shippingAud = useMemo(
    () => computeShippingAud(subtotalAud, shippingMethod),
    [subtotalAud, shippingMethod],
  );

  const setShippingMethod = useCallback((method: ShippingMethod) => {
    setShippingMethodState(method);
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
      const id = `${item.slug}-${item.size}`;
      setItems((prev) => {
        const existing = prev.find((p) => p.id === id);
        if (existing) {
          return prev.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + (item.quantity ?? 1) } : p,
          );
        }
        return [...prev, { ...item, id, quantity: item.quantity ?? 1 }];
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value: CartContextValue = {
    items,
    isOpen,
    itemCount,
    subtotalAud,
    shippingMethod,
    shippingAud,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((o) => !o),
    setShippingMethod,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
