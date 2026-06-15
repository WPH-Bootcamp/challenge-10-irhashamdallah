"use client";

import { useState } from "react";
import { Minus, Plus, ChevronRight } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface GroupedCart {
  restaurantName: string;
  items: CartItem[];
}

export default function MyCartPage() {
  // === Dummy Data Terkelompok Berdasarkan Restoran (Sesuai Gambar Figma) ===
  const [cartGroups, setCartGroups] = useState<GroupedCart[]>([
    {
      restaurantName: "Burger King",
      items: [
        {
          id: "bk-item-1",
          name: "Food Name",
          price: 50000,
          image: "/detail-hero-2.png",
          quantity: 1,
        },
        {
          id: "bk-item-2",
          name: "Food Name",
          price: 50000,
          image: "/detail-hero-2.png",
          quantity: 1,
        },
      ],
    },
    {
      restaurantName: "Burger King", // Kelompok resto kedua bawahnya
      items: [
        {
          id: "bk-item-3",
          name: "Food Name",
          price: 50000,
          image: "/detail-hero-2.png",
          quantity: 1,
        },
        {
          id: "bk-item-4",
          name: "Food Name",
          price: 50000,
          image: "/detail-hero-2.png",
          quantity: 1,
        },
      ],
    },
  ]);

  // === Fungsi Mengubah Quantity (Tambah / Kurang) ===
  const updateQuantity = (
    groupIndex: number,
    itemIndex: number,
    change: number,
  ) => {
    const updatedGroups = [...cartGroups];
    const currentItem = updatedGroups[groupIndex].items[itemIndex];
    const newQuantity = currentItem.quantity + change;

    if (newQuantity > 0) {
      currentItem.quantity = newQuantity;
      setCartGroups(updatedGroups);
    }
  };

  // === Fungsi Hitung Total Harga per Restoran ===
  const calculateGroupTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col antialiased">
      {/* ================= HEADER / TITLE SECTION ================= */}
      <header className="max-w-3xl mx-auto w-full px-4 md:px-0 pt-10 pb-2">
        <h1 className="text-2xl font-black tracking-tight text-gray-950">
          My Cart
        </h1>
      </header>

      {/* ================= CART GROUPS LIST ================= */}
      <main className="max-w-3xl mx-auto w-full px-4 md:px-0 pb-24 space-y-5">
        {cartGroups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-5"
          >
            {/* Header Restoran (Ikon Box + Nama Resto + Chevron) */}
            <div className="flex items-center space-x-2 cursor-pointer w-fit group">
              <span className="text-base">📦</span>
              <span className="text-xs font-black text-gray-950 tracking-tight">
                {group.restaurantName}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Daftar Item Menu di Resto Ini */}
            <div className="space-y-4">
              {group.items.map((item, itemIdx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  {/* Info Makanan (Foto + Teks Deskripsi) */}
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-gray-950 tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs font-black text-gray-950">
                        Rp{item.price.toLocaleString("id-ID")}.000
                      </p>
                    </div>
                  </div>

                  {/* Tombol Aksi Quantity (+ / -) */}
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => updateQuantity(groupIdx, itemIdx, -1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-gray-950 w-3 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(groupIdx, itemIdx, 1)}
                      className="w-7 h-7 rounded-full bg-[#B12A1C] flex items-center justify-center text-white hover:bg-[#942015] active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Garis Pembatas Tipis Sesuai Gambar Figma */}
            <hr className="border-gray-100 border-dashed" />

            {/* Bagian Bawah: Total & Tombol Checkout */}
            <div className="flex items-end justify-between pt-1">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-gray-400 block">
                  Total
                </span>
                <span className="text-sm font-black text-gray-950">
                  Rp{calculateGroupTotal(group.items).toLocaleString("id-ID")}
                  .000
                </span>
              </div>

              <button className="px-7 py-2.5 bg-[#B12A1C] text-white text-xs font-black rounded-xl hover:bg-[#942015] active:scale-98 transition-all shadow-3xs">
                Checkout
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
