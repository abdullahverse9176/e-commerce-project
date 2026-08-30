import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Store,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'overview' | 'products' | 'add_product';
  setActiveTab: (tab: 'overview' | 'products' | 'add_product') => void;
  openCreateModal: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  totalProductsCount: number;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  openCreateModal,
  mobileOpen,
  setMobileOpen,
  totalProductsCount,
}) => {
  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'products',
      label: 'Product Catalog',
      icon: Package,
      badge: totalProductsCount,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      {/* Brand & Sidebar Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg glow-indigo group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white font-['Space_Grotesk']">
              AURA<span className="text-indigo-400">ADMIN</span>
            </span>
            <span className="text-[10px] tracking-wider text-indigo-300/80 font-bold uppercase">
              Management Portal
            </span>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Action Button */}
      <div className="p-4">
        <button
          onClick={() => {
            openCreateModal();
            setMobileOpen(false);
          }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as 'overview' | 'products');
                setMobileOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-6 pb-2">
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Storefront
          </p>
          <Link
            to="/"
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5 text-slate-400" />
              <span>Back to Store</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
        </div>
      </div>

      {/* User / Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Admin User</p>
              <p className="text-xs text-slate-400 mt-0.5">admin@auramart.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 z-30 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex-1 max-w-xs w-full h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
