import { Brand } from './brand.type';
import { categoryType } from './category.type';

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface OrderProduct {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  category: categoryType;
  brand: Brand;
  ratingsAverage: number;
}

export interface CartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  id: number;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type OrderResponse = Order[];
