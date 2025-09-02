import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0f2a4a, #102c4c)",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "50px",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-left align-items-start">
          {/* Brand / About */}
          <div className="col-md-6 mb-4">
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
              }}
            >
              <span style={{ color: "#f8f9fa" }}>Smart</span>
              <span style={{ color: "#1abc9c" }}>Shop</span>
            </h3>
            <p style={{ color: "#ccc", fontSize: "0.95rem" }}>
              Your one-stop online store for fashion, electronics, and more.  
              We deliver quality products with fast service.
            </p>
          </div>

          {/* Contact & Social */}
          <div className="col-md-6 mb-4 text-center text-md-right">
            <h5 className="mb-3" style={{ color: "#1abc9c" }}>
              Get in Touch
            </h5>
            <p style={{ margin: 0 }}>
              <FaEnvelope className="mr-2" /> support@smartshop.com
            </p>
            <div className="mt-3">
              <a
                href="#"
                className="text-white mr-3"
                style={{ fontSize: "1.2rem" }}
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white mr-3"
                style={{ fontSize: "1.2rem" }}
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white"
                style={{ fontSize: "1.2rem" }}
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Copyright */}
        <div
          className="text-center"
          style={{ color: "#ccc", fontSize: "0.9rem" }}
        >
          © {new Date().getFullYear()} SmartShop | Designed By Vithush
        </div>
      </div>
    </footer>
  );
}
