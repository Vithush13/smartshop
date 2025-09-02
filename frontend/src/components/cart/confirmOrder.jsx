import MetaData from '../layouts/Meta';
import { Fragment, useEffect } from 'react';
import { validateShipping } from './shipping';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './checkoutStep';

export default function ConfirmOrder () {
    const { shippingInfo, items:cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();

    const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0);
    const shippingPrice = itemsPrice > 6000 ? 0 : 1000;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);
    
    const processPayment = () => {
        const data = { itemsPrice, shippingPrice, taxPrice, totalPrice }
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    useEffect(()=>{
        validateShipping(shippingInfo, navigate);
    },[]);

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                {/* Left side - Shipping Info + Cart Items */}
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <div className="p-4 bg-white shadow-sm rounded">
                        <h4 className="mb-3 text-primary fw-bold">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
                    </div>

                    <div className="p-4 bg-light shadow-sm rounded mt-4">
                        <h4 className="mb-3 text-success fw-bold">Your Cart Items</h4>
                        {cartItems.map(item => (
                            <Fragment key={item.product}>
                                <div className="cart-item my-3 p-3 border rounded bg-white shadow-sm">
                                    <div className="row align-items-center">
                                        <div className="col-4 col-lg-2">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="img-fluid rounded"
                                                style={{ maxHeight: "70px", objectFit: "cover" }}
                                            />
                                        </div>

                                        <div className="col-5 col-lg-6">
                                            <Link 
                                                to={`/product/${item.product}`} 
                                                className="text-decoration-none fw-semibold"
                                            >
                                                {item.name}
                                            </Link>
                                        </div>

                                        <div className="col-4 col-lg-4 mt-3 mt-lg-0 text-end">
                                            <p className="mb-0">
                                                {item.quantity} x Rs.{item.price} = <b>Rs.{item.quantity * item.price}</b>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* Right side - Order Summary */}
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary" className="p-4 bg-white shadow-lg rounded">
                        <h4 className="text-dark fw-bold">Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span className="order-summary-values fw-semibold">Rs.{itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values fw-semibold">Rs.{shippingPrice}</span></p>
                        <p>Tax: <span className="order-summary-values fw-semibold">Rs.{taxPrice}</span></p>
                        <hr />
                        <p className="fs-5 fw-bold">Total: <span className="text-primary">Rs.{totalPrice}</span></p>
                        <hr />
                        <button 
                            id="checkout_btn" 
                            onClick={processPayment} 
                            className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow-sm"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
