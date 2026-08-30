import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Search,
  Filter,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Package,
  AlertCircle,
  Eye,
  Tag
} from 'lucide-react';
import { getProducts, BackendProduct } from '../services/productApi';

export const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<BackendProduct | null>(null);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // React Query Fetch Products
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (id: string) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

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
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop All Products</span>
              </a>

              <Link
                to="/dashboard"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Free Express Shipping</h4>
              <p className="text-[11px] text-slate-400">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Guaranteed Authentic</h4>
              <p className="text-[11px] text-slate-400">100% verified products</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">30-Day Easy Returns</h4>
              <p className="text-[11px] text-slate-400">Hassle-free refund policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-slate-400">Friendly expert assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Products Listing Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Tag className="w-4 h-4" /> Live Catalog
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight font-['Space_Grotesk']">
              Featured Products
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Showing {filteredProducts.length} of {products.length} products available
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            {/* Category Dropdown Filter */}
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-8 py-2 text-sm text-white outline-none cursor-pointer appearance-none transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 animate-pulse"
              >
                <div className="w-full h-48 bg-slate-800 rounded-xl" />
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 bg-slate-800 rounded w-1/3" />
                  <div className="h-9 bg-slate-800 rounded-xl w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-8 bg-rose-950/20 border border-rose-900/40 rounded-3xl text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-rose-300 mb-1">Failed to load products</h3>
            <p className="text-sm text-slate-400 mb-4">
              {(error as any)?.message || 'Unable to connect to the product API service.'}
            </p>
            <button
              onClick={() => refetch()}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg"
            >
              Retry Loading
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="py-16 text-center bg-slate-900/50 border border-slate-800/80 rounded-3xl">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No products available</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              {searchTerm || selectedCategory !== 'all'
                ? 'No items matched your search criteria.'
                : 'No products have been added yet. Use the Admin Dashboard to create your first product.'}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg transition-all hover:scale-105"
            >
              <span>Go to Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock === 0;
              const isAdded = !!addedItems[product._id];

              return (
                <div
                  key={product._id}
                  className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* Image & Badges */}
                  <div className="relative w-full h-56 bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Package className="w-12 h-12 text-slate-700" />
                    )}

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-full text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                      {product.category || 'General'}
                    </div>

                    {/* Stock Pill */}
                    <div className="absolute top-3 right-3">
                      {isOutOfStock ? (
                        <span className="bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          Out of Stock
                        </span>
                      ) : product.stock <= 5 ? (
                        <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          Only {product.stock} left
                        </span>
                      ) : (
                        <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          In Stock
                        </span>
                      )}
                    </div>

                    {/* Quick View Hover Button */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-3 right-3 p-2 bg-slate-900/90 hover:bg-indigo-600 text-white rounded-xl shadow-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block font-medium">Price</span>
                        <span className="text-xl font-black text-emerald-400">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={isOutOfStock}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                          isOutOfStock
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-full uppercase">
                  {quickViewProduct.category || 'General'}
                </span>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full h-56 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                {quickViewProduct.imageUrl ? (
                  <img
                    src={quickViewProduct.imageUrl}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-12 h-12 text-slate-700" />
                )}
              </div>

              <div className="flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{quickViewProduct.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Availability:</span>
                    <span className="font-bold text-slate-200">
                      {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} units left` : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-400">
                      ${Number(quickViewProduct.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct._id);
                        setQuickViewProduct(null);
                      }}
                      disabled={quickViewProduct.stock === 0}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};