import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';

export default function Cart() {
    const { items } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.stock === 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product));
    };

    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count === 1) return;
        dispatch(decreaseCartItemQty(item.product));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <Fragment>
            {items.length === 0 ? (
                <h2 className="mt-5 text-center text-muted">🛒 Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h2 className="mt-5 fw-bold text-dark">
                        Your Cart: <span className="text-primary">{items.length} items</span>
                    </h2>

                    <div className="row d-flex justify-content-between mt-4">
                        {/* Cart Items Section */}
                        <div className="col-12 col-lg-8">
                            {items.map(item => (
                                <Fragment key={item.product}>
                                    <div className="cart-item bg-white p-3 my-3 shadow-sm rounded">
                                        <div className="row align-items-center">
                                            {/* Image */}
                                            <div className="col-4 col-lg-3 text-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded shadow-sm"
                                                    style={{ maxHeight: "120px", objectFit: "cover" }}
                                                />
                                            </div>

                                            {/* Product Name */}
                                            <div className="col-5 col-lg-3">
                                                <Link
                                                    to={`/product/${item.product}`}
                                                    className="text-decoration-none fw-semibold text-dark"
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>

                                            {/* Price */}
                                            <div className="col-4 col-lg-2 mt-3 mt-lg-0">
                                                <p id="card_item_price" className="fw-bold text-success">
                                                    Rs.{item.price}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="col-6 col-lg-3 mt-3 mt-lg-0">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <button
                                                        className="btn btn-sm btn-outline-danger rounded-circle fw-bold"
                                                        onClick={() => decreaseQty(item)}
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="form-control text-center mx-2 fw-bold"
                                                        style={{ width: "60px" }}
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-sm btn-outline-primary rounded-circle fw-bold"
                                                        onClick={() => increaseQty(item)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <div className="col-2 col-lg-1 mt-3 mt-lg-0 text-center">
                                                <button
                                                    onClick={() => dispatch(removeItemFromCart(item.product))}
                                                    className="btn btn-sm btn-danger rounded-circle"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary" className="p-4 bg-white shadow-lg rounded">
                                <h4 className="fw-bold text-dark">Order Summary</h4>
                                <hr />
                                <p>
                                    Subtotal:
                                    <span className="order-summary-values fw-semibold ms-2">
                                        {items.reduce((acc, item) => acc + item.quantity, 0)} (Units)
                                    </span>
                                </p>
                                <p>
                                    Est. total:
                                    <span className="order-summary-values fw-semibold text-success ms-2">
                                        Rs.{items.reduce((acc, item) => acc + item.quantity * item.price, 0)}
                                    </span>
                                </p>
                                <hr />
                                <button
                                    id="checkout_btn"
                                    onClick={checkoutHandler}
                                    className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow-sm"
                                >
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
