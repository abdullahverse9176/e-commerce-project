import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuthModal } from './AuthModal';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/mockData';

export const Layout: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Header / Navbar */}
      <Navbar
        cartCount={0}
        wishlistCount={0}
        onOpenCart={() => { }}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={MOCK_CATEGORIES}
        allProducts={MOCK_PRODUCTS}
        onSelectProduct={() => { }}
      />

      {/* Main Page Content rendered by React Router Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Login / Register Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};
