"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Menambahkan Loader2 untuk efek loading

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset pesan error setiap kali tombol ditekan

    try {
      const response = await fetch(
        "https://be-restaurant-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone, // Mengirim data nomor telepon sesuai input form kamu
            password: password,
          }),
        },
      );

      const result = await response.json();

      // 2. Cek jika registrasi ditolak oleh backend (misal email sudah terdaftar)
      if (!response.ok) {
        throw new Error(
          result.message ||
            "Pendaftaran gagal. Silakan periksa kembali data Anda.",
        );
      }

      router.push("/login");
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Gagal terhubung ke server.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex">
      <div className="hidden md:block md:w-1/2 relative h-screen bg-[#1A1C1C]">
        <img
          src="/login-hero.png"
          alt="Foody Burger"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center py-8 px-6 sm:px-16 lg:px-24 bg-white text-gray-900 overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-5">
          {/* Logo & Brand Header */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png" 
                alt="Foody Logo"
                className="w-6 h-6 object-contain"
              />
              <span className="text-text-md font-extrabold text-gray-900 tracking-tight">
                Foody
              </span>
            </div>
            <h2 className="text-display-xs font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-text-xs text-gray-400">
              Create an account to get started
            </p>
          </div>

          <div className="w-full grid grid-cols-2 bg-gray-100 p-1 rounded-full">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="py-2 text-xs font-medium text-gray-400 rounded-full hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              Sign In
            </button>
            <button className="py-2 text-xs font-bold bg-white text-gray-900 rounded-full shadow-2xs">
              Sign Up
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Name</label>
              <Input
                type="text"
                placeholder="Insert full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-4 border-gray-200 bg-white rounded-xl placeholder:text-gray-300 text-gray-900 text-xs focus-visible:ring-primary-main"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Example: user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-4 border-gray-200 bg-white rounded-xl placeholder:text-gray-300 text-gray-900 text-xs focus-visible:ring-primary-main"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                Number Phone
              </label>
              <Input
                type="tel"
                placeholder="Insert number phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-4 border-gray-200 bg-white rounded-xl placeholder:text-gray-300 text-gray-900 text-xs focus-visible:ring-primary-main"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Insert password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 border-gray-200 bg-white rounded-xl placeholder:text-gray-300 text-gray-900 text-xs focus-visible:ring-primary-main"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary-main hover:bg-primary-main/90 text-white font-bold rounded-xl text-xs transition-all mt-3 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
