import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FolderPlus,
  Link2,
  Upload,
  Lock,
  Unlock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  FolderTree,
  Code2
} from 'lucide-react';
import { useCategories } from '../../context/CategoryContext';
import { CategoryFormData } from '../../types/category';

export const CreateCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { addCategory } = useCategories();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [isFeatured, setIsFeatured] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to slugify
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isSlugManual) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(generateSlug(e.target.value));
  };

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
      setErrorMsg('Category name is required.');
      return;
    }

    const finalSlug = slug.trim() || generateSlug(name);
    if (!finalSlug) {
      setErrorMsg('Category slug is required.');
      return;
    }

    setIsSubmitting(true);

    const formData: CategoryFormData = {
      name: name.trim(),
      slug: finalSlug,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      imageFile: imageFile,
      status,
      isFeatured,
    };

    // NOTE: User can connect their backend API call here:
    // e.g. await axios.post('/api/categories/create-category', { name: formData.name, slug: formData.slug })
    addCategory(formData);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/categories');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/categories"
            aria-label="Back to categories list"
            title="Return to Categories"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Categories</span>
          </Link>
          <span className="text-slate-600 text-xs">/</span>
          <span className="text-xs text-indigo-400 font-semibold">Create New Category</span>
        </div>
      </div>

      {/* Main Grid: Form & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Form */}
        <section aria-label="Category Form Section" className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
              <FolderPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Category Details</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure taxonomy name, URL path, and storefront presentation settings
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
            {/* Category Name */}
            <div>
              <label
                htmlFor="create-category-name"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Category Name <span className="text-indigo-400">*</span>
              </label>
              <input
                id="create-category-name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Smart Electronics & Wearables"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* URL Slug with Auto / Manual lock */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="create-category-slug"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                >
                  URL Slug <span className="text-indigo-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugManual(!isSlugManual)}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {isSlugManual ? (
                    <>
                      <Lock className="w-3 h-3" />
                      <span>Custom Mode (Click to auto-sync)</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3" />
                      <span>Auto-Generating from Name</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-xs">
                  <Link2 className="w-4 h-4 mr-1 text-slate-500" />
                  <span className="text-slate-600 font-mono hidden sm:inline">/categories/</span>
                </div>
                <input
                  id="create-category-slug"
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="smart-electronics"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl pl-9 sm:pl-32 pr-4 py-2.5 text-white font-mono text-sm placeholder-slate-600 outline-none transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Unique identifier used in URLs: <code className="text-indigo-300">/api/categories/{slug || 'category-slug'}</code>
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="create-category-desc"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Description <span className="text-slate-500 text-[10px] font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="create-category-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this category and what products belong to it..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-white text-sm placeholder-slate-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Image Web URL */}
            <div>
              <label
                htmlFor="create-category-img"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Category Cover / Banner URL <span className="text-slate-500 text-[10px] font-normal lowercase">(optional)</span>
              </label>
              <input
                id="create-category-img"
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (!imageFile) setPreviewUrl(e.target.value);
                }}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* File Upload Option */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Or Upload Thumbnail / Image File
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="flex-1 w-full flex items-center justify-center gap-2.5 border-2 border-dashed border-slate-800 hover:border-indigo-500/80 rounded-2xl p-4 bg-slate-950/60 cursor-pointer transition-all group">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  <span className="text-xs text-slate-300 group-hover:text-indigo-300">
                    {imageFile ? imageFile.name : 'Choose a category image file'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {previewUrl ? (
                  <div className="relative w-16 h-16 rounded-2xl border border-indigo-500/30 bg-slate-950 overflow-hidden shrink-0 shadow-md">
                    <img
                      src={previewUrl}
                      alt={name ? `${name} preview` : 'Category image preview'}
                      className="w-full h-full object-cover"
                      onError={() => setPreviewUrl('')}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl border border-slate-800 bg-slate-950/60 flex items-center justify-center shrink-0 text-slate-600">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>

            {/* Status & Featured Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label
                  htmlFor="create-category-status"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Publish Status
                </label>
                <select
                  id="create-category-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all cursor-pointer"
                >
                  <option value="active">Active (Visible in Store)</option>
                  <option value="inactive">Inactive (Hidden / Draft)</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-3 p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Feature on Storefront Homepage
                  </span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/categories')}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <FolderPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving Category...' : 'Save & Publish Category'}</span>
              </button>
            </div>
          </form>
        </section>

        {/* Right 1 Col: Live Preview & Developer Integration Helper */}
        <aside aria-label="Category Preview and Notes" className="space-y-6">
          {/* Card 1: Storefront Live Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Storefront Live Preview</span>
            </h3>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden space-y-3">
              <div className="w-full h-32 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center relative">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={name ? `${name} preview` : 'Category preview'}
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl('')}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <FolderTree className="w-8 h-8 text-indigo-400/60" />
                    <span className="text-[11px]">Cover Preview</span>
                  </div>
                )}

                {isFeatured && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Featured
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white truncate">
                    {name || 'Category Name'}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {status === 'active' ? 'Active' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs font-mono text-indigo-400 mt-0.5">
                  /{slug || 'category-slug'}
                </p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {description || 'Provide a short description to guide customers about products in this category.'}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Developer API Guide */}
          <div className="bg-slate-900/60 border border-indigo-500/20 rounded-3xl p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>API Integration Ready</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This form collects the exact payload required by your backend:
            </p>
            <div className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] text-indigo-300 border border-slate-800 space-y-1">
              <div>{`{`}</div>
              <div className="pl-4">{`"name": "${name || 'Electronics'}",`}</div>
              <div className="pl-4">{`"slug": "${slug || 'electronics'}"`}</div>
              <div>{`}`}</div>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Backend endpoint: <code>POST /api/categories/create-category</code></span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
