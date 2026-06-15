"use client";

import { useState } from "react";
import { Star, Search, SlidersHorizontal } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  location: string;
  distance: string;
}

export default function AllRestaurantPage() {
  // === State untuk Filter ===
  const [selectedDistance, setSelectedDistance] = useState<string>("nearby");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // === Dummy Data Restoran (Sesuai dengan Grid di Figma) ===
  const RESTAURANTS: Restaurant[] = Array(8)
    .fill({
      id: "bk-1",
      name: "Burger King",
      logo: "/logo-bk.png", // Pastikan file logo ditaruh di folder public
      rating: 4.9,
      location: "Jakarta Selatan",
      distance: "2.4 km",
    })
    .map((item, index) => ({ ...item, id: `bk-${index + 1}` }));

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col antialiased">
      {/* ================= HEADER / TITLE SECTION ================= */}
      <header className="max-w-7xl mx-auto w-full px-6 md:px-16 pt-10 pb-4">
        <h1 className="text-2xl font-black tracking-tight text-gray-950">
          All Restaurant
        </h1>
      </header>

      {/* ================= MAIN LAYOUT CONTENT ================= */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-16 pb-20 flex flex-col md:flex-row gap-8 items-start">
        {/* 1. SIDEBAR FILTER (Sisi Kiri) */}
        <aside className="w-full md:w-[260px] bg-white border border-gray-100 rounded-2xl p-5 shrink-0 shadow-3xs space-y-6">
          <div>
            <h3 className="text-xs font-black tracking-wider uppercase text-gray-950 mb-4">
              Filter
            </h3>
          </div>

          {/* Filter: Jarak (Distance) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-900">Distance</h4>
            <div className="space-y-2.5">
              {[
                { id: "nearby", label: "Nearby" },
                { id: "1km", label: "Within 1 km" },
                { id: "3km", label: "Within 3 km" },
                { id: "5km", label: "Within 5 km" },
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center space-x-2.5 text-xs font-bold text-gray-600 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedDistance === item.id}
                    onChange={() => setSelectedDistance(item.id)}
                    className="w-4 h-4 rounded-md border-gray-300 text-red-500 focus:ring-red-400 accent-red-500 cursor-pointer"
                  />
                  <span
                    className={
                      selectedDistance === item.id
                        ? "text-gray-950 font-extrabold"
                        : ""
                    }
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Filter: Harga (Price) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-900">Price</h4>
            <div className="space-y-2">
              <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-gray-400 transition-colors">
                <span className="text-xs font-bold text-gray-400 mr-2">Rp</span>
                <input
                  type="number"
                  placeholder="Minimum Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full text-xs font-bold bg-transparent text-gray-900 outline-none placeholder:text-gray-300"
                />
              </div>
              <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-gray-400 transition-colors">
                <span className="text-xs font-bold text-gray-400 mr-2">Rp</span>
                <input
                  type="number"
                  placeholder="Maximum Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full text-xs font-bold bg-transparent text-gray-900 outline-none placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Filter: Rating Bintang */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-900">Rating</h4>
            <div className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-2.5 text-xs font-bold text-gray-600 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() =>
                      setSelectedRating(
                        selectedRating === rating ? null : rating,
                      )
                    }
                    className="w-4 h-4 rounded-md border-gray-300 text-red-500 focus:ring-red-400 accent-red-500 cursor-pointer"
                  />
                  <div className="flex items-center space-x-1">
                    <Star
                      className={`w-3.5 h-3.5 ${selectedRating === rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                    <span
                      className={
                        selectedRating === rating
                          ? "text-gray-950 font-extrabold"
                          : ""
                      }
                    >
                      {rating}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* 2. GRID RESTORAN (Sisi Kanan) */}
        <div className="flex-1 w-full">
          {/* Grid Layout: Otomatis 1 Kolom di HP, 2 Kolom di Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {RESTAURANTS.map((resto, idx) => (
              <div
                key={`${resto.id}-${idx}`}
                className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-3xs hover:border-gray-200 transition-all cursor-pointer group"
              >
                {/* Info Restoran (Sisi Kiri Kartu) */}
                <div className="flex items-center space-x-4">
                  {/* Container Logo Kotak Berujung Tumpul (Sesuai Gambar) */}
                  <div className="w-[72px] h-[72px] bg-[#FFF2E9] rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-orange-50/50">
                    <img
                      src={resto.logo}
                      alt={resto.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Deskripsi Teks */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-gray-950 tracking-tight">
                      {resto.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-[11px] font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-gray-900 font-extrabold">
                        {resto.rating}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-gray-400">
                      {resto.location}{" "}
                      <span className="mx-1 text-gray-200">•</span>{" "}
                      {resto.distance}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
