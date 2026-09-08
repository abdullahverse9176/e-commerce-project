import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Product title must be at least 2 characters').trim(),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  description: z.string().min(5, 'Description must be at least 5 characters').trim(),
  imageUrl: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
