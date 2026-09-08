import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Products from '../components/HomeComponents/Products';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Tag,
} from 'lucide-react';
import { useProducts } from '../services/productApi';

export const HomePage = () => {

  const { data = [], isLoading, isError } = useProducts();

  console.log('Products Data:', data);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-10 pb-16 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Animated Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Next-Gen E-Commerce Experience</span>
              <span className="bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold">
                Live Products
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl font-['Space_Grotesk'] leading-[1.1]">
              Discover Premium Products Built for{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Lifestyle
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Explore our latest collection of top-rated items, updated in real-time with React Query and effortless Admin Dashboard control.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#products-section"
                aria-label="Shop All Products"
                title="Shop All Products"
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop All Products</span>
              </a>

              <Link
                to="/dashboard"
                aria-label="Manage via Dashboard"
                title="Manage via Dashboard"
                className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-200 hover:text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                <span>Manage via Dashboard</span>
                <ArrowRight className="w-4 h-4 text-indigo-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Guarantee Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Free Express Shipping</p>
              <p className="text-[11px] text-slate-400">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Guaranteed Authentic</p>
              <p className="text-[11px] text-slate-400">100% verified products</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">30-Day Easy Returns</p>
              <p className="text-[11px] text-slate-400">Hassle-free refund policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">24/7 Dedicated Support</p>
              <p className="text-[11px] text-slate-400">Friendly expert assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Products Listing Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Tag className="w-4 h-4" /> Live Catalog
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight font-['Space_Grotesk']">
              Featured Products
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Explore our wide range of quality products
            </p>
          </div>
        </div>
        {isLoading && <p className="text-slate-400">Loading products...</p>}
        {isError && <p className="text-rose-400">Failed to load products. Please refresh.</p>}
        {!isLoading && !isError && <Products data={data} />}
      </section>
    </div>
  );
};
