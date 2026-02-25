import { Brand } from './brand.type';
import { categoryType } from './category.type';

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistItem[];
}

export interface WishlistItem {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: categoryType;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}