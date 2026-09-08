import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft,
  PackagePlus,
  Upload,
  Sparkles,
  AlertCircle,
  Package,
  DollarSign,
  Tag,
  Loader2,
} from 'lucide-react';
import { useCreateProduct } from '../../services/productApi';
import { useCategories } from '../../context/CategoryContext';
import { productSchema, ProductFormData } from '../../schemas/productSchema';
import { ProductInput } from '../../types/ecommerce';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const createMutation = useCreateProduct();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: categories[0]?.name || 'General',
      price: undefined,
      stock: 0,
      description: '',
      imageUrl: '',
    },
  });

  // Watch fields for live card preview
  const watchedValues = watch();
  const previewImage = filePreviewUrl || watchedValues.imageUrl || '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFilePreviewUrl(URL.createObjectURL(file));
    }
  };

  const productformSubmission = (formData: ProductFormData) => {
    const payload: ProductInput = {
      name: formData.name,
      category: formData.category || 'General',
      price: Number(formData.price),
      stock: Number(formData.stock || 0),
      description: formData.description,
      image: imageFile,
      imageUrl: formData.imageUrl?.trim() || '',
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Product created successfully!');
        navigate('/dashboard/products');
      },
      onError: (err: any) => {
        const message =
          err.response?.data?.message || err.message || 'Failed to create product.';
        toast.error(message);
      },
    });
  };

  const isSubmitting = createMutation.isPending;

  return (
    <main className="space-y-6">
      {/* Top Breadcrumbs & Back Navigation */}
      <nav aria-label="Dashboard Breadcrumb" className="flex items-center justify-between">
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
      </nav>

      {/* Main Grid: Form & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Form */}
        <section aria-label="Product Creation Form" className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <header className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
              <PackagePlus className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Product Information</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Set product title, pricing, stock count, and upload media
              </p>
            </div>
          </header>

          {createMutation.isError && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>
                {(createMutation.error as any)?.response?.data?.message ||
                  (createMutation.error as Error)?.message ||
                  'Failed to create product.'}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit(productformSubmission)} className="space-y-5" noValidate>
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
                  {...register('name')}
                  placeholder="e.g. Wireless Active Noise-Canceling Headphones"
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all ${
                    errors.name
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name.message}</span>
                  </p>
                )}
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
                  {...register('category')}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="General">General</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.category.message}</span>
                  </p>
                )}
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
                  {...register('price', { valueAsNumber: true })}
                  placeholder="149.99"
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all ${
                    errors.price
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
                />
                {errors.price && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.price.message}</span>
                  </p>
                )}
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
                  {...register('stock', { valueAsNumber: true })}
                  placeholder="30"
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all ${
                    errors.stock
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
                />
                {errors.stock && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.stock.message}</span>
                  </p>
                )}
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
                  {...register('imageUrl')}
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

                  {previewImage && (
                    <div className="relative w-16 h-16 rounded-2xl border border-indigo-500/30 bg-slate-950 overflow-hidden shrink-0 shadow-md">
                      <img
                        src={previewImage}
                        alt="Product preview thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
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
                  {...register('description')}
                  placeholder="Enter detailed description, key specifications, and features..."
                  className={`w-full bg-slate-950 border rounded-xl p-3 text-white text-sm placeholder-slate-500 outline-none transition-all resize-none ${
                    errors.description
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.description.message}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/products')}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Store Card Preview</span>
            </h2>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden space-y-3">
              <div className="w-full h-40 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={watchedValues.name ? `${watchedValues.name} card preview` : 'Product card preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
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
                  {watchedValues.category || 'General'}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-1">
                  {watchedValues.name || 'Product Title'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                  {watchedValues.description || 'Product description will appear here on the storefront product listing.'}
                </p>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80">
                  <span className="text-base font-black text-emerald-400 flex items-center">
                    <DollarSign className="w-4 h-4 mr-0.5" />
                    {watchedValues.price ? Number(watchedValues.price).toFixed(2) : '0.00'}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Stock: {watchedValues.stock !== undefined ? watchedValues.stock : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};
