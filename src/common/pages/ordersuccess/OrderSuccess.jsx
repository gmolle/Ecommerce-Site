import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { totalItems, totalPrice, orderId } = location.state || {};

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center bg-slate-50 p-8">
      <div className="bg-white p-10 rounded-2xl shadow-soft-lg text-center max-w-md w-full ring-1 ring-slate-100">
        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          Order confirmed!
        </h1>
        <p className="text-slate-600 mb-4">Thank you for your purchase.</p>
        <p className="mb-8 text-slate-500 text-sm">
          Order #{orderId || "N/A"} · {totalItems} item{totalItems !== 1 ? "s" : ""} · $
          {totalPrice?.toFixed(2)}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Back to Home
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
