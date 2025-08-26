import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "../cart/shipping";
import { createOrder } from "../../actions/orderAction";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector((state) => state.cartState);
  const { error: orderError } = useSelector((state) => state.orderState || {});

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo?.itemsPrice,
    shippingPrice: orderInfo?.shippingPrice,
    taxPrice: orderInfo?.taxPrice,
    totalPrice: orderInfo?.totalPrice,
  };

  useEffect(() => {
    

    if (orderError) {
      toast(orderError, {
        position: "bottom-center",
        type: "error",
        onOpen: () => dispatch(clearOrderError()),
      });
    }
  }, [orderError, dispatch, navigate, shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (paymentMethod === "cod") {
      order.paymentInfo = { id: "COD", status: "Pending" };
      dispatch(orderCompleted());
      dispatch(createOrder(order));
      toast("Order placed with Cash on Delivery", { type: "success", position: "bottom-center" });
      navigate("/order/success");
    } else {
      order.paymentInfo = { id: "ONLINE12345", status: "Paid" };
      dispatch(orderCompleted());
      dispatch(createOrder(order));
      toast("Order placed with Online Payment (simulated)", { type: "success", position: "bottom-center" });
      navigate("/order/success");
    }
  };

  return (
    <div className="row justify-content-center py-5" style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <div className="col-10 col-md-6 col-lg-5">
        <form
          onSubmit={submitHandler}
          className="p-5 rounded shadow-sm"
          style={{
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            transition: "all 0.3s",
          }}
        >
          <h2 className="mb-4 text-center" style={{ fontWeight: "700", color: "#333" }}>
            Select Payment Method
          </h2>

          <div
            className="form-check mb-3 d-flex align-items-center"
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: paymentMethod === "cod" ? "2px solid #007bff" : "1px solid #ccc",
              cursor: "pointer",
              transition: "all 0.2s",
              background: paymentMethod === "cod" ? "#e6f0ff" : "#fff",
            }}
            onClick={() => setPaymentMethod("cod")}
          >
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              className="form-check-input me-3"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <label htmlFor="cod" className="form-check-label fw-semibold">
              Cash on Delivery
            </label>
          </div>

          <div
            className="form-check mb-4 d-flex align-items-center"
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: paymentMethod === "online" ? "2px solid #007bff" : "1px solid #ccc",
              cursor: "pointer",
              transition: "all 0.2s",
              background: paymentMethod === "online" ? "#e6f0ff" : "#fff",
            }}
            onClick={() => setPaymentMethod("online")}
          >
            <input
              type="radio"
              id="online"
              name="paymentMethod"
              className="form-check-input me-3"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <label htmlFor="online" className="form-check-label fw-semibold">
              Online Payment
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            style={{
              fontWeight: "600",
              borderRadius: "8px",
              fontSize: "1rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            {paymentMethod === "cod"
              ? "Place Order (COD)"
              : `Place Order (Online - Rs.${orderInfo?.totalPrice})`}
          </button>
        </form>
      </div>
    </div>
  );
}
