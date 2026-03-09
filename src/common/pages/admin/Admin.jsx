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
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-slate-50 p-4">
        <form
          onSubmit={handleLoginSubmit}
          className="bg-white p-8 shadow-soft rounded-2xl w-full max-w-md ring-1 ring-slate-100"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Admin Login</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginForm.username}
            onChange={handleLoginChange}
            className="w-full mb-4 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            className="w-full mb-6 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-180px)] p-6 md:p-10 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Panel</h1>
        <p className="text-slate-500 mb-8">Manage your products</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-md p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
          />
          <button
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors cursor-pointer"
            onClick={handleAddClick}
          >
            Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.serialNum}
              className="p-5 border border-slate-200 rounded-2xl shadow-soft bg-white flex flex-col"
            >
              <div className="h-40 bg-slate-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain"
                />
              </div>
              <h2 className="font-semibold text-slate-900 line-clamp-2">{product.title}</h2>
              <p className="text-teal-600 font-bold mt-1">${product.price}</p>
              <p className="text-slate-500 text-sm">Serial: {product.serialNum}</p>
              <div className="mt-auto flex gap-2 pt-4">
                <button
                  onClick={() => handleEditClick(product)}
                  className="flex-1 px-3 py-2 text-sm bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveClick(product.serialNum)}
                  className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors cursor-pointer"
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
