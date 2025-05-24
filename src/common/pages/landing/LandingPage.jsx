import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../features/products/productSlice";

const benefits = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-indigo-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7" />
      </svg>
    ),
    title: "Fast & Reliable Shipping",
    description:
      "Get your products delivered fast with our trusted courier partners.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-indigo-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx={12} cy={12} r={10} />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    title: "Secure Payments",
    description: "Your payment information is encrypted and safe with us.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-indigo-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Quality Guarantee",
    description: "We ensure all products meet high standards before shipping.",
  },
];

import electronicsImg from "../../../assets/electronics.jpg";
import mensClothingImg from "../../../assets/mens-clothing.jpg";
import womensClothingImg from "../../../assets/womens-clothing.jpg";
import jeweleryImg from "../../../assets/jewelery.jpg";

const categoryImages = {
  electronics: electronicsImg,
  "men's clothing": mensClothingImg,
  "women's clothing": womensClothingImg,
  jewelery: jeweleryImg,
};

const LandingPage = () => {
  const dispatch = useDispatch();

  // Grab categories from Redux store
  const categories = useSelector((state) => state.products.categories);

  useEffect(() => {
    // Fetch categories on mount if not already loaded
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Discover Your Next Favorite Thing
            </h1>
            <p className="text-lg mb-8 max-w-lg mx-auto md:mx-0 opacity-90">
              Shop the latest products from top categories at unbeatable prices.
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-indigo-600 font-semibold rounded-lg px-8 py-4 shadow-lg hover:bg-indigo-50 transition"
            >
              Shop Now
            </Link>
          </div>
          <div className="flex-1 max-w-lg mx-auto">
            <img
              src="https://images.unsplash.com/photo-1600201319331-27d31ecd7850?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Shopping bags"
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-gray-50 w-full mx-auto py-10">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Shop by Category
        </h2>
        {!categories || categories.length === 0 ? (
          <p className="text-center py-10">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-6">
            {categories?.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={categoryImages[cat]}
                    alt={cat}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center mt-4 mb-2">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {benefits.map(({ icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center space-y-4 px-6"
              >
                <div>{icon}</div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
