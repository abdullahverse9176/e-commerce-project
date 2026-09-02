import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Loader2,
  FolderPlus,
  Edit2,
  AlertCircle,
  Link2,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { CategoryItem, CategoryFormData } from '../../types/category';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: CategoryItem | null;
  onSubmit?: (data: CategoryFormData, isEditing: boolean, categoryId?: string) => void;
  isLoading?: boolean;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  categoryToEdit,
  onSubmit,
  isLoading = false,
}) => {
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
  const [successNotice, setSuccessNotice] = useState(false);

  const isEditing = !!categoryToEdit;

  // Helper to create slug from text
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Pre-fill form when editing or resetting
  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name || '');
      setSlug(categoryToEdit.slug || '');
      setIsSlugManual(true);
      setDescription(categoryToEdit.description || '');
      setImageUrl(categoryToEdit.imageUrl || '');
      setPreviewUrl(categoryToEdit.imageUrl || '');
      setStatus(categoryToEdit.status || 'active');
      setIsFeatured(!!categoryToEdit.isFeatured);
      setImageFile(null);
    } else {
      setName('');
      setSlug('');
      setIsSlugManual(false);
      setDescription('');
      setImageUrl('');
      setPreviewUrl('');
      setStatus('active');
      setIsFeatured(false);
      setImageFile(null);
    }
    setErrorMsg(null);
    setSuccessNotice(false);
  }, [categoryToEdit, isOpen]);

  // Handle auto slug update when typing name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isSlugManual) {
      setSlug(generateSlug(newName));
    }
  };

  // Handle manual slug input
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(generateSlug(e.target.value));
  };

  // Handle image file selection
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

    const payload: CategoryFormData = {
      name: name.trim(),
      slug: finalSlug,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      imageFile: imageFile,
      status,
      isFeatured,
    };

    if (onSubmit) {
      onSubmit(payload, isEditing, categoryToEdit?._id);
    } else {
      // Standalone visual feedback when no custom handler is passed
      setSuccessNotice(true);
      setTimeout(() => {
        setSuccessNotice(false);
        onClose();
      }, 1200);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-inner">
              {isEditing ? <Edit2 className="w-5 h-5" /> : <FolderPlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="category-modal-title" className="text-lg font-bold text-white tracking-tight">
                {isEditing ? 'Edit Category' : 'Create New Category'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEditing
                  ? 'Update category settings and display options'
                  : 'Define a new product classification for your store catalog'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert if standalone */}
        {successNotice && (
          <div className="mx-6 mt-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-300 text-sm animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>Category form validated successfully! Ready for API integration.</span>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Category Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="category-name-input"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Category Name <span className="text-indigo-400">*</span>
              </label>
              <input
                id="category-name-input"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Smart Electronics & Wearables"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* Slug Field with Auto / Manual Toggle */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="category-slug-input"
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
                      <span>Custom mode (Click for Auto-sync)</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3" />
                      <span>Auto-generating from Name</span>
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
                  id="category-slug-input"
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="smart-electronics"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl pl-9 sm:pl-32 pr-4 py-2.5 text-white font-mono text-sm placeholder-slate-600 outline-none transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Unique identifier used in URLs and filtering: <code className="text-indigo-300">/api/categories/{slug || 'example-slug'}</code>
              </p>
            </div>

            {/* Category Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="category-desc-input"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Description <span className="text-slate-500 text-[10px] font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="category-desc-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the range of products in this category..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-white text-sm placeholder-slate-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Image Web URL */}
            <div className="md:col-span-2">
              <label
                htmlFor="category-img-url"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Category Cover / Banner URL <span className="text-slate-500 text-[10px] font-normal lowercase">(optional)</span>
              </label>
              <input
                id="category-img-url"
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

            {/* Image File Upload & Preview */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Or Upload Thumbnail Icon / File
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="flex-1 w-full flex items-center justify-center gap-2.5 border-2 border-dashed border-slate-800 hover:border-indigo-500/80 rounded-2xl p-4 bg-slate-950/60 cursor-pointer transition-all group">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  <span className="text-xs text-slate-300 group-hover:text-indigo-300">
                    {imageFile ? imageFile.name : 'Choose a category badge / photo'}
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
                      alt={name ? `${name} category preview` : 'Category image preview'}
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

            {/* Status Selector */}
            <div>
              <label
                htmlFor="category-status-select"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Publish Status
              </label>
              <select
                id="category-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all cursor-pointer"
              >
                <option value="active">Active (Visible in Store)</option>
                <option value="inactive">Inactive (Hidden / Draft)</option>
              </select>
            </div>

            {/* Featured Switch */}
            <div className="flex flex-col justify-center">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Featured Display
              </label>
              <label className="flex items-center gap-3 p-2 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 focus:ring-offset-slate-900"
                />
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Highlight on Homepage
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
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
                  <span>{isEditing ? 'Saving...' : 'Creating...'}</span>
                </>
              ) : (
                <>
                  {isEditing ? <Edit2 className="w-4 h-4" /> : <FolderPlus className="w-4 h-4" />}
                  <span>{isEditing ? 'Update Category' : 'Save Category'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
