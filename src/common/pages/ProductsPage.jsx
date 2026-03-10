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

  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterOpen]);

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

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategoryFilter(newCategory));
    updateSearchParams({
      category: newCategory !== "all" ? newCategory : null,
      items: DEFAULT_ITEMS_TO_SHOW,
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

  const hasActiveFilters =
    categoryFilter !== "all" ||
    sortOrder !== "default" ||
    priceFilter[0] !== DEFAULT_PRICE_RANGE[0] ||
    priceFilter[1] !== DEFAULT_PRICE_RANGE[1] ||
    searchTerm !== "";

  const clearAllFilters = () => {
    dispatch(setCategoryFilter("all"));
    dispatch(setSortOrder("default"));
    setPriceFilter(DEFAULT_PRICE_RANGE);
    setSearchTerm("");
    setItemsToShow(DEFAULT_ITEMS_TO_SHOW);
    setSearchParams({});
  };

  return (
    <div className="w-full min-w-full py-8 md:py-10 mb-16">
      <ToastContainer position="top-left" autoClose={4000} transition={Slide} />

      <div className="site-container">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Products</h1>
        <p className="text-slate-500 mt-0.5 mb-6">
          {!loading && visible.length > 0
            ? `${priceFiltered.length} product${priceFiltered.length !== 1 ? "s" : ""}`
            : "Browse our catalog"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 bg-white"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 bg-white cursor-pointer"
            >
              <option value="default">Sort</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="nameAsc">Name: A-Z</option>
              <option value="nameDesc">Name: Z-A</option>
            </select>
            <button
              onClick={() => setFilterOpen((prev) => !prev)}
              className="md:hidden flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-8 w-full">
        <aside
          className={`
            hidden md:block w-56 min-w-0
            transition-transform duration-300 ease-out
            md:sticky md:top-20 md:self-start
          `}
        >
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Category</h3>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  categoryFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">Price</h3>
              <PriceRangeSlider
                priceFilter={priceFilter}
                setPriceFilter={handlePriceChange}
              />
            </div>
          </div>
        </aside>

        {filterOpen && (
          <>
            <div
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/30 z-40 md:hidden cursor-pointer"
            />
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl z-50 p-6 overflow-y-auto md:hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="p-2 -m-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Category</h3>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    value={categoryFilter}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="all">All Products</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Price Range</h3>
                  <PriceRangeSlider
                    priceFilter={priceFilter}
                    setPriceFilter={handlePriceChange}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <main className="min-w-0 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch w-full">
            {errorMsg ? (
              <div className="col-span-full flex items-center justify-center py-24">
                <p className="text-slate-600">{errorMsg}</p>
              </div>
            ) : loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col animate-pulse"
                >
                  <div className="aspect-square bg-slate-200 rounded-xl mb-4" />
                  <div className="w-3/4 h-4 bg-slate-200 rounded mb-2" />
                  <div className="w-1/2 h-4 bg-slate-200 rounded mb-4" />
                  <div className="w-full mt-auto flex gap-3">
                    <div className="flex-1 h-10 bg-slate-200 rounded-lg" />
                    <div className="flex-1 h-10 bg-slate-200 rounded-lg" />
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
              <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">
                  No products match your filters
                </h2>
                <p className="text-slate-500 mt-1 text-center max-w-sm">
                  Try adjusting your search, category, or price range
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {showLoadMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Load more
              </button>
            </div>
          )}
        </main>
      </div>
      </div>
    </div>
  );
};

export default ProductsPage;
