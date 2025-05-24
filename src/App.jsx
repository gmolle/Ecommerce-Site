import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductsPage from "./common/pages/ProductsPage";
import Navbar from "./features/navbar/Navbar";
import Cart from "./common/pages/cart/Cart";
import ProductDetailsPage from "./common/pages/productdetails/ProductDetailsPage";
import Checkout from "./common/pages/checkout/Checkout";
import Admin from "./common/pages/admin/Admin";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./common/pages/landing/LandingPage";
import ScrollToTop from "./common/util/ScrollToTop";
import Footer from "./common/Footer";
import OrderSuccessPage from "./common/pages/ordersuccess/OrderSuccess";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/products" exact element={<ProductsPage />} />
          <Route path="/product/:id" exact element={<ProductDetailsPage />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/checkout" exact element={<Checkout />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/order-success" exact element={<OrderSuccessPage />} />
        </Routes>
        <Footer />
        {/* <Link to="/admin">Admin</Link> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
