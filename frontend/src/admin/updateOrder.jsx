import { Fragment, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../actions/orderAction";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../slices/orderSlice";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );

  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail || {};

  const isPaid = paymentInfo?.status === "succeeded";
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder(orderId, { orderStatus }));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("✅ Order Updated Successfully!", {
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderUpdated()),
      });
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, dispatch, orderId]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div className="row">
      {/* Sidebar */}
      <div className="col-12 col-md-2 bg-light p-0 shadow-sm border-end">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="col-12 col-md-10 p-4">
        <Fragment>
          <div className="row d-flex justify-content-around">
            {/* Order Details */}
            <div className="col-12 col-lg-8 mt-3 order-details bg-white p-4 rounded shadow border border-2 border-primary-subtle">
              <h2 className="fw-bold text-primary mb-4 border-bottom pb-2">
                📝 Order # {orderDetail._id}
              </h2>

              <h4 className="text-dark mb-3">📦 Shipping Info</h4>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
              <p className="mb-3">
                <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
              <p className="fw-bold text-success fs-5 bg-light p-2 rounded">
                💰 Total Amount: Rs.{totalPrice}
              </p>

              <hr className="my-4" />

              <h4 className="text-dark my-3">💳 Payment</h4>
              <span
                className={`badge px-3 py-2 fs-6 ${
                  isPaid ? "bg-success" : "bg-danger"
                }`}
              >
                {isPaid ? " PAID" : " NOT PAID"}
              </span>

              <h4 className="text-dark my-4">📋 Current Status</h4>
              <span
                className={`badge px-3 py-2 fs-6 ${
                  orderStatus?.includes("Delivered")
                    ? "bg-success"
                    : orderStatus?.includes("Shipped")
                    ? "bg-info text-dark"
                    : "bg-warning text-dark"
                }`}
              >
                {orderStatus}
              </span>

              <h4 className="text-dark my-4">🛒 Order Items</h4>
              <div className="cart-item">
                {orderItems.map((item) => (
                  <div
                    key={item.product}
                    className="row align-items-center my-3 p-3 border rounded shadow-sm hover-shadow-lg bg-light-subtle"
                  >
                    <div className="col-3 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded border shadow-sm"
                      />
                    </div>

                    <div className="col-6 col-lg-5">
                      <Link
                        to={`/product/${item.product}`}
                        className="fw-medium text-decoration-none text-dark hover-text-primary"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="col-3 col-lg-2 text-primary fw-bold">
                      Rs.{item.price}
                    </div>

                    <div className="col-12 col-lg-3 text-muted">
                      {item.quantity} Piece(s)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update Section */}
            <div className="col-12 col-lg-3 mt-3">
              <div className="bg-white p-4 rounded shadow border border-2 border-info-subtle">
                <h4 className="text-dark mb-3">⚙️ Update Status</h4>
                <div className="form-group mb-3">
                  <select
                    className="form-select border-primary shadow-sm"
                    onChange={(e) => setOrderStatus(e.target.value)}
                    value={orderStatus}
                  >
                    <option value="Processing">🟡 Processing</option>
                    <option value="Shipped">🔵 Shipped</option>
                    <option value="Delivered">🟢 Delivered</option>
                  </select>
                </div>
                <button
                  disabled={loading}
                  onClick={submitHandler}
                  className="btn btn-gradient w-100 fw-bold text-white shadow-sm"
                  style={{
                    background:
                      "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                  }}
                >
                  {loading ? " Updating..." : "Update Status"}
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
