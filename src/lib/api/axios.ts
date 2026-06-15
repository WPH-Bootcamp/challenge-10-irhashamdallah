import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://be-restaurant-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Otomatis menyisipkan Token "Gembok" 🔒
api.interceptors.request.use(
  (config) => {
    // Ambil token dari store Zustand secara langsung
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Menangani error global (Misal: Token kedaluwarsa / 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Jika token tidak valid / ter-logout di server, bersihkan Zustand auth
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  },
);
