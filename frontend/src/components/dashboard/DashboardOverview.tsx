import React from 'react';
import {
  Package,
  AlertOctagon,
  DollarSign,
  Layers,
  PlusCircle,
  RefreshCw,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BackendProduct } from '../../services/productApi';

interface DashboardOverviewProps {
  products: BackendProduct[];
  onOpenCreate: () => void;
  onNavigateProducts: () => void;
  onRefresh: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  products,
  onOpenCreate,
  onNavigateProducts,
  onRefresh,
}) => {
  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  
  const totalInventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  const categoriesCount = new Set(products.map((p) => p.category).filter(Boolean)).size;

  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 animate-spin" /> Admin Dashboard Overview
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Manage Catalog & Inventory
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Monitor your product listings, update prices & stock levels, and create new items seamlessly powered by React Query.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRefresh}
              className="p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              title="Refresh React Query Cache"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Products */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalProducts}</span>
            <span className="text-xs text-slate-400">items</span>
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

        {/* Card 4: Total Categories */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-300">{categoriesCount}</span>
            <span className="text-xs text-slate-400">active categories</span>
          </div>
        </div>
      </div>

      {/* Recent Items Preview Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Recently Created Products</h3>
            <p className="text-xs text-slate-400">Latest additions to your database</p>
          </div>
          <button
            onClick={onNavigateProducts}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View Full List</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentProducts.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">
            No products available yet. Add some to get started!
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
      </div>
    </div>
  );
};
