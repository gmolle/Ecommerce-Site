import { Link } from "react-router-dom";

const OrderSummary = ({ totalItems, totalPrice, checkout }) => {
  const salesTax = totalPrice * 0.05;
  const totalWithTax = totalPrice + salesTax;
  const freeShippingThreshold = 50;
  const amountToFreeShipping = totalPrice < freeShippingThreshold
    ? (freeShippingThreshold - totalPrice).toFixed(2)
    : null;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft-lg">
      <h2 className="text-lg font-semibold text-slate-900 mb-5">
        Order Summary
      </h2>

      <div className="space-y-3 text-slate-600 text-sm">
        <div className="flex justify-between">
          <span>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
          <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Sales tax (5%)</span>
          <span className="tabular-nums">${salesTax.toFixed(2)}</span>
        </div>
      </div>

      {amountToFreeShipping !== null && totalItems > 0 && (
        <div className="mt-4 p-3 rounded-xl bg-teal-50 border border-teal-100">
          <p className="text-sm text-teal-800 font-medium">
            Add ${amountToFreeShipping} for free shipping
          </p>
        </div>
      )}

      <div className="flex justify-between border-t border-slate-200 pt-4 mt-4 text-lg font-bold text-slate-900">
        <span>Total</span>
        <span className="tabular-nums">${totalWithTax.toFixed(2)}</span>
      </div>

      {!checkout && (
        <>
          <Link to="/checkout" className="cursor-pointer block mt-5">
            <button
              disabled={totalItems === 0}
              className="w-full rounded-xl bg-slate-900 py-3.5 text-white font-semibold transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-200 flex items-center justify-center gap-2 cursor-pointer shadow-soft"
            >
              Proceed to checkout
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure checkout
          </p>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
