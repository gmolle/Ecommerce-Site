import React from "react";

const CheckoutForms = ({
  formInputs,
  formErrors,
  onInputChange,
  onSubmit,
  formValid,
}) => {
  // Tailwind styling consistent with OrderSummary and clean form layout
  const inputBaseClasses =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-transparent focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition duration-200";

  const labelBaseClasses =
    "absolute left-3 top-2 text-gray-500 text-sm transition-all pointer-events-none bg-white px-1";

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <form id="checkout-form" onSubmit={onSubmit} noValidate>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Customer Info
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* First Name */}
          <div className="relative">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formInputs.firstName}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.firstName ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="given-name"
            />
            <label
              htmlFor="firstName"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              First Name
            </label>
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formInputs.lastName}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.lastName ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="family-name"
            />
            <label
              htmlFor="lastName"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              Last Name
            </label>
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
            )}
          </div>

          {/* Address full width */}
          <div className="relative sm:col-span-2">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formInputs.address}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.address ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="street-address"
            />
            <label
              htmlFor="address"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              Address
            </label>
            {formErrors.address && (
              <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
            )}
          </div>

          {/* City */}
          <div className="relative">
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formInputs.city}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.city ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="address-level2"
            />
            <label
              htmlFor="city"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              City
            </label>
            {formErrors.city && (
              <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
            )}
          </div>

          {/* State */}
          <div className="relative">
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formInputs.state}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.state ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="address-level1"
            />
            <label
              htmlFor="state"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              State
            </label>
            {formErrors.state && (
              <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
            )}
          </div>

          {/* ZIP */}
          <div className="relative">
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="ZIP"
              value={formInputs.zip}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.zip ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="postal-code"
            />
            <label
              htmlFor="zip"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              ZIP
            </label>
            {formErrors.zip && (
              <p className="mt-1 text-sm text-red-600">{formErrors.zip}</p>
            )}
          </div>

          {/* Card Number */}
          <div className="relative sm:col-span-2">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Card Number"
              value={formInputs.cardNumber}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.cardNumber ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="cc-number"
              maxLength={19}
            />
            <label
              htmlFor="cardNumber"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              Card Number
            </label>
            {formErrors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.cardNumber}
              </p>
            )}
          </div>

          {/* Exp Date */}
          <div className="relative">
            <input
              type="text"
              id="expDate"
              name="expDate"
              placeholder="MM/YY"
              value={formInputs.expDate}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.expDate ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="cc-exp"
              maxLength={5}
            />
            <label
              htmlFor="expDate"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              Exp. Date (MM/YY)
            </label>
            {formErrors.expDate && (
              <p className="mt-1 text-sm text-red-600">{formErrors.expDate}</p>
            )}
          </div>

          {/* CVV */}
          <div className="relative">
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="CVV"
              value={formInputs.cvv}
              onChange={onInputChange}
              className={`${inputBaseClasses} peer ${
                formErrors.cvv ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="cc-csc"
              maxLength={4}
            />
            <label
              htmlFor="cvv"
              className={`${labelBaseClasses} peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
peer-focus:top-[-0.5rem] peer-focus:text-blue-600 peer-focus:text-sm
peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-blue-600 peer-not-placeholder-shown:text-sm`}
            >
              CVV
            </label>
            {formErrors.cvv && (
              <p className="mt-1 text-sm text-red-600">{formErrors.cvv}</p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!formValid}
          className="mt-8 w-full rounded-md bg-blue-600 py-3 text-white font-semibold shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForms;
