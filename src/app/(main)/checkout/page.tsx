"use client";

import { useState } from "react";
import { ChevronRight, MapPin, CreditCard, ChevronDown } from "lucide-react";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>("bni");

  const [checkoutItems] = useState<CheckoutItem[]>([
    {
      id: "item-1",
      name: "Food Name",
      price: 50000,
      image: "/detail-hero-2.png",
      quantity: 1,
    },
    {
      id: "item-2",
      name: "Food Name",
      price: 50000,
      image: "/detail-hero-2.png",
      quantity: 1,
    },
  ]);

  const itemsTotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 10000;
  const serviceFee = 1000;
  const grandTotal = itemsTotal + deliveryFee + serviceFee;

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] text-gray-900 flex flex-col antialiased">
      <header className="max-w-5xl mx-auto w-full px-4 md:px-0 pt-10 pb-2">
        <h1 className="text-2xl font-black tracking-tight text-gray-950">
          Checkout
        </h1>
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 md:px-0 pb-24 flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:flex-1 space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-3.5">
            <div className="flex items-center space-x-2 text-xs font-black text-gray-950 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#B12A1C]" />
              <span>Delivery Address</span>
            </div>

            <div className="flex items-start justify-between bg-gray-50/50 border border-gray-100 rounded-xl p-4">
              <div className="space-y-1">
                <p className="text-xs font-black text-gray-950">Home Address</p>
                <p className="text-xs font-medium text-gray-500 leading-relaxed">
                  Jl. Jendral Sudirman No. 45, Karet Semanggi, Setiabudi,
                  Jakarta Selatan, 12930
                </p>
              </div>
              <button className="text-[11px] font-black text-[#B12A1C] border border-gray-200 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shrink-0 ml-4 shadow-3xs">
                Change
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-4">
            {/* Nama Resto */}
            <div className="flex items-center space-x-2 w-fit">
              <span className="text-base">📦</span>
              <span className="text-xs font-black text-gray-950 tracking-tight">
                Burger King
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {checkoutItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
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
                  <span className="text-xs font-black text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    {item.quantity}x
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-4">
            <div className="flex items-center space-x-2 text-xs font-black text-gray-950 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-[#B12A1C]" />
              <span>Payment Method</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  id: "bni",
                  name: "Bank Negara Indonesia",
                  label: "BNI Virtual Account",
                },
                {
                  id: "bri",
                  name: "Bank Rakyat Indonesia",
                  label: "BRI Virtual Account",
                },
                {
                  id: "bca",
                  name: "Bank Central Asia",
                  label: "BCA Virtual Account",
                },
                {
                  id: "mandiri",
                  name: "Bank Mandiri",
                  label: "Mandiri Virtual Account",
                },
              ].map((bank) => (
                <label
                  key={bank.id}
                  onClick={() => setPaymentMethod(bank.id)}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer select-none transition-all ${
                    paymentMethod === bank.id
                      ? "border-[#B12A1C] bg-red-50/10 shadow-3xs"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-gray-950">
                      {bank.name}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400">
                      {bank.label}
                    </p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      paymentMethod === bank.id
                        ? "border-[#B12A1C]"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === bank.id && (
                      <div className="w-2 h-2 rounded-full bg-[#B12A1C]" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[320px] bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-4 shrink-0 lg:sticky lg:top-24">
          <h3 className="text-xs font-black text-gray-950 uppercase tracking-wider">
            Payment Summary
          </h3>

          <div className="space-y-3 pt-1">
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>
                Price ({checkoutItems.reduce((acc, i) => acc + i.quantity, 0)}{" "}
                Items)
              </span>
              <span className="text-gray-950 font-black">
                Rp{itemsTotal.toLocaleString("id-ID")}.000
              </span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>Delivery Fee</span>
              <span className="text-gray-950 font-black">
                Rp{deliveryFee.toLocaleString("id-ID")}.000
              </span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>Service Fee</span>
              <span className="text-gray-950 font-black">
                Rp{serviceFee.toLocaleString("id-ID")}.000
              </span>
            </div>

            <hr className="border-gray-100 border-dashed my-2" />

            <div className="flex justify-between items-center pt-1">
              <span className="text-xs font-black text-gray-950">
                Total Payment
              </span>
              <span className="text-base font-black text-[#B12A1C]">
                Rp{grandTotal.toLocaleString("id-ID")}.000
              </span>
            </div>
          </div>

          <button className="w-full py-3 bg-[#B12A1C] text-white text-xs font-black rounded-xl hover:bg-[#942015] active:scale-98 transition-all shadow-3xs tracking-wide">
            Buy Now
          </button>
        </div>
      </main>
    </div>
  );
}
