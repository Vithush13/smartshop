import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { orderDetail as orderDetailAction } from '../../actions/orderAction';

export default function OrderDetail() {
  const { orderDetail, loading } = useSelector(state => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {}
  } = orderDetail;

  const isPaid = paymentInfo && paymentInfo.status === "succeeded";
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id, dispatch]);

  // Order name (first item or fallback)
  const orderName = orderItems.length > 0 ? orderItems[0].name : "Custom Order";

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container my-5">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            
            {/* Header */}
            <div className="card-header bg-gradient text-white text-center py-4" style={{
              background: "linear-gradient(135deg, #4e73df, #1cc88a)"
            }}>
              <h2 className="mb-0 fw-bold">{orderName}</h2>
              <span className={`badge mt-2 px-3 py-2 ${orderStatus.includes("Delivered") ? "bg-success" : "bg-warning text-dark"}`}>
                {orderStatus}
              </span>
            </div>

            {/* Body */}
            <div className="card-body p-5">
              {/* Shipping Info */}
              <h4 className="text-secondary mb-3">🚚 Shipping Info</h4>
              <div className="bg-light rounded p-3 mb-4 shadow-sm">
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-0"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
              </div>

              {/* Payment */}
              <h4 className="text-secondary mb-3">💳 Payment</h4>
              <p className={`fw-bold ${isPaid ? "text-success" : "text-danger"}`}>
                {isPaid ? "PAID" : " NOT PAID"}
              </p>

              {/* Amount */}
              <div className="alert alert-info mt-3 fw-bold">
                Total Amount: Rs.{totalPrice.toFixed(2)}
              </div>

              {/* Items */}
              <h4 className="text-secondary mt-4 mb-3">🛒 Order Items</h4>
              <div className="row">
                {orderItems.map((item, index) => (
                  <div key={index} className="col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm rounded-3">
                      <div className="card-body d-flex">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded me-3"
                          style={{ height: "120px", width: "140px", objectFit: "contain" }}
                        />
                        <div>
                          <Link
                            to={`/product/${item.product}`}
                            className="fw-bold text-dark text-decoration-none"
                          >
                            {item.name}
                          </Link>
                          <p className="mb-1 text-muted">
                            Rs.{item.price} × {item.quantity} Piece(s)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extra Styling */}
          <style>{`
            .card-header {
              box-shadow: inset 0 -2px rgba(255,255,255,0.2);
            }
            .card-body h4 {
              font-weight: 600;
            }
            .order-item-card:hover {
              transform: scale(1.02);
              transition: 0.2s ease-in-out;
            }
          `}</style>
        </div>
      )}
    </Fragment>
  );
}
