"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  FileText,
  LogOut,
  ChevronRight,
  X,
  Star,
} from "lucide-react";

interface OrderItem {
  id: string;
  foodName: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  restaurantName: string;
  status: "Preparing" | "On the Way" | "Delivered" | "Done" | "Canceled";
  items: OrderItem[];
}

export default function MyOrdersPage() {
  // === 1. STATE MANAGEMENT ===
  const [activeTab, setActiveTab] = useState<string>("Done");
  const [searchQuery, setSearchQuery] = useState<string>("B"); // Mengisi default 'B' agar memicu filter "Burger King" sesuai contoh
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  // === 2. DUMMY DATA RIWAYAT ORDERS (Sesuai Desain Figma) ===
  const [orders] = useState<Order[]>([
    {
      id: "order-1",
      restaurantName: "Burger King",
      status: "Done",
      items: [
        {
          id: "bk-item-1",
          foodName: "Food Name",
          price: 50000,
          image: "/detail-hero-2.png",
          quantity: 2,
        },
      ],
    },
    {
      id: "order-2",
      restaurantName: "Burger King",
      status: "Done",
      items: [
        {
          id: "bk-item-2",
          foodName: "Food Name",
          price: 50000,
          image: "/detail-hero-2.png",
          quantity: 2,
        },
      ],
    },
    {
      id: "order-3",
      restaurantName: "Burger King",
      status: "Preparing",
      items: [
        {
          id: "bk-item-3",
          foodName: "Food Name",
          price: 50000,
          image: "/detail-hero-2.png",
          quantity: 1,
        },
      ],
    },
  ]);

  const STATUS_TABS = [
    "Preparing",
    "On the Way",
    "Delivered",
    "Done",
    "Canceled",
  ];

  // === 3. LOGIKA UNTUK ACTION MODAL REVIEW ===
  const handleOpenReviewModal = (orderId: string) => {
    setActiveOrderId(orderId);
    setSelectedRating(0);
    setComment("");
    setIsModalOpen(true);
  };

  const handleSendReview = () => {
    if (selectedRating === 0) {
      alert("Please provide a star rating before submitting!");
      return;
    }
    console.log("Review Data Submitted:", {
      orderId: activeOrderId,
      rating: selectedRating,
      comment: comment,
    });
    setIsModalOpen(false);
    alert("Thank you for your valuable feedback!");
  };

  // === 4. LOGIKA FILTER SEARCH DAN TAB STATUS ===
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = order.status === activeTab;
    const matchesSearch =
      order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.foodName.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] text-gray-900 flex flex-col antialiased relative">
      {/* CONTAINER HALAMAN UTAMA */}
      <div className="max-w-6xl mx-auto w-full px-6 md:px-16 pt-10 pb-24">
        {/* JUDUL UTAMA */}
        <h1 className="text-2xl font-black tracking-tight text-gray-950 mb-8">
          My Orders
        </h1>

        {/* LAYOUT GRID: SIDEBAR (KIRI) & KONTEN (KANAN) */}
        <div className="w-full flex flex-col md:flex-row gap-8 items-start">
          {/* ================= SIDEBAR NAVIGASI USER ================= */}
          <aside className="w-full md:w-[240px] bg-white border border-gray-100 rounded-2xl p-5 shrink-0 shadow-3xs space-y-6">
            {/* Profil Singkat */}
            <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <img
                  src="/avatar-john.png"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-black text-gray-950 tracking-tight">
                John Doe
              </span>
            </div>

            {/* Navigasi Link Menu */}
            <nav className="flex flex-col space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Delivery Address</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-black bg-red-50/10 border border-transparent text-[#B12A1C]">
                <FileText className="w-4 h-4 text-[#B12A1C]" />
                <span>My Orders</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-red-50/30 hover:text-red-600 transition-colors pt-4">
                <LogOut className="w-4 h-4 text-gray-400" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* ================= AREA KONTEN UTAMA RIWAYAT PESANAN ================= */}
          <div className="flex-1 w-full space-y-5">
            {/* SEARCH BAR INPUT */}
            <div className="w-full flex items-center border border-gray-200 rounded-2xl px-4 py-3 bg-white focus-within:border-gray-400 transition-colors max-w-xl">
              <Search className="w-4 h-4 text-gray-300 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-bold bg-transparent text-gray-900 outline-none placeholder:text-gray-300"
              />
            </div>

            {/* CAPSULE TAB FILTERS */}
            <div
              className="w-full flex items-center gap-2 overflow-x-auto scrollbar-none py-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <span className="text-xs font-black text-gray-950 mr-2 shrink-0">
                Status
              </span>
              {STATUS_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all shrink-0 ${
                      isActive
                        ? "bg-white border-[#B12A1C] text-[#B12A1C] font-black shadow-3xs"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* ORDER CARDS WRAPPER */}
            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const orderTotal = order.items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0,
                  );

                  return (
                    <div
                      key={order.id}
                      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-4"
                    >
                      {/* Header Toko/Restoran */}
                      <div className="flex items-center space-x-2 w-fit">
                        <span className="text-base">📦</span>
                        <span className="text-xs font-black text-gray-950 tracking-tight">
                          {order.restaurantName}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>

                      {/* List Item Menu Makanan */}
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                                <img
                                  src={item.image}
                                  alt={item.foodName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="space-y-0.5">
                                <h4 className="text-xs font-black text-gray-950 tracking-tight">
                                  {item.foodName}
                                </h4>
                                <p className="text-xs font-black text-gray-950">
                                  {item.quantity} x Rp
                                  {item.price.toLocaleString("id-ID")}.000
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Garis Divider Tipis Halus */}
                      <hr className="border-gray-100" />

                      {/* Bagian Bawah: Total & CTA Action */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-gray-400 block">
                            Total
                          </span>
                          <span className="text-sm font-black text-gray-950">
                            Rp{orderTotal.toLocaleString("id-ID")}.000
                          </span>
                        </div>

                        {/* Tombol HANYA MUNCUL bila statusnya 'Done' */}
                        {order.status === "Done" && (
                          <button
                            onClick={() => handleOpenReviewModal(order.id)}
                            className="px-6 py-2.5 bg-[#B12A1C] text-white text-xs font-black rounded-xl hover:bg-[#942015] active:scale-98 transition-all shadow-3xs"
                          >
                            Give Review
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                /* SCREEN SAAT DATA KOSONG (Sudah Memakai Template Literal Anti Error ESLint) */
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
                  <p className="text-xs font-bold text-gray-400">
                    {`No orders found with status "${activeTab}"`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ================= 5. GIVE REVIEW MODAL COMPONENT ================= */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Transparan Gelap Blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container Card */}
          <div className="relative w-full max-w-[420px] bg-white rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <h2 className="text-sm font-black text-gray-950 tracking-tight">
                Give Review
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Body Form Modal */}
            <div className="p-6 space-y-6">
              {/* Star Interactive Selector */}
              <div className="space-y-3 text-center md:text-left">
                <label className="text-xs font-black text-gray-950 block">
                  Give Rating
                </label>
                <div className="flex items-center justify-center md:justify-start space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setSelectedRating(star)}
                      className="p-1 transition-transform active:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoverRating || selectedRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Feedback */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
                  Please share your thoughts about our service!
                </p>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience here..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-medium text-gray-950 outline-none focus:border-red-200 focus:ring-2 focus:ring-red-50 transition-all placeholder:text-gray-300 resize-none"
                />
              </div>

              {/* Action Submit Button */}
              <button
                onClick={handleSendReview}
                className="w-full py-4 bg-[#B12A1C] hover:bg-[#942015] text-white text-xs font-black rounded-2xl shadow-lg shadow-red-900/10 active:scale-[0.98] transition-all tracking-wide"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
