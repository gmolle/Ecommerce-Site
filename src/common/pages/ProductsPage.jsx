import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";

import Loader from "../loader/Loader";
import Product from "../../features/products/Product";
import PriceRangeSlider from "../../features/products/PriceRangeSlider";
import {
  fetchProducts,
  setCategoryFilter,
  setSortOrder,
} from "../../features/products/productSlice";

const DEFAULT_PRICE_RANGE = [0, 1000];
const DEFAULT_ITEMS_TO_SHOW = 10;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    loading,
    errorMsg,
    categoryFilter,
    sortOrder,
    categories,
    products: allProducts,
  } = useSelector((state) => state.products);

  const [priceFilter, setPriceFilter] = useState(DEFAULT_PRICE_RANGE);
  const [itemsToShow, setItemsToShow] = useState(DEFAULT_ITEMS_TO_SHOW);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const notifyAdded = () => toast.success("Added to cart", { theme: "dark" });

  // Sync state from URL params on mount or URL changes
  useEffect(() => {
    const categoryFromURL = searchParams.get("category") || "all";
    const sortFromURL = searchParams.get("sort") || "default";
    const priceFromURL = searchParams.get("price");
    const itemsFromURL = searchParams.get("items");
    const searchFromURL = searchParams.get("search") || "";

    dispatch(setCategoryFilter(categoryFromURL));
    dispatch(setSortOrder(sortFromURL));

    if (priceFromURL) {
      const [min, max] = priceFromURL.split(",").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceFilter([min, max]);
      } else {
        setPriceFilter(DEFAULT_PRICE_RANGE);
      }
    } else {
      setPriceFilter(DEFAULT_PRICE_RANGE);
    }

    if (itemsFromURL) {
      const num = parseInt(itemsFromURL, 10);
      if (!isNaN(num) && num > 0) {
        setItemsToShow(num);
      } else {
        setItemsToShow(DEFAULT_ITEMS_TO_SHOW);
      }
    } else {
      setItemsToShow(DEFAULT_ITEMS_TO_SHOW);
    }

    setSearchTerm(searchFromURL);

    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [searchParams, dispatch, allProducts.length]);

  // Prevent background scroll when filter sidebar is open
  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterOpen]);

  // Helper to update URL search params
  const updateSearchParams = (updates) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      for (const key in updates) {
        const val = updates[key];
        if (
          val === null ||
          val === undefined ||
          val === "" ||
          (Array.isArray(val) && val.length === 0)
        ) {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      }
      return params;
    });
  };

  // Handlers updating state and URL params:

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategoryFilter(newCategory));
    // Reset items and keep other filters
    updateSearchParams({
      category: newCategory !== "all" ? newCategory : null,
      items: DEFAULT_ITEMS_TO_SHOW,
      // Keep current sort, price, search from state
      sort: sortOrder !== "default" ? sortOrder : null,
      price:
        priceFilter[0] !== DEFAULT_PRICE_RANGE[0] ||
        priceFilter[1] !== DEFAULT_PRICE_RANGE[1]
          ? `${priceFilter[0]},${priceFilter[1]}`
          : null,
      search: searchTerm || null,
    });
    setItemsToShow(DEFAULT_ITEMS_TO_SHOW);
  };

  const handleSortChange = (newSort) => {
    dispatch(setSortOrder(newSort));
    updateSearchParams({
      sort: newSort !== "default" ? newSort : null,
      items: DEFAULT_ITEMS_TO_SHOW,
      category: categoryFilter !== "all" ? categoryFilter : null,
      price:
        priceFilter[0] !== DEFAULT_PRICE_RANGE[0] ||
        priceFilter[1] !== DEFAULT_PRICE_RANGE[1]
          ? `${priceFilter[0]},${priceFilter[1]}`
          : null,
      search: searchTerm || null,
    });
    setItemsToShow(DEFAULT_ITEMS_TO_SHOW);
  };

  const handlePriceChange = (newRange) => {
    setPriceFilter(newRange);
    updateSearchParams({
      price:
        newRange[0] !== DEFAULT_PRICE_RANGE[0] ||
        newRange[1] !== DEFAULT_PRICE_RANGE[1]
          ? `${newRange[0]},${newRange[1]}`
          : null,
      items: DEFAULT_ITEMS_TO_SHOW,
      category: categoryFilter !== "all" ? categoryFilter : null,
      sort: sortOrder !== "default" ? sortOrder : null,
      search: searchTerm || null,
    });
    setItemsToShow(DEFAULT_ITEMS_TO_SHOW);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    // Don't update URL on every keystroke — update after debounce or on blur (for simplicity here, on every change)
    updateSearchParams({
      search: val.trim() !== "" ? val.trim() : null,
      items: DEFAULT_ITEMS_TO_SHOW,
      category: categoryFilter !== "all" ? categoryFilter : null,
      sort: sortOrder !== "default" ? sortOrder : null,
      price:
        priceFilter[0] !== DEFAULT_PRICE_RANGE[0] ||
        priceFilter[1] !== DEFAULT_PRICE_RANGE[1]
          ? `${priceFilter[0]},${priceFilter[1]}`
          : null,
    });
    setItemsToShow(DEFAULT_ITEMS_TO_SHOW);
  };

  const handleLoadMore = () => {
    const newItemsCount = itemsToShow + 10;
    setItemsToShow(newItemsCount);
    updateSearchParams({
      items: newItemsCount,
      category: categoryFilter !== "all" ? categoryFilter : null,
      sort: sortOrder !== "default" ? sortOrder : null,
      price:
        priceFilter[0] !== DEFAULT_PRICE_RANGE[0] ||
        priceFilter[1] !== DEFAULT_PRICE_RANGE[1]
          ? `${priceFilter[0]},${priceFilter[1]}`
          : null,
      search: searchTerm || null,
    });
  };

  // Filter products by search term
  const filteredByCategory =
    categoryFilter === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === categoryFilter);

  const filteredBySearch = filteredByCategory.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredBySearch].sort((a, b) => {
    switch (sortOrder) {
      case "priceLowHigh":
        return a.price - b.price;
      case "priceHighLow":
        return b.price - a.price;
      case "nameAsc":
        return a.title.localeCompare(b.title);
      case "nameDesc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const priceFiltered = sortedProducts.filter(
    (p) => p.price >= priceFilter[0] && p.price <= priceFilter[1]
  );

  const visible = priceFiltered.slice(0, itemsToShow);
  const showLoadMore = itemsToShow < priceFiltered.length;

  return (
    <div className="max-w-7xl mx-auto mt-4 min-h-[calc(100vh-50px-1rem)] px-4 mb-10">
      <ToastContainer position="top-left" autoClose={4000} transition={Slide} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold text-gray-900">Products</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow md:flex-none border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="md:hidden px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition z-50"
          >
            {filterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Filters Sidebar */}
        <aside
          className={`
            bg-white shadow-md rounded-md p-6 z-50
            transition-transform duration-300 ease-in-out
            md:sticky md:top-15 md:h-auto md:w-64 md:translate-x-0
            fixed top-0 left-0 h-full w-64
            ${filterOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <h2 className="text-xl font-semibold mb-4 md:hidden">Filters</h2>

          {/* Category */}
          <label className="block mb-2 font-medium">Category</label>
          <select
            className="w-full border px-3 py-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">All Products</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort */}
          <label className="block mb-2 font-medium">Sort By</label>
          <select
            className="w-full border px-3 py-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>

          {/* Price Slider */}
          <label className="block mb-2 font-medium">Price Range</label>
          <PriceRangeSlider
            priceFilter={priceFilter}
            setPriceFilter={handlePriceChange}
          />
        </aside>

        {/* Filter overlay */}
        {filterOpen && (
          <div
            onClick={() => setFilterOpen(false)}
            className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          />
        )}

        {/* Products Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {errorMsg ? (
              <h1>{errorMsg}</h1>
            ) : loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white w-full min-h-[420px] rounded-xl shadow p-4 flex flex-col items-center text-center animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 rounded mb-4" />
                  <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                  <div className="w-1/2 h-4 bg-gray-200 rounded mb-4" />
                  <div className="w-full mt-auto flex flex-col md:flex-row gap-2 items-center">
                    <div className="w-full md:w-1/2 h-8 bg-gray-200 rounded" />
                    <div className="w-full h-8 bg-gray-200 rounded" />
                  </div>
                </div>
              ))
            ) : visible.length > 0 ? (
              visible.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  details={false}
                  notify={notifyAdded}
                />
              ))
            ) : (
              <h2 className="text-gray-700 text-2xl whitespace-nowrap">
                No products match your search
              </h2>
            )}
          </div>

          {/* Load More */}
          {showLoadMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
