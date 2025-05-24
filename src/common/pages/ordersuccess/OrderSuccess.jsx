import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { totalItems, totalPrice, orderId } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-8">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order Confirmed!
        </h1>
        <p className="mb-2 text-gray-700">Thank you for your purchase.</p>
        <p className="mb-4 text-gray-600">
          Order #{orderId || "N/A"} <br />
          {totalItems} item{totalItems !== 1 ? "s" : ""} - $
          {totalPrice?.toFixed(2)}
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
