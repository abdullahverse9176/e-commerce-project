import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';
import { Product } from '../types/ecommerce';

interface HeroBannerProps {
  featuredProduct: Product;
  onExplore: () => void;
  onQuickView: (product: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredProduct,
  onExplore,
  onQuickView,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Next-Gen Audio & Smart Tech Collection</span>
              <span className="bg-indigo-500/20 text-indigo-200 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">
                New Release
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-['Space_Grotesk']">
              Experience <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">Unmatched Sound</span> & Modern Style.
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover curated luxury electronics, flagship wearables, and premium lifestyle essentials crafted for performance and elegance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Shop Featured Collection</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onQuickView(featuredProduct)}
                className="w-full sm:w-auto glass-card hover:bg-slate-800/80 text-slate-200 font-semibold px-6 py-4 rounded-xl border border-slate-700/60 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Quick Preview</span>
              </button>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-white font-['Space_Grotesk']">50k+</p>
                <p className="text-xs text-slate-400 mt-0.5">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-['Space_Grotesk'] flex items-center justify-center lg:justify-start gap-1">
                  4.9 <Star className="w-4 h-4 text-amber-400 fill-amber-400 inline" />
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Over 12k Reviews</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 font-['Space_Grotesk']">2-Day</p>
                <p className="text-xs text-slate-400 mt-0.5">Global Shipping</p>
              </div>
            </div>
          </div>

          {/* Right Column Showcase Floating Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Floating Discount Tag */}
              <div className="absolute -top-4 -left-4 z-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-float">
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Save 24% Today</span>
              </div>

              {/* Main Product Showcase Card */}
              <div className="glass-panel p-4 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-slate-900">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      {featuredProduct.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{featuredProduct.rating} ({featuredProduct.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {featuredProduct.name}
                  </h3>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-white">${featuredProduct.price.toFixed(2)}</span>
                      {featuredProduct.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">${featuredProduct.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => onQuickView(featuredProduct)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Shield Badge */}
              <div className="absolute -bottom-6 -right-4 z-20 glass-card p-3 rounded-2xl border border-slate-700/60 shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">2-Year Warranty</p>
                  <p className="text-[10px] text-slate-400">100% Genuine Guarantee</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
