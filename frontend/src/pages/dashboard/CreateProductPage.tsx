import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  PackagePlus,
  Upload,
  Sparkles,
  AlertCircle,
  Package,
  DollarSign,
  Tag,
  Loader2
} from 'lucide-react';
import { createProduct, ProductInput } from '../../services/productApi';
import { useCategories } from '../../context/CategoryContext';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { categories } = useCategories();

  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Electronics');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: (newProduct: ProductInput) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/dashboard/products');
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to create product.');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Product name is required.');
      return;
    }
    if (price === '' || Number(price) < 0) {
      setErrorMsg('Valid product price is required.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Product description is required.');
      return;
    }

    const payload: ProductInput = {
      name: name.trim(),
      category: category.trim() || 'General',
      price: Number(price),
      stock: stock === '' ? 0 : Number(stock),
      description: description.trim(),
      image: imageFile,
      imageUrl: imageUrl.trim(),
    };

    createMutation.mutate(payload);
  };

  const isLoading = createMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/products"
            aria-label="Back to products list"
            title="Return to Product Catalog"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Products</span>
          </Link>
          <span className="text-slate-600 text-xs">/</span>
          <span className="text-xs text-indigo-400 font-semibold">Create New Product</span>
        </div>
      </div>

      {/* Main Grid: Form & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Form */}
        <section aria-label="Product Creation Form" className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
              <PackagePlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Product Information</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Set product title, pricing, stock count, and upload media
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Title */}
              <div className="md:col-span-2">
                <label
                  htmlFor="create-prod-name"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Product Title <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="create-prod-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wireless Active Noise-Canceling Headphones"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label
                  htmlFor="create-prod-cat"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Category
                </label>
                <select
                  id="create-prod-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="General">General</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="create-prod-price"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Price ($) <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="create-prod-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="149.99"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="create-prod-stock"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Stock Inventory Count
                </label>
                <input
                  id="create-prod-stock"
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value ? Number(e.target.value) : '')}
                  placeholder="30"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Image Web URL */}
              <div>
                <label
                  htmlFor="create-prod-url"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Image URL <span className="text-slate-500 text-[10px] font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="create-prod-url"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (!imageFile) setPreviewUrl(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Upload Image File */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Product Image File (Upload)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="flex-1 w-full flex items-center justify-center gap-2.5 border-2 border-dashed border-slate-800 hover:border-indigo-500/80 rounded-2xl p-4 bg-slate-950/60 cursor-pointer transition-all group">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-xs text-slate-300 group-hover:text-indigo-300">
                      {imageFile ? imageFile.name : 'Choose a product photo to upload'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {previewUrl && (
                    <div className="relative w-16 h-16 rounded-2xl border border-indigo-500/30 bg-slate-950 overflow-hidden shrink-0 shadow-md">
                      <img
                        src={previewUrl}
                        alt={name ? `${name} product preview` : 'Product preview'}
                        className="w-full h-full object-cover"
                        onError={() => setPreviewUrl('')}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="create-prod-desc"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Product Description <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  id="create-prod-desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed description, key specifications, and features..."
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-white text-sm placeholder-slate-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/products')}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Product...</span>
                  </>
                ) : (
                  <>
                    <PackagePlus className="w-4 h-4" />
                    <span>Create & Publish Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Right 1 Col: Live Storefront Card Preview */}
        <aside aria-label="Product Card Preview" className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Store Card Preview</span>
            </h3>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden space-y-3">
              <div className="w-full h-40 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center relative">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={name ? `${name} card preview` : 'Product card preview'}
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl('')}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <Package className="w-10 h-10 text-slate-700" />
                    <span className="text-[11px]">Product Image</span>
                  </div>
                )}
              </div>

              <div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  <Tag className="w-2.5 h-2.5" />
                  {category || 'General'}
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5 line-clamp-1">
                  {name || 'Product Title'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                  {description || 'Product description will appear here on the storefront product listing.'}
                </p>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80">
                  <span className="text-base font-black text-emerald-400 flex items-center">
                    <DollarSign className="w-4 h-4 mr-0.5" />
                    {price ? Number(price).toFixed(2) : '0.00'}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Stock: {stock !== '' ? stock : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
