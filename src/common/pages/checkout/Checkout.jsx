import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../../../features/cart/OrderSummary";
import CheckoutForms from "../../forms/CheckoutForms";
import {
  clearCart,
  updateQuantityAfterOrder,
} from "../../../features/products/productSlice";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const initialFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let count = 0;
    let price = 0;
    for (let i = 0; i < cartItems.length; i++) {
      count += cartItems[i][1];
      price += cartItems[i][0].price * cartItems[i][1];
    }
    setTotalPrice(Number(price.toFixed(2)));
    setTotalItems(count);
  }, [cartItems]);

  const validateForm = (inputs) => {
    const errors = {};
    if (!inputs.firstName) errors.firstName = "First name is required";
    if (!inputs.lastName) errors.lastName = "Last name is required";
    if (!inputs.address) errors.address = "Address is required";
    if (!inputs.city) errors.city = "City is required";
    if (!inputs.state) errors.state = "State is required";
    if (!inputs.zip) errors.zip = "ZIP is required";

    const rawCard = (inputs.cardNumber || "").replace(/\s/g, "");
    if (!rawCard) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d+$/.test(rawCard)) {
      errors.cardNumber = "Card number must contain only digits";
    } else if (rawCard.length < 13 || rawCard.length > 19) {
      errors.cardNumber = "Card number must be 13–19 digits";
    }

    const rawExp = (inputs.expDate || "").replace(/\D/g, "");
    if (!rawExp) {
      errors.expDate = "Exp. date is required";
    } else if (rawExp.length !== 4) {
      errors.expDate = "Enter MM/YY (e.g. 12/28)";
    } else {
      const month = parseInt(rawExp.slice(0, 2), 10);
      const year = 2000 + parseInt(rawExp.slice(2, 4), 10);
      if (month < 1 || month > 12) {
        errors.expDate = "Invalid month (01–12)";
      } else {
        const now = new Date();
        const exp = new Date(year, month, 0);
        if (exp < now) {
          errors.expDate = "Card has expired";
        }
      }
    }

    if (!inputs.cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d+$/.test(inputs.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    } else if (inputs.cvv.length < 3 || inputs.cvv.length > 4) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }
    return errors;
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpDate = (value, previousValue) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length === 0) return "";
    if (digits.length === 1) return digits;
    if (digits.length === 2) {
      const prevDigits = (previousValue || "").replace(/\D/g, "");
      if (prevDigits.length > 2) return digits;
      return `${digits}/`;
    }
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      setFormInputs((prev) => ({ ...prev, [name]: formatCardNumber(value) }));
      return;
    }
    if (name === "expDate") {
      setFormInputs((prev) => ({ ...prev, [name]: formatExpDate(value, prev.expDate) }));
      return;
    }
    if (name === "cvv") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      setFormInputs((prev) => ({ ...prev, [name]: digits }));
      return;
    }
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formInputs);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormValid(false);
      return;
    }

    cartItems.forEach((item) => {
      dispatch(
        updateQuantityAfterOrder({
          serialNum: item[0].serialNum,
          newValue: item[0].quantity - item[1],
        })
      );
    });

    dispatch(clearCart());
    const fakeOrderId = Math.floor(Math.random() * 900000 + 100000);
    const salesTax = totalPrice * 0.05;
    const totalWithTax = totalPrice + salesTax;

    navigate("/order-success", {
      state: {
        totalItems,
        totalPrice: totalWithTax,
        orderId: fakeOrderId,
      },
    });
  };

  useEffect(() => {
    const noErrors = Object.keys(formErrors).length === 0;
    const noEmptyInputs = !Object.values(formInputs).some(
      (x) => x === null || x === ""
    );
    setFormValid(noErrors && noEmptyInputs);
  }, [formErrors, formInputs]);

  return (
    <div className="w-full min-w-full py-8 md:py-10 mb-16 min-h-[calc(100vh-180px)] overflow-visible">
      <div className="site-container overflow-visible">
        <header className="mb-8 md:mb-10">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">
            Checkout
          </p>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Complete your order
            </h1>
            <p className="text-slate-500 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
            {cartItems.length > 0 && (
              <Link
                to="/cart"
                className="inline-block mt-3 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
              >
                ← Back to cart
              </Link>
            )}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 overflow-visible">
          <div className="w-full lg:flex-grow min-w-0">
            {cartItems.length > 0 ? (
              <CheckoutForms
                formInputs={formInputs}
                formErrors={formErrors}
                onInputChange={handleInputChange}
                onSubmit={handleFormSubmit}
                formValid={formValid}
              />
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 md:p-16 text-center shadow-soft">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
                  Add items to your cart to checkout. We ship fast and returns are easy.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold rounded-xl px-6 py-3.5 hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer shadow-soft"
                >
                  Browse Products
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <aside className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-24 lg:self-start">
            <OrderSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              checkout={true}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
