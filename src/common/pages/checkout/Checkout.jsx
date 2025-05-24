import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "../../../features/cart/OrderSummary";
import CheckoutForms from "../../forms/CheckoutForms";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  updateQuantityAfterOrder,
} from "../../../features/products/productSlice";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Form state & errors moved here
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

  // Calculate total items and price on cartItems change
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

  // Validation function moved here
  const validateForm = (inputs) => {
    const errors = {};
    if (!inputs.firstName) errors.firstName = "First name is required";
    if (!inputs.lastName) errors.lastName = "Last name is required";
    if (!inputs.address) errors.address = "Address is required";
    if (!inputs.city) errors.city = "City is required";
    if (!inputs.state) errors.state = "State is required";
    if (!inputs.zip) errors.zip = "ZIP is required";
    if (!inputs.cardNumber) errors.cardNumber = "Card number is required";
    if (!inputs.expDate) errors.expDate = "Exp. date is required";
    if (!inputs.cvv) {
      errors.cvv = "CVV is required";
    } else if (inputs.cvv.length < 3 || inputs.cvv.length > 4) {
      errors.cvv = "CVV must be between 3 and 4 digits";
    }
    return errors;
  };

  // Handle input change for controlled inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  // On form submit from CheckoutForms
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formInputs);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormValid(false);
      return;
    }

    // Form is valid, proceed with order processing
    cartItems.forEach((item) => {
      dispatch(
        updateQuantityAfterOrder({
          serialNum: item[0].serialNum,
          newValue: item[0].quantity - item[1],
        })
      );
    });

    dispatch(clearCart());
    const fakeOrderId = Math.floor(Math.random() * 900000 + 100000); // e.g. 6-digit order ID
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

  // Update form validity on inputs or errors change
  useEffect(() => {
    const noErrors = Object.keys(formErrors).length === 0;
    const noEmptyInputs = !Object.values(formInputs).some(
      (x) => x === null || x === ""
    );
    setFormValid(noErrors && noEmptyInputs);
  }, [formErrors, formInputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-153px)] text-gray-900 text-base md:text-lg">
      <div>
        <h1 className="text-4xl font-bold mb-4">Checkout</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full max-w-md mx-auto md:mx-0 md:flex-grow">
          {cartItems.length > 0 ? (
            <CheckoutForms
              formInputs={formInputs}
              formErrors={formErrors}
              onInputChange={handleInputChange}
              onSubmit={handleFormSubmit}
              formValid={formValid}
            />
          ) : (
            <h2 className="text-2xl font-semibold text-center md:text-left">
              You have no items in your cart
            </h2>
          )}
        </div>

        <div className="w-full max-w-md mx-auto md:mx-0 md:w-[350px]">
          <OrderSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            checkout={true}
            formValid={formValid}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
