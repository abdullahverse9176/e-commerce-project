import React from 'react';
import { Category } from '../types/ecommerce';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Collections</span>
          <h2 className="text-3xl font-extrabold text-white mt-1 font-['Space_Grotesk']">
            Browse Popular Categories
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Explore our handpicked collections featuring top-tier electronics, fashion apparel, accessories, and home tech.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-indigo-500/50 transition-all shadow-lg ${
              idx === 0 ? 'sm:col-span-2' : ''
            }`}
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

            {/* Card Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700/60">
                  {cat.itemCount} Items
                </span>
                <div className="w-9 h-9 rounded-full bg-indigo-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-slate-200">
                  <span>Explore Collection</span> &rarr;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
