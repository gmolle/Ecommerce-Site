import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart, removeStock } from "./productSlice";

const Product = ({ product, details, notify }) => {
  const { title, price, image, quantity, serialNum, description } = product;
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (quantity > 0) {
      const purchase = [product, amount];
      const removeAmount = [serialNum, amount];
      dispatch(addItemToCart(purchase));
      dispatch(removeStock(removeAmount));
      notify();
    }
  };

  const quantityDropdown = () => {
    return quantity > 0
      ? Array.from({ length: quantity }, (_, i) => (
          <option key={i + 1}>{i + 1}</option>
        ))
      : [<option key="0">Out Of Stock</option>];
  };

  // 🔍 Product Detail View - Modern layout
  if (details) {
    const categoryName = product.category
      ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
      : "";

    return (
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Image - constrained size */}
        <div className="flex-1 min-w-0">
          <div className="aspect-square lg:aspect-[4/5] max-w-lg lg:max-w-xl bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft flex items-center justify-center p-6 md:p-10">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content - sticky on desktop */}
        <div className="lg:w-[420px] lg:flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Category badge */}
            {categoryName && (
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="inline-block text-sm font-medium text-teal-600 hover:text-teal-700 cursor-pointer"
              >
                {categoryName}
              </Link>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
              {title}
            </h1>

            <p className="text-3xl font-bold text-slate-900">
              ${price?.toFixed(2)}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              {quantity > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-sm text-teal-700">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  In stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Out of stock
                </span>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed text-[15px]">
              {description}
            </p>

            {/* Add to cart */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3">
                  <label htmlFor="qty-detail" className="text-sm font-medium text-slate-700">
                    Quantity
                  </label>
                  <select
                    id="qty-detail"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 w-24 cursor-pointer"
                  >
                    {quantityDropdown()}
                  </select>
                </div>
                <button
                  onClick={addToCart}
                  disabled={quantity === 0}
                  className={`flex-1 px-8 py-4 rounded-xl font-semibold text-white transition-all cursor-pointer ${
                    quantity > 0
                      ? "bg-slate-900 hover:bg-slate-800 active:scale-[0.98]"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  Add to cart
                </button>
              </div>
            </div>

            {/* Trust hints */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Free shipping on $50+
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Easy returns
              </span>
            </div>

            <p className="text-xs text-slate-400">SKU: {serialNum}</p>
          </div>
        </div>
      </div>
    );
  }

  // 🧱 Grid Card View - Modern ecommerce style
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image - square aspect, image-first */}
      <Link to={`/product/${serialNum}`} className="block relative aspect-square bg-slate-50 overflow-hidden cursor-pointer shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content - flex to push actions to bottom */}
      <div className="p-4 md:p-5 flex flex-col flex-1 min-h-0">
        <Link to={`/product/${serialNum}`} className="cursor-pointer">
          <h3 className="font-medium text-slate-900 line-clamp-2 mb-2 hover:text-teal-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-lg font-bold text-slate-900 mb-4">${price.toFixed(2)}</p>

        <div className="flex gap-2 mt-auto">
          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 text-slate-700"
          >
            {quantityDropdown()}
          </select>
          <button
            onClick={addToCart}
            disabled={quantity === 0}
            className={`flex-1 text-sm px-4 py-2.5 rounded-lg font-semibold text-white transition-all cursor-pointer ${
              quantity > 0
                ? "bg-slate-900 hover:bg-slate-800 active:scale-[0.98]"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
