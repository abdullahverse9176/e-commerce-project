import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: File | null;
  imageUrl?: string;
}

export interface BackendProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

const BaseUrl = 'http://localhost:8000/api/products';

export const getProducts = async (): Promise<BackendProduct[]> => {
  const res = await axios.get(`${BaseUrl}/get-products`);
  return res.data.data || [];
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const getSingleProduct = async (slug: string): Promise<BackendProduct> => {
  const res = await axios.get(`${BaseUrl}/get-single-product/${slug}`);
  return res.data.data;
};

export const useSingleProduct = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => getSingleProduct(slug),
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  });
};

export const createProduct = async (data: ProductInput): Promise<BackendProduct> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price.toString());
  formData.append('category', data.category);
  formData.append('stock', data.stock.toString());
  
  if (data.image) {
    formData.append('image', data.image);
  } else if (data.imageUrl) {
    formData.append('imageUrl', data.imageUrl);
  }

  const res = await axios.post(`${BaseUrl}/create-product`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductInput) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const updateProduct = async ({ id, data }: { id: string; data: Partial<ProductInput> }): Promise<BackendProduct> => {
  
  const formData = new FormData();
  if (data.name !== undefined) formData.append('name', data.name);
  if (data.description !== undefined) formData.append('description', data.description);
  if (data.price !== undefined) formData.append('price', data.price.toString());
  if (data.category !== undefined) formData.append('category', data.category);
  if (data.stock !== undefined) formData.append('stock', data.stock.toString());
  
  if (data.image) {
    formData.append('image', data.image);
  } else if (data.imageUrl) {
    formData.append('imageUrl', data.imageUrl);
  }

  const res = await axios.patch(`/api/products/update-product/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`/api/products/delete-product/${id}`);
};
