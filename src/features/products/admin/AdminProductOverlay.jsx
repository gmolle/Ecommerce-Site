import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemFromAdmin } from "../productSlice";

const AdminProductOverlay = ({ handleOverlay, product }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [desc, setDesc] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [image, setImage] = useState(product.image);
  const [category, setCategory] = useState(product.category);
  const [updated, setUpdated] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const handleItemUpdate = () => {
    const emptyField =
      title.length < 1 ||
      price < 0 ||
      !price ||
      desc.length < 1 ||
      quantity < 0 ||
      !quantity ||
      !image;

    if (emptyField) {
      setUpdateError("Please fill in all fields before trying to update");
      setUpdated(false);
      return;
    } else {
      dispatch(
        updateItemFromAdmin({
          serialNum: product.serialNum,
          title: title,
          desc: desc,
          quantity: quantity,
          price: Number(price),
          image: image,
          category: category,
        })
      );
      setUpdated(true);
      setUpdateError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-8 relative overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">
          Edit{" "}
          <em className="font-semibold text-indigo-700">{product.serialNum}</em>
        </h2>
        <button
          onClick={handleOverlay}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close edit overlay"
        >
          <i className="fa-solid fa-x text-2xl"></i>
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleItemUpdate();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-semibold text-gray-700">
              Title
            </label>
            <textarea
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              name="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              Quantity in stock
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              Update Item
            </button>
          </div>
        </form>

        {updated && (
          <p className="mt-4 text-green-600 font-semibold">
            Item Updated successfully!
          </p>
        )}
        {updateError && (
          <p className="mt-4 text-red-600 font-semibold">{updateError}</p>
        )}
      </div>
    </div>
  );
};

export default AdminProductOverlay;
