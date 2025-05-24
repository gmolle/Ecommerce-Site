import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../../../features/cart/CartProduct";
import OrderSummary from "../../../features/cart/OrderSummary";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const removeSuccess = () => {
    toast.success("Removed from cart", { theme: "dark" });
  };

  useEffect(() => {
    const cartItemTotal = () => {
      let count = 0;
      let price = 0;
      for (let i = 0; i < cartItems.length; i++) {
        count += cartItems[i][1];
        price += cartItems[i][0].price * cartItems[i][1];
      }
      setTotalPrice(Number(price.toFixed(2)));
      setTotalItems(count);
    };
    cartItemTotal();
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10 min-h-[calc(100vh-153px)] text-gray-900">
      <ToastContainer position="top-left" autoClose={4000} transition={Slide} />

      {/* Header full width */}
      <header className="py-8">
        <h1 className="text-4xl font-bold mb-2">Your Cart</h1>
        <div className="text-lg font-semibold text-gray-700">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </div>
      </header>

      {/* Main content flex container */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart items list */}
        <div className="flex-grow">
          <div className="space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartProduct
                  key={item[0].id}
                  product={item[0]}
                  quantity={item[1]}
                  notify={removeSuccess}
                />
              ))
            ) : (
              <>
                <h2 className="text-2xl text-gray-600 font-semibold">
                  No Items In Your Cart
                </h2>
                <Link
                  to="/products"
                  className="inline-block bg-white text-indigo-600 font-semibold rounded-lg px-8 py-4 shadow-lg hover:bg-indigo-50 transition"
                >
                  Browse Products
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Order summary */}
        <aside className="w-full md:w-[360px] sticky top-15 self-start">
          <OrderSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            checkout={false}
          />
        </aside>
      </div>
    </div>
  );
};

export default Cart;
