import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Menu,
  Plus,
  RefreshCw,
  LayoutDashboard,
  Package,
  FolderTree,
  FolderPlus,
  ArrowLeft
} from 'lucide-react';
import { getProducts } from '../../services/productApi';
import { useCategories } from '../../context/CategoryContext';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const { categories } = useCategories();

  const {
    data: products = [],
    refetch: refetchProducts,
    isFetching: isProductsFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Dynamic header config based on active route
  const getHeaderInfo = () => {
    if (currentPath === '/dashboard/categories') {
      return {
        title: 'Category Management',
        subtitle: 'Organize store taxonomy, URL slugs, and collections',
        icon: FolderTree,
        actionLink: '/dashboard/create-category',
        actionLabel: 'Create Category',
        showAction: true,
        backLink: null,
      };
    }
    if (currentPath === '/dashboard/create-category') {
      return {
        title: 'Create New Category',
        subtitle: 'Define a new product classification with custom slug and visibility',
        icon: FolderPlus,
        actionLink: null,
        actionLabel: null,
        showAction: false,
        backLink: '/dashboard/categories',
      };
    }
    if (currentPath.startsWith('/dashboard/edit-category')) {
      return {
        title: 'Edit Category',
        subtitle: 'Modify category name, slug, image, and homepage status',
        icon: FolderTree,
        actionLink: null,
        actionLabel: null,
        showAction: false,
        backLink: '/dashboard/categories',
      };
    }
    if (currentPath === '/dashboard/products') {
      return {
        title: 'Product Catalog',
        subtitle: 'Manage items, stock inventory, pricing, and images',
        icon: Package,
        actionLink: '/dashboard/create-product',
        actionLabel: 'Create Product',
        showAction: true,
        backLink: null,
      };
    }
    if (currentPath === '/dashboard/create-product') {
      return {
        title: 'Create New Product',
        subtitle: 'Add a new product with images, pricing, and inventory count',
        icon: Package,
        actionLink: null,
        actionLabel: null,
        showAction: false,
        backLink: '/dashboard/products',
      };
    }
    // Default overview
    return {
      title: 'Dashboard Overview',
      subtitle: 'Real-time e-commerce analytics, product metrics & category management',
      icon: LayoutDashboard,
      actionLink: '/dashboard/create-product',
      actionLabel: 'Create Product',
      showAction: true,
      backLink: null,
    };
  };

  const headerInfo = getHeaderInfo();
  const IconComponent = headerInfo.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        totalProductsCount={products.length}
        totalCategoriesCount={categories.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open mobile navigation menu"
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {headerInfo.backLink && (
              <Link
                to={headerInfo.backLink}
                aria-label="Go back"
                title="Back to previous list"
                className="hidden sm:flex items-center justify-center p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}

            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-indigo-400" />
                <span>{headerInfo.title}</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                {headerInfo.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sync Data Button */}
            <button
              type="button"
              onClick={() => refetchProducts()}
              disabled={isProductsFetching}
              title="Refresh Products and Cache"
              aria-label="Sync catalog data"
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProductsFetching ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            {/* Primary Action Button */}
            {headerInfo.showAction && headerInfo.actionLink && (
              <Link
                to={headerInfo.actionLink}
                aria-label={headerInfo.actionLabel || 'Action'}
                title={headerInfo.actionLabel || 'Action'}
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{headerInfo.actionLabel}</span>
              </Link>
            )}
          </div>
        </header>

        {/* Nested Route Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
