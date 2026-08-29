import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Sparkles, 
  Percent,
  Truck,
  LogIn,
  LogOut,
  Shield
} from 'lucide-react';
import { Product } from '../types/ecommerce';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenAuth?: () => void;
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
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

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

            {/* Brand Logo & Clean Tabs */}
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-2 group">
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
              </Link>

              {/* Simplified Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6 text-sm font-medium">
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
                <button
                  onClick={() => setSelectedCategory('electronics')}
                  className={`transition-colors py-2 border-b-2 ${
                    selectedCategory === 'electronics'
                      ? 'text-indigo-400 border-indigo-500 font-semibold'
                      : 'text-slate-300 border-transparent hover:text-white'
                  }`}
                >
                  Tech & Gadgets
                </button>
                <button
                  onClick={() => setSelectedCategory('fashion')}
                  className={`transition-colors py-2 border-b-2 ${
                    selectedCategory === 'fashion'
                      ? 'text-indigo-400 border-indigo-500 font-semibold'
                      : 'text-slate-300 border-transparent hover:text-white'
                  }`}
                >
                  Fashion
                </button>
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Login / User Profile Button */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl p-1.5 pl-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left pr-1">
                    <span className="text-xs font-semibold text-slate-200 truncate max-w-[100px]">
                      {user.name}
                    </span>
                    {isAdmin && (
                      <span className="text-[9px] text-purple-400 font-bold flex items-center gap-0.5 -mt-0.5">
                        <Shield className="w-2.5 h-2.5" /> Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={logout}
                    title="Logout"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-500/70 text-indigo-300 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all hover:scale-105"
                >
                  <LogIn className="w-4 h-4 text-indigo-400" />
                  <span>Login</span>
                </Link>
              )}

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
                className="p-2.5 text-slate-300 hover:text-white rounded-xl md:hidden"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>


        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 border-t border-slate-800 p-4 space-y-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === 'all' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => {
                setSelectedCategory('electronics');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === 'electronics' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'
              }`}
            >
              Tech & Gadgets
            </button>
            <button
              onClick={() => {
                setSelectedCategory('fashion');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === 'fashion' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'
              }`}
            >
              Fashion
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
