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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <nav className="site-container h-16 flex items-center justify-between gap-4">
        {/* Left - Brand + Nav */}
        <div className="flex items-center gap-10">
          <NavLink to="/" className="font-bold text-xl text-slate-900 hover:text-slate-700 transition-colors cursor-pointer">
            Store
          </NavLink>
          <div className="flex items-center gap-4 sm:gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? "text-teal-600" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? "text-teal-600" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              Products
            </NavLink>
          </div>
        </div>

        {/* Right side - Search, Cart */}
        <div className="flex items-center gap-4 md:gap-6">
          {pathname !== "/products" && pathname !== "/admin" && (
            <input
              type="text"
              value={localSearch}
              placeholder="Search products..."
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
              className="hidden sm:block border border-slate-200 rounded-lg px-4 py-2 w-[140px] md:w-[220px] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all bg-slate-50 text-slate-900 placeholder:text-slate-400"
            />
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative p-1.5 -m-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer ${isActive ? "text-teal-600" : ""}`
            }
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-teal-600 text-white text-xs font-medium min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {cartItemTotal()}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
