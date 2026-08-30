import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  Loader2,
  Tag
} from 'lucide-react';
import { BackendProduct, deleteProduct } from '../../services/productApi';

interface ProductTableProps {
  products: BackendProduct[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  onEditProduct: (product: BackendProduct) => void;
  onOpenCreate: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  isError,
  error,
  onEditProduct,
  onOpenCreate,
}) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // React Query Mutation for Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setConfirmDeleteId(null);
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to delete product.');
    },
  });

  const handleDeleteConfirm = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Filter products by search and category
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Extract unique categories
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-slate-900 border border-slate-800 rounded-2xl">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-300 font-medium">Fetching products with React Query...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 bg-rose-950/20 border border-rose-900/40 rounded-2xl text-center">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-rose-300 mb-1">Failed to load product list</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
          {error?.message || 'Could not fetch data from the server API.'}
        </p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Retry Fetching
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls & Search Header */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900 p-4 border border-slate-800 rounded-2xl shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title or description..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-8 py-2.5 text-sm text-white outline-none cursor-pointer appearance-none transition-colors"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-300">No products found</h4>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search query or filter options.'
                : 'Your catalog is empty. Click below to add your first product.'}
            </p>
            <button
              onClick={onOpenCreate}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition-colors"
            >
              + Create Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Product Details</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredProducts.map((product) => {
                  const isLowStock = product.stock > 0 && product.stock <= 5;
                  const isOutOfStock = product.stock === 0;

                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Product Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl border border-slate-700 bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <Package className="w-6 h-6 text-slate-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          {product.category || 'General'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-bold text-emerald-400">
                        ${Number(product.price).toFixed(2)}
                      </td>

                      {/* Stock Status */}
                      <td className="py-4 px-4">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400">
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                            Low ({product.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            In Stock ({product.stock})
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditProduct(product)}
                            title="Edit Product"
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setConfirmDeleteId(product._id)}
                            title="Delete Product"
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Product?</h3>
            </div>
            <p className="text-sm text-slate-300">
              Are you sure you want to permanently delete this product? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(confirmDeleteId)}
                disabled={deleteMutation.isPending}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Product</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
