import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Package,
  AlertOctagon,
  DollarSign,
  Layers,
  PlusCircle,
  FolderPlus,
  RefreshCw,
  ArrowRight,
  Sparkles,
  FolderTree
} from 'lucide-react';
import { getProducts } from '../../services/productApi';
import { useCategories } from '../../context/CategoryContext';

export const DashboardOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();

  const {
    data: products = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  const activeCategoriesCount = categories.filter((c) => c.status === 'active').length;
  const recentProducts = [...products].reverse().slice(0, 5);
  const featuredCategories = categories.filter((c) => c.isFeatured).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <section aria-label="Dashboard Welcome" className="relative bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 animate-spin" /> Admin Dashboard Overview
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Manage Catalog, Inventory & Categories
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Monitor your product listings, organize store taxonomy, update prices & stock levels with real-time routing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              title="Refresh Products Cache"
              aria-label="Refresh cache"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            <Link
              to="/dashboard/create-category"
              aria-label="Add new category"
              title="Create New Category"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 text-indigo-300 hover:text-white border border-indigo-500/30 px-4 py-3 rounded-xl font-semibold text-xs transition-all hover:scale-105"
            >
              <FolderPlus className="w-4 h-4 text-indigo-400" />
              <span>Add Category</span>
            </Link>

            <Link
              to="/dashboard/create-product"
              aria-label="Add new product"
              title="Create New Product"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-3 rounded-xl font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Metric Cards Grid */}
      <section aria-label="Overview Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Products */}
        <div
          onClick={() => navigate('/dashboard/products')}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group cursor-pointer hover:border-indigo-500/40 hover:bg-slate-850 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-300 transition-colors">
              Total Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalProducts}</span>
            <span className="text-xs text-slate-400">items listed</span>
          </div>
        </div>

        {/* Card 2: Inventory Value */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Inventory Valuation
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">
              ${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Card 3: Out of Stock */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Stock Warnings
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-rose-400">{outOfStockCount}</span>
            <span className="text-xs text-slate-400">out of stock</span>
            {lowStockCount > 0 && (
              <span className="text-xs text-amber-400">({lowStockCount} low)</span>
            )}
          </div>
        </div>

        {/* Card 4: Categories */}
        <div
          onClick={() => navigate('/dashboard/categories')}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group cursor-pointer hover:border-purple-500/50 hover:bg-slate-850 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-purple-300 transition-colors">
              Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-300">{categories.length}</span>
            <span className="text-xs text-slate-400">({activeCategoriesCount} active)</span>
          </div>
        </div>
      </section>

      {/* Featured Categories Quick Bar */}
      <section aria-label="Featured Categories Overview" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-indigo-400" />
              <span>Store Categories</span>
            </h3>
            <p className="text-xs text-slate-400">Categorized taxonomies in your inventory</p>
          </div>
          <Link
            to="/dashboard/categories"
            aria-label="View all categories"
            title="Go to category management"
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Manage All ({categories.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          {featuredCategories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate('/dashboard/categories')}
              className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 hover:border-indigo-500/40 hover:bg-slate-950 cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={`${cat.name} category`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <FolderTree className="w-5 h-5 text-indigo-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                  {cat.name}
                </h4>
                <p className="text-[11px] font-mono text-slate-500 truncate">/{cat.slug}</p>
                <span className="inline-block text-[10px] font-semibold text-purple-400 mt-0.5">
                  {cat.itemCount ?? 0} Products
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Items Preview Section */}
      <section aria-label="Recent Products" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-400" />
              <span>Recently Created Products</span>
            </h3>
            <p className="text-xs text-slate-400">Latest additions to your database</p>
          </div>
          <Link
            to="/dashboard/products"
            aria-label="View full products list"
            title="Go to products list"
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View Full List</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">
            No products available yet. Click "Add Product" to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
            {recentProducts.map((item) => (
              <div
                key={item._id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div className="w-full h-28 rounded-lg bg-slate-900 overflow-hidden mb-3 flex items-center justify-center border border-slate-800">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <Package className="w-8 h-8 text-slate-700" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                    {item.category || 'General'}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 line-clamp-1 group-hover:text-indigo-300 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-emerald-400">${Number(item.price).toFixed(2)}</span>
                    <span className="text-[10px] font-semibold text-slate-400">Stock: {item.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
