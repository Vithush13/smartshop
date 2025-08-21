import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <nav
      className="navbar row p-3"
      style={{ backgroundColor: "#0f2a4a" }} // Navbar background
    >
      {/* Brand / Logo */}
      <div className="col-12 col-md-2">
        <div className="navbar-brand">
          <Link
            to="/"
            className="text-decoration-none"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "1px",
            }}
          >
            <span style={{ color: "#f8f9fa" }}>Smart</span>
            <span style={{ color: "#1abc9c" }}>Shop</span>
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
        <Link to="/" id="navlink" className="text-light" style={{ margin: "0 20px" }}>
          Home
        </Link>
        <Link to="/shop" id="navlink" className="text-light" style={{ margin: "0 20px" }}>
          Shop
        </Link>
        <Link to="/about" id="navlink" className="text-light" style={{ margin: "0 20px" }}>
          About
        </Link>
      </div>

      {/* Search Bar */}
      <div className="col-12 col-md-3 mt-2 mt-md-0">
        <Search />
      </div>

      {/* Cart + Auth */}
      <div className="col-12 col-md-2 mt-3 mt-md-0 text-center">
        <Link to="/cart" id="cart" className="ml-3 text-light">
          Cart
        </Link>
        <span className="ml-1 " id="cart_count">
          2
        </span>

        {isAuthenticated ? (
          <Dropdown className="d-inline ml-3">
            <Dropdown.Toggle
              variant="default text-light pr-5"
              id="dropdown-basic"
            >
              <figure className="avatar avatar-nav">
                <Image
                  src={user.avatar ?? "./images/default_avatar.png"}
                  width="40"
                  height="40"
                  roundedCircle
                  style={{ objectFit: "cover", border: "2px solid #1abc9c" }}
                  alt="User Avatar"
                />
              </figure>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => navigate("/myprofile")}
                className="text-dark"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={logoutHandler}
                className="text-danger font-weight-bold"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn btn-warning ml-3" id="login_btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
