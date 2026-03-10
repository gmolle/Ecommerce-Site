import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/products/productSlice";
import Product from "../../../features/products/Product";
import Loader from "../../loader/Loader";
import { Slide, toast, ToastContainer } from "react-toastify";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [ready, setReady] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && products.length === 0) {
      hasFetched.current = true;
      dispatch(fetchProducts()).then(() => setReady(true));
    } else if (products.length > 0) {
      setReady(true);
    }
  }, [dispatch, products.length]);

  const currentProduct = useMemo(() => {
    return products.find((product) => product.serialNum === id);
  }, [products, id]);

  const relatedProducts = useMemo(() => {
    if (!currentProduct?.category) return [];
    return products.filter(
      (p) =>
        p.category === currentProduct.category &&
        p.serialNum !== currentProduct.serialNum
    );
  }, [products, currentProduct]);

  const addedSuccess = () => {
    toast.success("Added to cart", { theme: "dark" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!ready || loading) {
    return <Loader />;
  }

  if (!currentProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Product not found</h2>
        <p className="text-slate-500 mt-2 mb-8">The product you're looking for doesn't exist.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to products
        </Link>
      </div>
    );
  }

  const categoryName =
    currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
      <ToastContainer position="top-left" autoClose={4000} transition={Slide} />

      <nav className="py-6 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-slate-500">
          <li>
            <Link to="/" className="hover:text-slate-900 transition-colors cursor-pointer">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:text-slate-900 transition-colors cursor-pointer">
              Products
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              to={`/products?category=${encodeURIComponent(currentProduct.category)}`}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {categoryName}
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {currentProduct.title}
          </li>
        </ol>
      </nav>

      {!loading && (
        <div className="mb-20">
          <Product
            product={currentProduct}
            details={true}
            notify={addedSuccess}
          />
        </div>
      )}

      <section className="border-t border-slate-200 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              You might also like
            </h2>
            <p className="text-slate-500 mt-1">
              More from {categoryName}
            </p>
          </div>
          {relatedProducts.length > 0 && (
            <Link
              to={`/products?category=${encodeURIComponent(currentProduct.category)}`}
              className="text-sm font-medium text-teal-600 hover:text-teal-700 cursor-pointer shrink-0"
            >
              View all {categoryName} →
            </Link>
          )}
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((product) => (
              <Product key={product.id} product={product} notify={addedSuccess} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl">
            <p className="text-slate-500">No related products at the moment.</p>
            <Link
              to="/products"
              className="inline-block mt-4 text-teal-600 font-medium hover:text-teal-700 cursor-pointer"
            >
              Browse all products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetailsPage;
