import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CategoryItem, CategoryFormData } from '../types/category';

// Default initial category items for rich UI presentation
export const defaultInitialCategories: CategoryItem[] = [
  {
    _id: 'cat-1',
    name: 'Electronics & Gadgets',
    slug: 'electronics-gadgets',
    description: 'Smart devices, headphones, audio gear, and modern accessories.',
    itemCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    status: 'active',
    isFeatured: true,
    createdAt: '2026-08-15T10:30:00.000Z',
    updatedAt: '2026-08-20T14:15:00.000Z',
  },
  {
    _id: 'cat-2',
    name: 'Fashion & Apparel',
    slug: 'fashion-apparel',
    description: 'Designer streetwear, premium jackets, footwear, and casual essentials.',
    itemCount: 28,
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&auto=format&fit=crop&q=80',
    status: 'active',
    isFeatured: true,
    createdAt: '2026-08-18T12:00:00.000Z',
    updatedAt: '2026-08-22T09:45:00.000Z',
  },
  {
    _id: 'cat-3',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Minimalist furniture, smart home lighting, and curated decor.',
    itemCount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=80',
    status: 'active',
    isFeatured: false,
    createdAt: '2026-08-20T08:20:00.000Z',
    updatedAt: '2026-08-25T11:10:00.000Z',
  },
  {
    _id: 'cat-4',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    description: 'Organic skincare, fragrances, grooming kits, and health items.',
    itemCount: 11,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80',
    status: 'active',
    isFeatured: true,
    createdAt: '2026-08-22T14:00:00.000Z',
    updatedAt: '2026-08-28T16:30:00.000Z',
  },
  {
    _id: 'cat-5',
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Athletic wear, workout equipment, yoga mats, and tracking bands.',
    itemCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80',
    status: 'active',
    isFeatured: false,
    createdAt: '2026-08-25T09:10:00.000Z',
    updatedAt: '2026-08-30T10:05:00.000Z',
  },
  {
    _id: 'cat-6',
    name: 'Seasonal Clearance',
    slug: 'seasonal-clearance',
    description: 'Archived collections and discounted end-of-season warehouse stock.',
    itemCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80',
    status: 'inactive',
    isFeatured: false,
    createdAt: '2026-08-28T15:40:00.000Z',
    updatedAt: '2026-09-01T12:00:00.000Z',
  },
];

interface CategoryContextType {
  categories: CategoryItem[];
  addCategory: (data: CategoryFormData) => CategoryItem;
  updateCategory: (id: string, data: CategoryFormData) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryStatus: (id: string) => void;
  getCategoryById: (id: string) => CategoryItem | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryItem[]>(defaultInitialCategories);

  const addCategory = (data: CategoryFormData): CategoryItem => {
    const newCategory: CategoryItem = {
      _id: `cat-${Date.now()}`,
      name: data.name,
      slug: data.slug,
      description: data.description,
      itemCount: 0,
      imageUrl: data.imageUrl || (data.imageFile ? URL.createObjectURL(data.imageFile) : ''),
      status: data.status || 'active',
      isFeatured: !!data.isFeatured,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCategories((prev) => [newCategory, ...prev]);
    return newCategory;
  };

  const updateCategory = (id: string, data: CategoryFormData) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === id
          ? {
              ...cat,
              name: data.name,
              slug: data.slug,
              description: data.description,
              imageUrl: data.imageUrl || (data.imageFile ? URL.createObjectURL(data.imageFile) : cat.imageUrl),
              status: data.status || 'active',
              isFeatured: !!data.isFeatured,
              updatedAt: new Date().toISOString(),
            }
          : cat
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === id
          ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
          : cat
      )
    );
  };

  const getCategoryById = (id: string) => {
    return categories.find((cat) => cat._id === id);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleCategoryStatus,
        getCategoryById,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
