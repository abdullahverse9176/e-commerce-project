import React, { useState } from 'react';
import { Product } from '../types/ecommerce';
import { X, Star, ShieldCheck, Truck, ShoppingCart, Check, Plus, Minus } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all border border-slate-700/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left Column: Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                {product.category}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1 font-['Space_Grotesk'] leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  {product.rating} ({product.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-base text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Features list */}
              {product.features && (
                <div className="mt-4 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Features:</h4>
                  <ul className="grid grid-cols-1 gap-1 text-xs text-slate-300">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-300 uppercase">Quantity:</span>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stockCount || 20} available)
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                disabled={addedSuccess}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-indigo-400" /> Free Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 2-Year Warranty
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
