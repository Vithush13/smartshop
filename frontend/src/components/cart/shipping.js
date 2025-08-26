import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "./checkoutStep";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.name ||
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information", {
      position: "bottom-center",
    });
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const [name, setName] = useState(shippingInfo.name || "");
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [phoneCode, setPhoneCode] = useState("");

  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update phone code when country changes
  useEffect(() => {
    if (country) {
      const selected = countryList.find((c) => c.name === country);
      if (selected && selected.phone) {
        const phoneStr = String(selected.phone); // ensure string
        const firstCode = phoneStr.includes(",")
          ? phoneStr.split(",")[0]
          : phoneStr;
        setPhoneCode("+" + firstCode);
      } else {
        setPhoneCode("");
      }
    }
  }, [country, countryList]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        name,
        address,
        city,
        phoneNo,
        postalCode,
        country,
        state,
      })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
        <CheckoutSteps shipping />
      <div className="row wrapper d-flex justify-content-center align-items-center">
        <div className="col-10 col-lg-6">
          <form
            onSubmit={submitHandler}
            className="shadow-lg p-4 rounded bg-white"
          >
            <h1 className="mb-4 text-center text-primary fw-bold">
              Shipping Info
            </h1>

            <div className="form-group mb-3">
              <label htmlFor="name_field" className="fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="address_field" className="fw-semibold">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                placeholder="Street / Apartment / Landmark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="city_field" className="fw-semibold">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                placeholder="Your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="phone_field" className="fw-semibold">
                Phone No
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  {phoneCode || "+--"}
                </span>
                <input
                  type="tel"
                  id="phone_field"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="postal_code_field" className="fw-semibold">
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="country_field" className="fw-semibold">
                Country
              </label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">-- Select Country --</option>
                {countryList.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="state_field" className="fw-semibold">
                State / Province
              </label>
              <input
                type="text"
                id="state_field"
                className="form-control"
                placeholder="Enter state/province"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            {/* smaller button */}
            <div className="text-center">
              <button
                id="shipping_btn"
                type="submit"
                className="btn btn-primary w-50 py-2 fw-bold rounded-pill"
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
