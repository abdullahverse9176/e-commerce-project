import React, { useState } from 'react';
import { CartItem } from '../types/ecommerce';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 || items.length === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, subtotal + shipping - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AURA20') {
      setAppliedPromo('AURA20 (20% OFF)');
      setDiscountAmount(subtotal * 0.2);
    } else {
      alert('Invalid Promo Code. Try "AURA20" for 20% OFF!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-slate-800 shadow-2xl flex flex-col justify-between text-slate-100">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Shopping Cart</h2>
                <p className="text-xs text-slate-400">{items.length} unique items</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Looks like you haven't added any products yet. Browse our collections and discover great deals!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 glass-card rounded-2xl border border-slate-800 flex items-center gap-4 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-xs text-indigo-400 font-bold mt-0.5">${item.product.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
              
              {/* Promo Code input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (AURA20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl pl-8 pr-3 py-2.5 border border-slate-700 outline-none uppercase placeholder:capitalize"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Applied: {appliedPromo}
                  </p>
                )}
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-indigo-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  alert('Thank you for testing AuraMart! Proceeding to Secure Express Checkout demo.');
                  onClearCart();
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
