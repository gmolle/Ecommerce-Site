import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
        p.serialNumber !== currentProduct.serialNum
    );
  }, [products, currentProduct]);

  const addedSuccess = () => {
    toast.success("Added to cart", { theme: "dark" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!ready || loading) {
    console.log("loading...");
    return <Loader />;
  }

  if (!currentProduct) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 pb-0 min-h-screen mb-10">
      <ToastContainer position="top-left" autoClose={4000} transition={Slide} />

      {!loading ? (
        <div className="mb-12">
          <Product
            product={currentProduct}
            details={true}
            notify={addedSuccess}
          />
        </div>
      ) : (
        <Loader />
      )}

      {/* Main Product */}

      {/* Related Products Header */}
      <h2 className="text-2xl font-semibold mb-6">
        Items related to{" "}
        {currentProduct.category.charAt(0).toUpperCase() +
          currentProduct.category.slice(1)}
      </h2>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Product key={product.id} product={product} notify={addedSuccess} />
          ))}
        </div>
      ) : (
        <h2>No related products</h2>
      )}
    </div>
  );
};

export default ProductDetailsPage;
