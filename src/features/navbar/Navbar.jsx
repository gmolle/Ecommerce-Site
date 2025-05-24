import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
  initProducts,
  setProductSearch,
} from "../products/productSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { cartItems, productsSearch } = useSelector((state) => state.products);
  const navigate = useNavigate();

  // Local state for search input
  const [localSearch, setLocalSearch] = useState("");

  // Update localSearch if productsSearch changes (optional sync)
  useEffect(() => {
    setLocalSearch(productsSearch || "");
  }, [productsSearch]);

  const cartItemTotal = () =>
    cartItems.reduce((total, item) => total + item[1], 0);

  useEffect(() => {
    dispatch(fetchCategories());
    const setupData = async () => {
      await dispatch(fetchProducts());
      dispatch(initProducts());
    };
    setupData();
  }, [dispatch]);

  // Called on Enter key press
  const handleSearchSubmit = () => {
    const trimmed = localSearch.trim();

    if (pathname === "/products") {
      dispatch(setProductSearch(trimmed));
      // Update URL search param accordingly
      if (trimmed) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      } else {
        navigate("/products");
      }
    } else {
      // On other pages, navigate to products page with search
      if (trimmed) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      } else {
        navigate("/products");
      }
      dispatch(setProductSearch(trimmed));
    }
  };

  const onInputChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-300 transition-all duration-150">
      <nav className="max-w-7xl h-12 mx-auto px-4 flex items-center justify-between">
        {/* Left side - Home link */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg ${isActive ? "font-bold" : ""} text-gray-800`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-lg ${isActive ? "font-bold" : ""} text-gray-800`
            }
          >
            Products
          </NavLink>
        </div>

        {/* Right side - Search, Cart */}
        <div className="flex items-center gap-6 relative">
          {pathname == "/products" || pathname == "/admin" ? (
            ""
          ) : (
            <input
              type="text"
              value={localSearch}
              placeholder="Search products..."
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
              className="border border-gray-300 rounded-md px-3 py-1.5 w-[150px] md:w-[250px] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white text-gray-900"
            />
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-gray-800 text-xl ${isActive ? "font-bold" : ""}`
            }
          >
            <i className="fa-solid fa-cart-shopping relative">
              {cartItems.length > 0 && (
                <span className="absolute -top-1 left-3 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
                  {cartItemTotal()}
                </span>
              )}
            </i>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
