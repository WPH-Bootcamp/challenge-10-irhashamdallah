"use client";

import { useState } from "react";

import {
  MapPin,
  FileText,
  LogOut,
  ShoppingBag,
} from "lucide-react";

export default function ProfilePage() {
  // === 1. STATE UNTUK FORM PROFILE (Fungsional & Bisa Diedit) ===
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "081234567890",
    avatar: "/avatar-john.png", // Gantilah dengan path gambar aslimu nanti
  });

  // === 2. LOGIKA UPDATE PROFILE ===
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] text-gray-900 flex flex-col antialiased">
      {/* ================= HEADER NAVBAR (Sama di setiap page) ================= */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 text-[#B12A1C] font-black text-xl">☀️</div>
            <span className="text-lg font-black tracking-tight text-gray-950">
              Foody
            </span>
          </div>
          {/* Sisi Kanan: Cart & User */}
          <div className="flex items-center space-x-4">
            <div className="relative p-2 bg-gray-50 rounded-full cursor-pointer">
              <ShoppingBag className="w-4 h-4 text-gray-950" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#B12A1C] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                1
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-gray-500 hidden md:inline">
                {profile.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTAINER CONTENT UTAMA ================= */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-10 pt-8 pb-16 flex-1">
        {/* JUDUL HALAMAN */}
        <h1 className="text-xl font-black tracking-tight text-gray-950 mb-6 px-1 md:px-0">
          Profile
        </h1>

        {/* LAYOUT GRID RESPONSIVE: SIDEBAR & UTAMA */}
        <div className="w-full flex flex-col md:flex-row gap-6 items-start">
          {/* 1. SIDEBAR NAVIGASI (Hanya Muncul di Desktop md:flex, Tersembunyi di Mobile) */}
          <aside className="hidden md:flex w-[220px] bg-white border border-gray-100 rounded-2xl p-4 shrink-0 shadow-3xs flex-col space-y-4">
            {/* Profil Singkat */}
            <div className="flex items-center space-x-3 pb-2 border-b border-gray-50">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-black text-gray-950 tracking-tight">
                {profile.name}
              </span>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Delivery Address</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span>My Orders</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:bg-red-50/30 hover:text-red-600 transition-colors pt-3">
                <LogOut className="w-3.5 h-3.5 text-gray-400" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* 2. KARTU INFORMASI UTAMA PROFILE (Sangat Presisi & Editable) */}
          <main className="flex-1 w-full">
            <form
              onSubmit={handleUpdateProfile}
              className="w-full max-w-xl md:max-w-xl bg-white border border-gray-100 rounded-[24px] p-6 md:p-8 shadow-3xs space-y-6"
            >
              {/* Foto Avatar Besar & Centered di Mobile */}
              <div className="flex flex-col items-center md:items-start pb-2">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border border-gray-100 shadow-inner">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Grid Input Data Form */}
              <div className="space-y-4">
                {/* Field 1: Name */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 border-b border-gray-50 pb-3">
                  <label className="text-xs font-bold text-gray-400 md:w-1/3">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="text-xs font-black text-gray-950 bg-transparent outline-none md:w-2/3 md:text-right p-1 focus:bg-gray-50/50 rounded"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 border-b border-gray-50 pb-3">
                  <label className="text-xs font-bold text-gray-400 md:w-1/3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="text-xs font-black text-gray-950 bg-transparent outline-none md:w-2/3 md:text-right p-1 focus:bg-gray-50/50 rounded"
                  />
                </div>

                {/* Field 3: Nomor Handphone */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 border-b border-gray-50 pb-3">
                  <label className="text-xs font-bold text-gray-400 md:w-1/3">
                    Nomor Handphone
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="text-xs font-black text-gray-950 bg-transparent outline-none md:w-2/3 md:text-right p-1 focus:bg-gray-50/50 rounded"
                  />
                </div>
              </div>

              {/* TOMBOL CTA: UPDATE PROFILE */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#B12A1C] hover:bg-[#942015] text-white text-xs font-black rounded-xl shadow-xs transition-all tracking-wide active:scale-[0.99]"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ===================== FOOTER UTAMA ===================== */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#0E131F] text-white py-12 px-6 md:px-16 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Kolom Kiri: Brand & Deskripsi */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black tracking-tight">Foody</span>
            </div>
            <p className="text-[11px] font-medium text-gray-400 leading-relaxed max-w-xs">
              {`Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. Order online or visit our nearest branch.`}
            </p>
            {/* Social Media Links */}
            {/* Jajaran Social Media yang Baru & Dijamin Anti Eror */}
            <div className="flex items-center space-x-2">
              {/* Facebook */}
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Instagram"
              >
                {/* GANTI BLOK SVG INSTAGRAM KAMU DENGAN INI */}
                <svg
                  className="w-3.5 h-3.5 stroke-current fill-none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Kolom Tengah: Explore Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-[11px] font-bold text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  All Food
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nearby
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Discount
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Best Seller
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Lunch
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom Kanan: Help Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white tracking-wider">
              Help
            </h4>
            <ul className="space-y-2 text-[11px] font-bold text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  How to Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track My Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
