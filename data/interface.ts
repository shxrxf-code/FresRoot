export type Role = "CUSTOMER" | "ADMIN" | "FARMER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar: string;
  greenPoints: number;
  createdAt: string;
  address?: string;
  farmId?: string;
}

export interface QualityResult {
  batch: string;
  productId: string;
  product: string;
  farmer: string;
  date: string;
  results: { check: string; score: number; status: "Pass" | "Fail" }[];
  status: "Verified" | "Pending" | "Rejected";
  freshnessIndex: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  image: string;
  productCount: number;
  color: string;
  desc: string;
}

export interface Farm {
  id: string;
  name: string;
  farmer: string;
  location: string;
  city: string;
  products: number;
  rating: number;
  reviews: number;
  image: string;
  status: "Active" | "Pending" | "Suspended";
  farmingMethod: string;
  certifications: string[];
  bio: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  unit: string;
  farm: string;
  farmId: string;
  rating: number;
  reviews: number;
  stock: string;
  stockKg: number;
  image: string;
  images: string[];
  compareAtPrice?: number;
  farmingMethod: string;
  harvestDate: string;
  description: string;
  badges: string[];
  location: string;
  nutrition: { label: string; value: string }[];
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  unit: string;
  qty: number;
  image: string;
  farm: string;
}

export interface Order {
  id: string;
  customerId: string;
  customer: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  paymentStatus: "Paid" | "Pending" | "Failed";
  orderStatus: string;
  deliveryAddress: string;
  deliverySlot: string;
  createdAt: string;
  agent: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  customer: string;
  plan: string;
  frequency: string;
  price: number;
  nextDelivery: string;
  status: "Active" | "Paused" | "Cancelled";
  deliveryDay: string;
  items: string[];
}
