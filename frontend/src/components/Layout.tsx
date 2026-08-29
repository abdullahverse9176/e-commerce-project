import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Header / Navbar */}
      <Navbar
        cartCount={0}
        wishlistCount={0}
        onOpenCart={() => { }}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
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
