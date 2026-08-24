import React from 'react';
import { Product } from '../types/ecommerce';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 group flex flex-col justify-between relative">
      
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 items-start">
        {product.isHot && (
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
            HOT
          </span>
        )}
        {product.isNew && (
          <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
            NEW
          </span>
        )}
        {product.discountPercentage && (
          <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className={`absolute top-6 right-6 z-10 p-2.5 rounded-xl backdrop-blur-md transition-all ${
          isWishlisted
            ? 'bg-rose-500 text-white shadow-lg'
            : 'bg-slate-900/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
      </button>

      {/* Product Image */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 cursor-pointer mb-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
        />

        {/* Hover Overlay Action Buttons */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-slate-900/90 text-slate-200 hover:text-white rounded-xl shadow-xl hover:scale-110 transition-all border border-slate-700/60"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        <h3 
          onClick={() => onQuickView(product)}
          className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 cursor-pointer min-h-[40px]"
        >
          {product.name}
        </h3>

        {/* Price & Add to Cart */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl transition-all shadow-md hover:scale-105"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
