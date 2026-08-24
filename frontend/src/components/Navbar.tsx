import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Percent,
  Truck
} from 'lucide-react';
import { Product } from '../types/ecommerce';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: { id: string; name: string }[];
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  allProducts,
  onSelectProduct,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-indigo-100 py-1.5 px-4 text-xs font-medium border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Percent className="w-3 h-3" /> Special Offer
            </span>
            <span>Get 20% OFF your first order with code <strong className="text-white">AURA20</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-slate-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Express Shipping Over $50
            </span>
            <a href="#support" className="hover:text-white transition-colors">Help & Support</a>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-panel border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">

            {/* Brand Logo */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg glow-indigo group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-['Space_Grotesk']">
                    AURA<span className="text-indigo-400">MART</span>
                  </span>
                  <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase -mt-1">
                    Premium Store
                  </span>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`transition-colors py-2 border-b-2 ${
                    selectedCategory === 'all'
                      ? 'text-indigo-400 border-indigo-500 font-semibold'
                      : 'text-slate-300 border-transparent hover:text-white'
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`transition-colors py-2 border-b-2 ${
                      selectedCategory === cat.id
                        ? 'text-indigo-400 border-indigo-500 font-semibold'
                        : 'text-slate-300 border-transparent hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, brands, tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>

              {/* Real-time Search Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="p-3 flex items-center gap-3 hover:bg-slate-800/80 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-slate-800"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">{product.name}</p>
                        <p className="text-xs text-indigo-400 font-semibold">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Account Button */}
              <button 
                title="Account"
                className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all relative hidden sm:flex"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button 
                title="Wishlist"
                className="p-2.5 text-slate-300 hover:text-rose-400 hover:bg-slate-800/60 rounded-xl transition-all relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-xs font-bold">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-slate-300 hover:text-white rounded-xl lg:hidden"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-t border-slate-800 p-4 space-y-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === 'all' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === cat.id ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
