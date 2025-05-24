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

  // 🔍 Product Detail View
  if (details) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg flex flex-col lg:flex-row gap-6">
        <img
          src={image}
          alt={title}
          className="w-full max-w-xs h-[400px] object-contain rounded-md mx-auto"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">Serial #: {serialNum}</p>
          <p className="text-xl font-semibold text-indigo-600">
            ${price?.toFixed(2)}
          </p>
          <p className="text-gray-700">{description}</p>
          <div className="flex items-center gap-4">
            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="border rounded px-3 py-2"
            >
              {quantityDropdown()}
            </select>
            <button
              onClick={addToCart}
              disabled={quantity === 0}
              className={`px-4 py-2 rounded text-white ${
                quantity > 0
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🧱 Grid Card View
  return (
    <div className="bg-white w-full min-h-[420px] rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center">
      <Link to={`/product/${serialNum}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded mb-4"
        />
      </Link>
      <Link to={`/product/${serialNum}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words line-clamp-3">
          {title}
        </h3>
      </Link>
      <p className="text-indigo-600 font-medium mb-4">${price.toFixed(2)}</p>

      <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full mt-auto">
        <select
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm  w-full md:w-1/2"
        >
          {quantityDropdown()}
        </select>
        <button
          onClick={addToCart}
          disabled={quantity === 0}
          className={`w-full text-sm px-3 py-2 rounded text-white whitespace-nowrap ${
            quantity > 0
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
