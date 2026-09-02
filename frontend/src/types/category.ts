export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  itemCount?: number;
  imageUrl?: string;
  status?: 'active' | 'inactive';
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  imageFile?: File | null;
  status?: 'active' | 'inactive';
  isFeatured?: boolean;
}
