import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg p-4 gap-4 md:gap-6">
      {/* Product Image */}
      <div className="w-[180px] h-[180px] bg-white rounded shadow p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-[180px] h-[180px] object-contain rounded"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-900">
            {product.title}
          </h2>
          <button
            onClick={removeItem}
            aria-label="Remove item"
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="max-w-100">
          <p className="line-clamp-4">{product.description}</p>
        </div>

        <div className="mt-3 flex items-center justify-between md:justify-start gap-6">
          <p className="text-lg font-medium text-indigo-700">
            ${(product.price * quantity).toFixed(2)}
          </p>

          <select
            value={amount}
            onChange={quantityChange}
            className="border border-gray-300 rounded px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Change quantity"
          >
            {quantityDropdown()}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
