import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity, removeSpecificItem } from "../products/productSlice";

const CartProduct = ({ product, quantity, notify }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(quantity);

  const removeItem = () => {
    dispatch(removeSpecificItem([product.serialNum, quantity]));
    notify();
  };

  const quantityDropdown = () => {
    if (product.quantity > 0) {
      return Array.from({ length: product.quantity }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ));
    } else {
      return <option value={0}>Out Of Stock</option>;
    }
  };

  const quantityChange = (e) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    dispatch(
      changeQuantity({
        serialNum: product.serialNum,
        oldValue: quantity,
        newValue: newAmount,
      })
    );
  };

  return (
    <article className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-soft hover:shadow-soft-lg hover:border-slate-300/80 transition-all duration-300">
      <Link
        to={`/product/${product.serialNum}`}
        className="w-full sm:w-40 h-40 sm:h-40 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            {product.category && (
              <p className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-0.5">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </p>
            )}
            <Link
              to={`/product/${product.serialNum}`}
              className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-2 hover:text-teal-600 transition-colors cursor-pointer"
            >
              {product.title}
            </Link>
          </div>
          <button
            onClick={removeItem}
            aria-label="Remove item"
            className="text-slate-400 hover:text-red-600 transition-colors shrink-0 p-2 -m-2 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="line-clamp-2 text-slate-500 text-sm mt-2 leading-relaxed">{product.description}</p>

        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="text-xl font-bold text-slate-900 tabular-nums">
            ${(product.price * quantity).toFixed(2)}
          </p>
          <span className="text-slate-400 text-sm">
            ${product.price.toFixed(2)} × {quantity}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor={`qty-${product.serialNum}`} className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Qty
            </label>
            <select
              id={`qty-${product.serialNum}`}
              value={amount}
              onChange={quantityChange}
              className="border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 bg-white cursor-pointer"
              aria-label="Change quantity"
            >
              {quantityDropdown()}
            </select>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartProduct;
