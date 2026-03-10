import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../features/products/productSlice";

const benefits = [
  {
    icon: (
      <svg
        className="w-6 h-6"
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
        className="w-6 h-6"
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
        className="w-6 h-6"
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

  const categories = useSelector((state) => state.products.categories);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center w-full">
          <p className="text-teal-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            New Collection
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto">
            Style that speaks for you
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Discover curated products across electronics, fashion, and more. Shop with confidence.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold rounded-full px-10 py-4 hover:bg-slate-100 transition-all duration-200 cursor-pointer"
          >
            Shop All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-4 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Free shipping on orders $50+
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Secure checkout
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Easy returns
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Shop by category</h2>
          <p className="text-slate-500 mb-12">Find what you're looking for</p>
          {!categories || categories.length === 0 ? (
            <p className="text-slate-500 py-10">Loading categories...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories?.map((cat) => (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={categoryImages[cat]}
                    alt={cat}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="text-white font-semibold text-lg md:text-xl">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </h3>
                    <span className="text-teal-300 text-sm font-medium group-hover:underline">
                      Shop now →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {benefits.map(({ icon, title, description }) => (
              <div key={title} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
