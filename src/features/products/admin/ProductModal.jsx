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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 md:px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">
          <h2 id="modal-title" className="text-xl font-bold text-slate-900">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6 md:px-8 py-6"
        >
          <div className="flex flex-col">
            <label htmlFor="serial" className="mb-1.5 text-sm font-medium text-slate-700">
              Serial Number
            </label>
            <input
              type="text"
              id="serial"
              name="serial"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-500"
              required
              disabled={isEditMode}
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="title" className="mb-1.5 text-sm font-medium text-slate-700">
              Title
            </label>
            <textarea
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              rows={2}
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="mb-1.5 text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              rows={3}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="mb-1.5 text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1.5 text-sm font-medium text-slate-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-1.5 text-sm font-medium text-slate-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              min="0"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="image" className="mb-1.5 text-sm font-medium text-slate-700">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-center items-center p-4 border border-slate-200 rounded-xl bg-slate-50 min-h-[120px]">
            {image ? (
              <img
                src={image}
                alt={title || "Preview"}
                className="max-h-32 object-contain"
                onError={(e) => (e.target.src = "")}
              />
            ) : (
              <span className="text-slate-400 text-sm">Enter a URL to preview</span>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors cursor-pointer"
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
