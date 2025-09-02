import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../actions/productsActions";

export default function Dashboard() {
  // placeholders - later you can replace with actual state/props
  const {products = []}= useSelector(state => state.productsState);
  const dispatch = useDispatch();
  const adminOrders = { length: 14 };
  const users = { length: 120 };
  let outOfStock = 0;

    if (products.length > 0) {
        products.forEach( product => {
            if( product.stock === 0  ) {
                outOfStock = outOfStock + 1;
            }
        })
    }
  useEffect(()=>{
    dispatch(getAdminProducts);
  },[])
  return (
    <div className="row dashboard-wrapper">
      {/* Sidebar */}
      <div className="col-12 col-md-2 sidebar-col">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="col-12 col-md-10 main-col">
        <h1 className="dashboard-title">📊 Dashboard </h1>

        {/* Total Amount Card */}
        <div className="row pr-4">
          <div className="col-xl-12 col-sm-12 mb-4">
            <div className="card shadow-lg gradient-success h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-white">Total Revenue</h4>
                <h2 className="text-white mt-2">$50,000</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row pr-4">
          {/* Products */}
          <div className="col-xl-3 col-sm-6 mb-4">
            <div className="card shadow-lg gradient-success h-100">
              <div className="card-body text-center">
                <h5 className="text-white">Products</h5>
                <h2 className="text-white">{products.length}</h2>
              </div>
              <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                <span className="float-left">View Details</span>
                <span className="float-right"><i className="fa fa-angle-right"></i></span>
              </Link>
            </div>
          </div>

          {/* Orders */}
          <div className="col-xl-3 col-sm-6 mb-4">
            <div className="card shadow-lg gradient-success h-100">
              <div className="card-body text-center">
                <h5 className="text-white">Orders</h5>
                <h2 className="text-white">{adminOrders.length}</h2>
              </div>
              <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                <span className="float-left">View Details</span>
                <span className="float-right"><i className="fa fa-angle-right"></i></span>
              </Link>
            </div>
          </div>

          {/* Users */}
          <div className="col-xl-3 col-sm-6 mb-4">
            <div className="card shadow-lg gradient-success h-100">
              <div className="card-body text-center">
                <h5 className="text-white">Users</h5>
                <h2 className="text-white">{users.length}</h2>
              </div>
              <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                <span className="float-left">View Details</span>
                <span className="float-right"><i className="fa fa-angle-right"></i></span>
              </Link>
            </div>
          </div>

          {/* Out of Stock */}
          <div className="col-xl-3 col-sm-6 mb-4">
            <div className="card shadow-lg gradient-success h-100">
              <div className="card-body text-center">
                <h5 className="text-white">Out of Stock</h5>
                <h2 className="text-white">{outOfStock}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
