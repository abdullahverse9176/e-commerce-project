import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts, BackendProduct } from '../../services/productApi';
import { ProductTable } from '../../components/dashboard/ProductTable';

export const ProductsListPage: React.FC = () => {
  const navigate = useNavigate();

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
    navigate(`/dashboard/edit-product/${product._id}`);
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
    </div>
  );
};

