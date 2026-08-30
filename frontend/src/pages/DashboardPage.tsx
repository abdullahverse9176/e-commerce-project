import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Menu, Plus, RefreshCw, LayoutDashboard, Package } from 'lucide-react';
import { getProducts, BackendProduct } from '../services/productApi';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { ProductTable } from '../components/dashboard/ProductTable';
import { ProductFormModal } from '../components/dashboard/ProductFormModal';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add_product'>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modal State for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<BackendProduct | null>(null);

  // React Query Fetch Products
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const handleOpenCreateModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: BackendProduct) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCreateModal={handleOpenCreateModal}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        totalProductsCount={products.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {activeTab === 'overview' ? (
                  <>
                    <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                    <span>Dashboard Overview</span>
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 text-indigo-400" />
                    <span>Product Catalog</span>
                  </>
                )}
              </h1>
              <p className="text-xs text-slate-400">
                React Query state sync active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* React Query Manual Refresh */}
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              title="Refresh Products Data"
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            {/* Add Product Button Header */}
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create Product</span>
            </button>
          </div>
        </header>

        {/* Dashboard Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'overview' && (
            <DashboardOverview
              products={products}
              onOpenCreate={handleOpenCreateModal}
              onNavigateProducts={() => setActiveTab('products')}
              onRefresh={() => refetch()}
            />
          )}

          {activeTab === 'products' && (
            <ProductTable
              products={products}
              isLoading={isLoading}
              isError={isError}
              error={error}
              onEditProduct={handleOpenEditModal}
              onOpenCreate={handleOpenCreateModal}
            />
          )}
        </main>
      </div>

      {/* Product Form Modal for Create / Update */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productToEdit={productToEdit}
      />
    </div>
  );
};
