"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react"; 

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); 

    try {
      const response = await fetch(
        "https://be-restaurant-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Email atau password yang kamu masukkan salah.",
        );
      }

      const token = result.token || result.data?.token;
      const userName =
        result.user?.name || result.data?.user?.name || "User Foody";

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_name", userName);

        router.push("/");
        router.refresh();
      } else {
        throw new Error("Format token tidak dikenali oleh sistem.");
      }
    }  catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Gagal terhubung ke server.";
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

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-16 lg:px-24 bg-white text-gray-900">
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Logo & Brand Header */}
          <div className="space-y-2">
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
              Sign in to your account to start ordering
            </p>
          </div>

          <div className="w-full grid grid-cols-2 bg-gray-100 p-1 rounded-full">
            <button className="py-2 text-xs font-bold bg-white text-gray-900 rounded-full shadow-2xs">
              Sign In
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="py-2 text-xs font-medium text-gray-400 rounded-full hover:text-gray-600 transition-colors"
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-text-sm font-semibold text-gray-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="Example: user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 border-gray-200 bg-white rounded-xl placeholder:text-gray-300 text-gray-900 text-sm focus-visible:ring-primary-main"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Insert password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-4 pr-12 border-gray-200 bg-white rounded-xl placeholder:text-gray-300 text-gray-900 text-sm focus-visible:ring-primary-main"
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={isLoading}
                  className="rounded border-gray-300 text-primary-main focus:ring-primary-main w-3.5 h-3.5"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-xs font-bold text-primary-main hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary-main hover:bg-primary-main/90 text-white font-bold rounded-xl text-text-sm transition-all mt-4 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
