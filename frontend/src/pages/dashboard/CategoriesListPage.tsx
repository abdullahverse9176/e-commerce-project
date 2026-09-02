import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';
import { CategoryTable } from '../../components/dashboard/CategoryTable';
import { CategoryItem } from '../../types/category';

export const CategoriesListPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, deleteCategory, toggleCategoryStatus } = useCategories();

  const handleOpenCreate = () => {
    navigate('/dashboard/create-category');
  };

  const handleEditCategory = (category: CategoryItem) => {
    navigate(`/dashboard/edit-category/${category._id}`);
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  const handleToggleStatus = (categoryId: string) => {
    toggleCategoryStatus(categoryId);
  };

  return (
    <div className="space-y-6">
      <CategoryTable
        categories={categories}
        onOpenCreate={handleOpenCreate}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};
