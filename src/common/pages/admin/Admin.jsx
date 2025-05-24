import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../features/products/productsSelector";
import { deleteItem } from "../../../features/products/productSlice";
import ProductModal from "../../../features/products/admin/ProductModal";

const Admin = () => {
  const products = useSelector(getProducts);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "password") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleAddClick = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleRemoveClick = (serialNum) => {
    dispatch(deleteItem(serialNum));
  };

  // Filter products by search term (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLoginSubmit}
          className="bg-white p-8 shadow-md rounded w-96"
        >
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginForm.username}
            onChange={handleLoginChange}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100 ">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        <div className="flex flex-col justify-between md:flex-row">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 p-2 w-full max-w-md border border-gray-300 rounded"
          />

          <button
            className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={handleAddClick}
          >
            Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.serialNum}
              className="p-4 border rounded shadow bg-white flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
              />
              <h2 className="font-bold">{product.title}</h2>
              <p>${product.price}</p>
              <p>Serial: {product.serialNum}</p>
              <div className="mt-auto flex justify-between space-x-2">
                <button
                  onClick={() => handleEditClick(product)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveClick(product.serialNum)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <ProductModal
            product={editProduct}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
