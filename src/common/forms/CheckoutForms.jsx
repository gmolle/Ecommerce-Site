import React from "react";

const CheckoutForms = ({
  formInputs,
  formErrors,
  onInputChange,
  onSubmit,
  formValid,
}) => {
  const inputBaseClasses =
    "w-full rounded-xl border border-slate-200 px-4 py-3.5 text-slate-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 bg-white transition duration-200";

  const inputErrorClasses = "border-red-500 focus:ring-red-500/30 focus:border-red-500";

  const labelBaseClasses =
    "absolute left-4 top-3.5 text-slate-500 text-sm transition-all duration-200 pointer-events-none bg-white px-1.5 rounded";

  const labelFocusedClasses =
    "peer-focus:top-[-0.5rem] peer-focus:text-teal-600 peer-focus:text-sm peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:text-teal-600 peer-not-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base";

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-soft-lg">
      <form id="checkout-form" onSubmit={onSubmit} noValidate>
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Shipping address
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formInputs.firstName}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.firstName ? inputErrorClasses : ""}`}
                autoComplete="given-name"
              />
              <label htmlFor="firstName" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                First name
              </label>
              {formErrors.firstName && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.firstName}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formInputs.lastName}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.lastName ? inputErrorClasses : ""}`}
                autoComplete="family-name"
              />
              <label htmlFor="lastName" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                Last name
              </label>
              {formErrors.lastName && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.lastName}</p>
              )}
            </div>

            <div className="relative sm:col-span-2 lg:col-span-3">
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formInputs.address}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.address ? inputErrorClasses : ""}`}
                autoComplete="street-address"
              />
              <label htmlFor="address" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                Street address
              </label>
              {formErrors.address && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.address}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formInputs.city}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.city ? inputErrorClasses : ""}`}
                autoComplete="address-level2"
              />
              <label htmlFor="city" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                City
              </label>
              {formErrors.city && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.city}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={formInputs.state}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.state ? inputErrorClasses : ""}`}
                autoComplete="address-level1"
              />
              <label htmlFor="state" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                State
              </label>
              {formErrors.state && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.state}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="ZIP"
                value={formInputs.zip}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.zip ? inputErrorClasses : ""}`}
                autoComplete="postal-code"
              />
              <label htmlFor="zip" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                ZIP code
              </label>
              {formErrors.zip && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.zip}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Payment
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="relative sm:col-span-2">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formInputs.cardNumber}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.cardNumber ? inputErrorClasses : ""}`}
                autoComplete="cc-number"
                inputMode="numeric"
                autoCorrect="off"
                maxLength={23}
              />
              <label htmlFor="cardNumber" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                Card number
              </label>
              {formErrors.cardNumber && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.cardNumber}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="expDate"
                name="expDate"
                placeholder="MM/YY"
                value={formInputs.expDate}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.expDate ? inputErrorClasses : ""}`}
                autoComplete="cc-exp"
                inputMode="numeric"
                autoCorrect="off"
                maxLength={5}
              />
              <label htmlFor="expDate" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                Exp. date (MM/YY)
              </label>
              {formErrors.expDate && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.expDate}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="CVV"
                value={formInputs.cvv}
                onChange={onInputChange}
                className={`${inputBaseClasses} peer ${formErrors.cvv ? inputErrorClasses : ""}`}
                autoComplete="cc-csc"
                inputMode="numeric"
                autoCorrect="off"
                maxLength={4}
              />
              <label htmlFor="cvv" className={`${labelBaseClasses} ${labelFocusedClasses}`}>
                CVV
              </label>
              {formErrors.cvv && (
                <p className="mt-1.5 text-sm text-red-600">{formErrors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!formValid}
          className="mt-8 w-full rounded-xl bg-slate-900 py-3.5 text-white font-semibold transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-200 flex items-center justify-center gap-2 cursor-pointer shadow-soft active:scale-[0.99]"
        >
          Place order
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default CheckoutForms;
