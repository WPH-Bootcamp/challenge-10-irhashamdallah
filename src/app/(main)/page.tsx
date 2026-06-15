"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Search,
  Loader2,
  LogOut,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";
import { useAuthStore } from "@/store/authStore";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

interface LocalRestaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  location: string;
  distance?: string;
  category?: string;
  cuisine?: string; 
  type?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: "all", name: "All Restaurant", image: "/All.png" },
  { id: "nearby", name: "Nearby", image: "/Location.png" },
  { id: "discount", name: "Discount", image: "/Discount.png" },
  { id: "bestseller", name: "Best Seller", image: "/Best.png" },
  { id: "delivery", name: "Delivery", image: "/Delivery.png" },
  { id: "lunch", name: "Lunch", image: "/lunch.png" },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 🔑 KONTROL AUTH GLOBAL ZUSTAND
  const { token, userName, setAuth, clearAuth } = useAuthStore();

  // 📡 EFFECT: Menangani Scroll Navbar Khas Desainmu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: profileData } = useQuery({
    queryKey: ["userProfile", token],
    queryFn: async () => {
      if (!token) return null;
      const response = await api.get("/api/auth/profile");
      return response.data;
    },
    enabled: !!token, 
  });

  useEffect(() => {
    if (profileData) {
      const userPayload = profileData.data || profileData;
      if (userPayload?.name && userPayload.name !== userName) {
        setAuth(token || "", userPayload.name);
      }
    }
  }, [profileData, token, userName, setAuth]);

  const {
    data: restaurantResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await api.get("/api/resto");
      return response.data;
    },
  });

  const getSafeRestaurants = (): LocalRestaurant[] => {
    if (restaurantResponse) {
      console.log(
        "👉 STRUKTUR KEY DARI SWAGGER KAMU:",
        Object.keys(restaurantResponse),
      );
      console.log("👉 NILAI UTAMA RESPONS:", restaurantResponse);
    }

    if (!restaurantResponse) return getMockData();
    if (Array.isArray(restaurantResponse)) return restaurantResponse;

    if (typeof restaurantResponse === "object") {
      const rawObj = restaurantResponse as Record<string, unknown>;

      if (rawObj.data && Array.isArray(rawObj.data))
        return rawObj.data as LocalRestaurant[];
      if (rawObj.rows && Array.isArray(rawObj.rows))
        return rawObj.rows as LocalRestaurant[];

      const nestedData = rawObj.data as Record<string, unknown>;
      if (
        nestedData &&
        typeof nestedData === "object" &&
        Array.isArray(nestedData.rows)
      ) {
        return nestedData.rows as LocalRestaurant[];
      }
      if (Array.isArray(rawObj.results))
        return rawObj.results as LocalRestaurant[];

      const keys = Object.keys(rawObj);
      for (const key of keys) {
        if (Array.isArray(rawObj[key])) {
          return rawObj[key] as LocalRestaurant[];
        }
      }
    }

    return getMockData();
  };

  const getMockData = (): LocalRestaurant[] => {
    return Array.from({ length: 12 }, (_, index) => ({
      id: `mock-id-${index + 1}`,
      name: "Burger King",
      logo: "/logo-bk.png",
      rating: 4.9,
      location: "Jakarta Selatan",
      distance: "2.4 km",
      category: index % 2 === 0 ? "lunch" : "bestseller",
    }));
  };
  const restaurants = getSafeRestaurants();

  console.log("1. RESPONS ASLI SWAGGER:", restaurantResponse);
  console.log("2. HASIL EKSTRAKSI ARRAY:", restaurants);
  const filteredRestaurants = restaurants.filter((resto: LocalRestaurant) => {
    if (!resto) return false;

    const nameText = resto.name ? String(resto.name).toLowerCase() : "";
    const searchTarget = searchQuery ? searchQuery.toLowerCase().trim() : "";
    const matchesSearch = nameText.includes(searchTarget);

    if (activeCategory === "all") {
      return matchesSearch;
    }

    const restoCategory = resto.category || resto.cuisine || resto.type || "";

    const matchesCategory =
      restoCategory.toLowerCase().trim() ===
      activeCategory.toLowerCase().trim();

    return matchesSearch && matchesCategory;
  });

  const displayUserName =
    profileData?.data?.name || profileData?.name || userName || "User Foody";

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#0C0D0D] flex flex-col items-center justify-center text-white space-y-3">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
        <p className="text-xs font-semibold tracking-wide text-gray-300">
          Loading premium culinary experiences...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center text-gray-900 p-6 text-center space-y-2">
        <p className="font-bold text-sm">Failed to load system data.</p>
        <p className="text-xs text-gray-400">
          Please check backend database connection or server availability.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col antialiased">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-24 py-4 flex items-center justify-between ${
          isScrolled
            ? "bg-white border-b border-gray-100 shadow-sm text-gray-900"
            : "bg-transparent text-white"
        }`}
      >
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Foody Logo"
            className={`w-6 h-6 object-contain ${isScrolled ? "" : "brightness-0 invert"}`}
          />
          <span className="text-base font-black tracking-tight">Foody</span>
        </div>

        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <Link
                href="/login"
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                  isScrolled
                    ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-full text-xs font-bold transition-all bg-white text-gray-900 shadow-sm border border-transparent hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/cart"
                className={`p-1.5 hover:opacity-80 transition-opacity flex items-center justify-center ${
                  isScrolled ? "text-gray-950" : "text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-bag"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none cursor-pointer"
                >
                  <img
                    src="/avatar.png"
                    alt={displayUserName}
                    className="w-8 h-8 rounded-full object-cover border border-white/20 hover:scale-105 transition-transform"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2 z-50 text-gray-900 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 flex items-center space-x-3 border-b border-gray-50">
                      <img
                        src="/avatar.png"
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                      <span className="text-xs font-black text-gray-950 truncate">
                        {displayUserName}
                      </span>
                    </div>

                    <div className="p-1">
                      <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-xs text-gray-700 font-bold rounded-xl hover:bg-gray-50 text-left transition-colors">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>Delivery Address</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-xs text-gray-700 font-bold rounded-xl hover:bg-gray-50 text-left transition-colors">
                        <ClipboardList className="w-4 h-4 text-gray-400" />
                        <span>My Orders</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-50 p-1 mt-1">
                      <button
                        onClick={() => {
                          clearAuth();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 text-xs text-red-500 font-extrabold rounded-xl hover:bg-red-50 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="w-full h-[480px] md:h-[580px] bg-[#0C0D0D] relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-lighten pointer-events-none">
          <img
            src="/home-hero.png"
            alt="Figma Burger Dark Showcase"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-3 pt-12">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight px-2">
            Explore Culinary Experiences
          </h1>
          <p className="text-xs md:text-sm text-white/80 font-medium max-w-md mx-auto">
            Search and refine your choice to discover the perfect restaurant.
          </p>

          <div className="relative max-w-md mx-auto w-full pt-4 px-4 sm:px-0">
            <div className="w-full h-12 px-5 bg-white shadow-xl rounded-full flex items-center space-x-3 border border-transparent focus-within:border-gray-200">
              <Search className="text-gray-400 w-5 h-5 shrink-0" />
              <input
                type="text"
                placeholder="Search restaurants, food and drink"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent text-xs text-gray-900 focus:outline-none border-none p-0 placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-6 md:px-12 pt-8 relative z-20">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
          {CATEGORIES.map((cat: CategoryItem) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl border cursor-pointer transition-all ${
                activeCategory === cat.id
                  ? "border-red-500 shadow-md scale-102 font-bold"
                  : "border-gray-100 shadow-xs hover:border-gray-200"
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] md:text-xs font-bold tracking-tight text-gray-800 whitespace-nowrap">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-6 md:px-12 py-12 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base md:text-lg font-black tracking-tight text-gray-900">
            Recommended
          </h3>
          <span className="text-xs font-bold text-red-500 cursor-pointer hover:underline">
            See All
          </span>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="w-full py-16 text-center text-gray-400 text-xs bg-white rounded-2xl border border-dashed border-gray-100">
            No restaurants found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((resto: LocalRestaurant) => (
              <Link
                href={`/resto/${resto.id}`}
                key={resto.id}
                className="group bg-white rounded-2xl border border-gray-100 p-3 shadow-3xs hover:shadow-2xs transition-all duration-200 flex items-center space-x-4"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 shadow-3xs flex items-center justify-center">
                  <img
                    src={resto.logo || "/logo-bk.png"}
                    alt={resto.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/logo-bk.png";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <h4 className="font-bold text-xs md:text-sm text-gray-900 truncate group-hover:text-red-500 transition-colors">
                    {resto.name}
                  </h4>

                  <div className="flex items-center space-x-1 text-[10px] text-gray-500 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                    <span className="text-gray-800">
                      {resto.rating ? resto.rating.toFixed(1) : "0.0"}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-400 truncate font-medium">
                    {resto.location || "Jakarta Selatan"}{" "}
                    {resto.distance ? `· ${resto.distance}` : "· 2.4 km"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="w-full flex justify-center pt-8">
          <button className="px-6 py-2 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-3xs">
            Show More
          </button>
        </div>
      </section>

      <footer className="w-full bg-[#0C0D0D] text-white border-t border-white/5 mt-auto">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Foody Logo"
                className="w-6 h-6 object-contain brightness-0 invert"
              />
              <span className="text-md font-black tracking-tight">Foody</span>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed max-w-xs">
              Enjoy homemade flavors & chef&apos;s signature dishes, freshly
              prepared every day.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black tracking-wider uppercase text-white/90">
              Explore
            </h4>
            <div className="flex flex-col space-y-1.5 text-[11px] text-white/50 font-medium">
              <span className="cursor-pointer hover:text-white">All Food</span>
              <span className="cursor-pointer hover:text-white">Nearby</span>
              <span className="cursor-pointer hover:text-white">Discount</span>
              <span className="cursor-pointer hover:text-white">
                Best Seller
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black tracking-wider uppercase text-white/90">
              Help
            </h4>
            <div className="flex flex-col space-y-1.5 text-[11px] text-white/50 font-medium">
              <span className="cursor-pointer hover:text-white">
                How to Order
              </span>
              <span className="cursor-pointer hover:text-white">
                Payment Methods
              </span>
              <span className="cursor-pointer hover:text-white">
                Track My Order
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider uppercase text-white/90">
              Follow us Social Media
            </h4>
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-xs hover:bg-white/20 cursor-pointer">
                f
              </div>
              <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-xs hover:bg-white/20 cursor-pointer">
                ig
              </div>
              <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-xs hover:bg-white/20 cursor-pointer">
                in
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
