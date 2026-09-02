import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts, BackendProduct } from '../../services/productApi';
import { ProductTable } from '../../components/dashboard/ProductTable';
import { ProductFormModal } from '../../components/dashboard/ProductFormModal';

export const ProductsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<BackendProduct | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const handleOpenCreate = () => {
    navigate('/dashboard/create-product');
  };

  const handleEditProduct = (product: BackendProduct) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  return (
    <div className="space-y-6">
      <ProductTable
        products={products}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onEditProduct={handleEditProduct}
        onOpenCreate={handleOpenCreate}
      />

      {/* Edit Product Modal */}
      <ProductFormModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        productToEdit={productToEdit}
      />
    </div>
  );
};
