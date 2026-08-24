import React, { useState } from 'react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_FLASH_DEALS } from '../data/mockData';
import { Product, CartItem } from '../types/ecommerce';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { ValueProps } from '../components/ValueProps';
import { CategoryGrid } from '../components/CategoryGrid';
import { FlashDeals } from '../components/FlashDeals';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { CartDrawer } from '../components/CartDrawer';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';
import { Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1 },
    { product: MOCK_PRODUCTS[2], quantity: 1 },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'bestseller' | 'new'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  // Wishlist operation
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Filtered Products
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'trending') matchesTab = !!product.isHot;
    if (activeTab === 'new') matchesTab = !!product.isNew;
    if (activeTab === 'bestseller') matchesTab = product.rating >= 4.8;

    return matchesCategory && matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      
      {/* Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={MOCK_CATEGORIES}
        allProducts={MOCK_PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Spotlight Hero */}
        <HeroBanner
          featuredProduct={MOCK_PRODUCTS[0]}
          onExplore={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Value Props Bar */}
        <ValueProps />

        {/* Category Showcase Grid */}
        <CategoryGrid
          categories={MOCK_CATEGORIES}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Limited Time Flash Sale */}
        <FlashDeals
          deals={MOCK_FLASH_DEALS}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Catalog / Product Grid Section */}
        <section id="catalog-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Curated Showcase
              </div>
              <h2 className="text-3xl font-extrabold text-white mt-1 font-['Space_Grotesk']">
                Explore Our Products
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Items ({MOCK_PRODUCTS.length})
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'trending'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Trending 🔥
              </button>
              <button
                onClick={() => setActiveTab('bestseller')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'bestseller'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Best Sellers ⭐️
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'new'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                New Arrivals ✨
              </button>
            </div>
          </div>

          {/* Active Category Filter Reset pill */}
          {selectedCategory !== 'all' && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-slate-400">Filtering by category:</span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-white font-black"
                >
                  &times;
                </button>
              </span>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-slate-800">
              <p className="text-lg font-bold text-white">No products found matching your criteria</p>
              <p className="text-xs text-slate-400 mt-1">Try resetting your search query or category filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Subscription */}
        <Newsletter />

      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
};
