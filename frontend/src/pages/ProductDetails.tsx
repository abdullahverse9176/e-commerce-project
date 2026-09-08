import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Package,
  CheckCircle2,
  AlertCircle,
  Tag,
  Minus,
  Plus,
} from 'lucide-react';
import { useSingleProduct } from '../services/productApi';

const ProductDetails = () => {

  const { slug } = useParams<{ slug: string }>();


  const { data: product, isLoading, isError, error } = useSingleProduct(slug || '');
  const [quantity, setQuantity] = useState(1);

  console.log('Product Details:', product);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    if (product && quantity < (product.stock || 10)) {
      setQuantity((prev) => prev + 1);
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-slate-800 rounded w-32" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 h-96 bg-slate-800 rounded-3xl" />
            <div className="lg:col-span-6 space-y-4">
              <div className="h-4 bg-slate-800 rounded w-24" />
              <div className="h-8 bg-slate-800 rounded w-3/4" />
              <div className="h-6 bg-slate-800 rounded w-1/4" />
              <div className="h-24 bg-slate-800 rounded w-full" />
              <div className="h-12 bg-slate-800 rounded w-1/2" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 2. Error / Not Found State
  if (isError || !product) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg mx-auto text-center bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Product Not Found</h1>
          <p className="text-slate-400 text-sm">
            {(error as Error)?.message || "The product you are looking for does not exist or has been removed."}
          </p>
          <div className="pt-2">
            <Link
              to="/"
              aria-label="Return to Home Page"
              title="Return to Home Page"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link
          to="/"
          aria-label="Navigate to Home"
          title="Back to Home"
          className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <span>/</span>
        <span className="text-slate-300 capitalize">{product.category || 'Store'}</span>
        <span>/</span>
        <span className="text-indigo-400 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Image */}
        <section className="lg:col-span-6">
          <figure className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 shadow-2xl flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={`${product.name} preview`}
                className="w-full h-auto max-h-[440px] object-contain rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-600 gap-3 py-16">
                <Package className="w-16 h-16" />
                <span className="text-sm font-medium">No Image Available</span>
              </div>
            )}

            {/* Category Tag Overlay */}
            {product.category && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-indigo-300 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-lg">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>{product.category}</span>
              </div>
            )}
          </figure>
        </section>

        {/* Right Column: Details & Actions */}
        <article className="lg:col-span-6 space-y-6">
          <header className="space-y-3 border-b border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isOutOfStock ? 'Sold Out' : 'Verified Authentic'}</span>
            </div>

            {/* Single H1 on Page */}
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
              {product.name}
            </h1>

            {/* Pricing and Stock Status */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <span className="text-3xl font-black text-emerald-400 font-['Space_Grotesk']">
                ${Number(product.price || 0).toFixed(2)}
              </span>

              {isOutOfStock ? (
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock ({product.stock} units available)</span>
                </span>
              )}
            </div>
          </header>

          {/* Description */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Description
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {product.description || 'No description provided for this product.'}
            </p>
          </section>

          {/* Quantity Selector & Action Buttons */}
          <section className="space-y-4 pt-2 border-t border-slate-800">
            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-300">Quantity:</span>
                <div className="inline-flex items-center border border-slate-800 bg-slate-950 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stock}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase quantity"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                disabled={isOutOfStock}
                aria-label={`Add ${product.name} to Cart`}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-4 rounded-2xl shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
            </div>
          </section>

          {/* Guarantees Box */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-slate-300">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-xs font-semibold">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold">100% Authentic</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <RotateCcw className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-xs font-semibold">30-Day Return</span>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default ProductDetails;