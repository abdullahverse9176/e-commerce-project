import React, { useState, useEffect } from 'react';
import { FlashDeal, Product } from '../types/ecommerce';
import { Flame, Clock, ShoppingCart, Eye } from 'lucide-react';

interface FlashDealsProps {
  deals: FlashDeal[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FlashDeals: React.FC<FlashDealsProps> = ({
  deals,
  onAddToCart,
  onQuickView,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Live Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 p-6 glass-panel rounded-2xl border border-rose-500/20 glow-violet">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white shadow-lg animate-pulse">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <span className="bg-rose-500/20 text-rose-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                Limited Time Only
              </span>
              <h2 className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
                Flash Sale & Daily Deals
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-400" />
            <span className="text-xs text-slate-300 font-medium">Offers end in:</span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-white font-mono">
              <span className="bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-rose-600 text-white px-2.5 py-1 rounded-lg animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Flash Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => {
            const product = deal.product;
            const progressPercent = Math.round((deal.soldCount / deal.totalStock) * 100);

            return (
              <div
                key={deal.id}
                className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 group relative flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="absolute top-6 left-6 z-10 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  -{deal.discountPercentage}% OFF
                </div>

                {/* Product Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => onQuickView(product)}
                      className="p-3 bg-slate-900/90 text-slate-100 hover:text-white rounded-xl shadow-lg hover:scale-110 transition-all"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-white">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs text-slate-400 font-medium">
                      <span>Sold: <strong className="text-white">{deal.soldCount}</strong></span>
                      <span>Available: <strong className="text-rose-400">{deal.totalStock - deal.soldCount}</strong></span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="mt-4 w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Claim Deal</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
