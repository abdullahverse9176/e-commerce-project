import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/mockData';

export const Layout: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Header / Navbar */}
      <Navbar
        cartCount={0}
        wishlistCount={0}
        onOpenCart={() => { }}
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
    </div>
  );
};
