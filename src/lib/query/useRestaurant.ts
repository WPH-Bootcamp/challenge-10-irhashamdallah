import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";

// 1. PASTIKAN ADA KATA 'export' DI SINI
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "food" | "drink";
}

export interface ReviewItem {
  id: string;
  name: string;
  date: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface RestaurantDetail {
  id: string;
  name: string;
  image: string;
  logo: string;
  location: string;
  rating: number;
  menu: MenuItem[];
  reviews: ReviewItem[];
}

// 2. PASTIKAN ADA KATA 'export' DI SINI JUGA
export function useRestaurantDetail(id: string) {
  return useQuery<RestaurantDetail>({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await api.get(`/api/resto/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export interface RestaurantItem {
  id: string;
  name: string;
  logo: string;
  image: string;
  rating: number;
  location: string;
  distance: string;
  category: string;
}

// 2. Dan pastikan ini juga ter-export dengan aman
export function useRestaurants() {
  return useQuery<RestaurantItem[]>({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await api.get("/api/resto");
      return response.data;
    },
  });
}
