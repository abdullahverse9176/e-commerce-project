export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isNew?: boolean;
  isHot?: boolean;
  discountPercentage?: number;
  description: string;
  inStock: boolean;
  stockCount?: number;
  tags?: string[];
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface FlashDeal {
  id: string;
  product: Product;
  discountPercentage: number;
  endsAt: string; // ISO date string
  soldCount: number;
  totalStock: number;
}
