import React, { useState } from 'react';
import {
  Search,
  Filter,
  Edit,
  Trash2,
  FolderTree,
  Sparkles,
  Copy,
  Check,
  PlusCircle,
  Calendar,
  Layers,
  CheckCircle,
  ArrowUpDown,
  Loader2
} from 'lucide-react';
import { CategoryItem } from '../../types/category';

interface CategoryTableProps {
  categories: CategoryItem[];
  isLoading?: boolean;
  onEditCategory: (category: CategoryItem) => void;
  onDeleteCategory?: (categoryId: string) => void;
  onOpenCreate: () => void;
  onToggleStatus?: (categoryId: string) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isLoading = false,
  onEditCategory,
  onDeleteCategory,
  onOpenCreate,
  onToggleStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive' | 'featured'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'items'>('newest');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [copiedSlugId, setCopiedSlugId] = useState<string | null>(null);

  // Copy slug to clipboard
  const handleCopySlug = (id: string, slug: string) => {
    navigator.clipboard.writeText(slug);
    setCopiedSlugId(id);
    setTimeout(() => setCopiedSlugId(null), 2000);
  };

  // Filter & Search Logic
  const filteredCategories = categories.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedStatus === 'active') return item.status === 'active';
    if (selectedStatus === 'inactive') return item.status === 'inactive';
    if (selectedStatus === 'featured') return !!item.isFeatured;
    return true;
  });

  // Sort logic
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'items') {
      return (b.itemCount || 0) - (a.itemCount || 0);
    }
    // Default newest
    return (new Date(b.createdAt || 0).getTime()) - (new Date(a.createdAt || 0).getTime());
  });

  const totalCount = categories.length;
  const activeCount = categories.filter((c) => c.status === 'active').length;
  const featuredCount = categories.filter((c) => c.isFeatured).length;
  const totalProductsCount = categories.reduce((sum, c) => sum + (c.itemCount || 0), 0);

  const handleDeleteConfirm = (id: string) => {
    if (onDeleteCategory) {
      onDeleteCategory(id);
    }
    setConfirmDeleteId(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-slate-900 border border-slate-800 rounded-2xl">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-300 font-medium">Fetching categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Stats Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalCount}</span>
            <span className="text-xs text-slate-400">registered</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active In Store
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">{activeCount}</span>
            <span className="text-xs text-slate-400">visible publicly</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Featured Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-300">{featuredCount}</span>
            <span className="text-xs text-slate-400">on homepage</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Catalog Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-300">{totalProductsCount}</span>
            <span className="text-xs text-slate-400">items categorized</span>
          </div>
        </div>
      </div>

      {/* Search, Filter & Quick Action Bar */}
      <section aria-label="Category Filters" className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900 p-4 border border-slate-800 rounded-2xl shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories by name, slug, or keyword..."
            aria-label="Search categories"
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        {/* Filter Dropdowns & Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="relative shrink-0">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              aria-label="Filter by status"
              className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-8 py-2.5 text-xs font-semibold text-white outline-none cursor-pointer appearance-none transition-colors"
            >
              <option value="all">All Statuses ({categories.length})</option>
              <option value="active">Active ({activeCount})</option>
              <option value="inactive">Inactive ({totalCount - activeCount})</option>
              <option value="featured">Featured ({featuredCount})</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="relative shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort categories"
              className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-8 py-2.5 text-xs font-semibold text-white outline-none cursor-pointer appearance-none transition-colors"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="items">Sort: Most Products</option>
            </select>
          </div>

          {/* Add Category Button */}
          <button
            type="button"
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </section>

      {/* Main Table Container */}
      <section aria-label="Categories Table" className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {sortedCategories.length === 0 ? (
          <div className="py-16 text-center px-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700 mx-auto mb-4 flex items-center justify-center text-slate-500 shadow-inner">
              <FolderTree className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-300">No categories found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              {searchTerm || selectedStatus !== 'all'
                ? 'Try adjusting your search criteria or resetting the status filter.'
                : 'No categories created yet. Add categories to structure your store catalog.'}
            </p>
            <button
              type="button"
              onClick={onOpenCreate}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              + Create Category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/70 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Category Details</th>
                  <th className="py-4 px-4">URL Slug</th>
                  <th className="py-4 px-4">Products</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 hidden md:table-cell">Created</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {sortedCategories.map((category) => {
                  const isActive = category.status !== 'inactive';
                  const isCopied = copiedSlugId === category._id;

                  return (
                    <tr
                      key={category._id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Category Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center shadow-inner group-hover:border-indigo-500/50 transition-colors">
                            {category.imageUrl ? (
                              <img
                                src={category.imageUrl}
                                alt={`${category.name} thumbnail`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <FolderTree className="w-5 h-5 text-indigo-400/80" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                                {category.name}
                              </h3>
                              {category.isFeatured && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                              {category.description || 'No description provided'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Slug with Copy CTA */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-indigo-300 group/slug">
                          <span>{category.slug}</span>
                          <button
                            type="button"
                            onClick={() => handleCopySlug(category._id, category.slug)}
                            aria-label={`Copy slug ${category.slug}`}
                            title="Copy slug to clipboard"
                            className="text-slate-500 hover:text-white transition-colors"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Items / Products Count */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
                          <Layers className="w-3 h-3 text-purple-400" />
                          {category.itemCount ?? 0} Products
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        {isActive ? (
                          <span
                            onClick={() => onToggleStatus && onToggleStatus(category._id)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-pointer hover:bg-emerald-500/20 transition-colors"
                            title="Click to toggle status"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span
                            onClick={() => onToggleStatus && onToggleStatus(category._id)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 border border-slate-700 text-slate-400 cursor-pointer hover:bg-slate-700 transition-colors"
                            title="Click to toggle status"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-4 hidden md:table-cell text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>
                            {category.createdAt
                              ? new Date(category.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : 'Recently added'}
                          </span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onEditCategory(category)}
                            aria-label={`Edit ${category.name}`}
                            title="Edit Category"
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(category._id)}
                            aria-label={`Delete ${category.name}`}
                            title="Delete Category"
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
      </section>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-category-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 id="delete-category-modal-title" className="text-lg font-bold text-white">
                Delete Category?
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              Are you sure you want to remove this category? Products associated with it may need to be recategorized.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConfirm(confirmDeleteId)}
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-rose-600/30 transition-colors"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
