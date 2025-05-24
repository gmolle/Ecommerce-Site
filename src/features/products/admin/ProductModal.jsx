import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateItemFromAdmin, addNewItem } from "../productSlice";

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const isEditMode = Boolean(product);

  const [serial, setSerial] = useState(product?.serialNum || "");
  const [title, setTitle] = useState(product?.title || "");
  const [desc, setDesc] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [price, setPrice] = useState(product?.price || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [image, setImage] = useState(product?.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !serial ||
      !title ||
      !desc ||
      !category ||
      !price ||
      !quantity ||
      !image
    ) {
      alert("All fields are required.");
      return;
    }

    const updatedProduct = {
      serialNum: serial,
      title,
      desc,
      category,
      price: Number(price),
      quantity: Number(quantity),
      image,
    };

    if (isEditMode) {
      dispatch(updateItemFromAdmin(updatedProduct));
    } else {
      dispatch(addNewItem(updatedProduct));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-8 relative overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <i className="fa-solid fa-x text-2xl"></i>
        </button>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="serial"
              className="mb-1 font-semibold text-gray-700"
            >
              Serial Number
            </label>
            <input
              type="text"
              id="serial"
              name="serial"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              required
              disabled={isEditMode}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-semibold text-gray-700">
              Title
            </label>
            <textarea
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 resize-none"
              rows={3}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-1 font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border border-gray-300 rounded-md p-2 resize-none"
              rows={3}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="mb-1 font-semibold text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="quantity"
              className="mb-1 font-semibold text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              min="0"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex justify-center items-center p-2 border border-gray-300 rounded-md">
            <img
              src={image}
              alt={title}
              className="max-h-40 object-contain"
              onError={(e) => (e.target.src = "")}
            />
          </div>

          <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              {isEditMode ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
