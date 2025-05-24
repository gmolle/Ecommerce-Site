import { Link } from "react-router-dom";

const OrderSummary = ({ totalItems, totalPrice, checkout }) => {
  const salesTax = totalPrice * 0.05;
  const totalWithTax = totalPrice + salesTax;
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Order Summary
      </h2>

      <div className="mb-4 flex justify-between text-gray-700">
        <p>
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>

      <div className="mb-4 flex justify-between text-gray-700">
        <p>Sales Tax (5%)</p>
        <p>${salesTax.toFixed(2)}</p>
      </div>

      <div className="mb-6 flex justify-between border-t border-gray-300 pt-4 text-lg font-bold text-gray-900">
        <p>Total</p>
        <p>${totalWithTax.toFixed(2)}</p>
      </div>

      {!checkout ? (
        <Link to="/checkout">
          <button
            disabled={totalItems == 0}
            className="cursor-pointer mt-8 w-full rounded-md bg-blue-600 py-3 text-white font-semibold shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Checkout <i className="fa-solid fa-arrow-right-long ml-2"></i>
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderSummary;
