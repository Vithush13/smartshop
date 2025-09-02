import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Hero Section with Overlay */}
      <div
        style={{
          position: "relative",
          backgroundImage: "url('/images/banner3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 20px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        ></div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              textShadow: "2px 2px 6px rgba(0,0,0,0.7)"
            }}
          >
            About SmartShop
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "700px",
              margin: "20px auto",
              lineHeight: "1.6",
              textShadow: "1px 1px 4px rgba(0,0,0,0.7)"
            }}
          >
            To become the most trusted and customer-centric e-commerce platform,
            delivering high-quality products with innovation, speed, and exceptional service.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <Container className="my-5">
  <Row className="align-items-center">
    <Col md={5} className="mb-4 mb-md-0 d-flex justify-content-center">
      <img
        src="/images/banner4.jpg"
        alt="Our Story"
        className="img-fluid rounded shadow-sm"
        style={{
          objectFit: "cover",
          maxHeight: "300px", // limit height
          width: "100%",      // responsive width
          borderRadius: "10px"
        }}
      />
    </Col>

    <Col md={7}>
      <h2 className="mb-3" style={{ color: "#0f2a4a", fontWeight: "bold" }}>
        Our Story
      </h2>
      <p style={{ color: "#555", lineHeight: "1.8" }}>
        Founded in 2025, SmartShop has become a leading e-commerce platform providing customers
        with high-quality products at the best prices. Our focus is on innovation, customer
        satisfaction, and delivering a seamless shopping experience.
      </p>
      <p style={{ color: "#555", lineHeight: "1.8" }}>
        We carefully select products across multiple categories to ensure quality and affordability.
        Our team is dedicated to helping you find what you need with speed and reliability.
      </p>
    </Col>
  </Row>
</Container>


      {/* Mission & Vision */}
      <Container className="my-5 text-center">
        <h2 className="mb-4" style={{ color: "#0f2a4a", fontWeight: "bold" }}>Mission & Vision</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="mb-4">
            <Card className="shadow-sm h-100 border-0">
              <Card.Body>
                <h3 style={{ fontWeight: "bold", color: "#1abc9c" }}>Mission</h3>
                <p>To provide a seamless, fast, and reliable online shopping experience for all customers.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <Card className="shadow-sm h-100 border-0">
              <Card.Body>
                <h3 style={{ fontWeight: "bold", color: "#1abc9c" }}>Vision</h3>
                <p>To be the most trusted and customer-friendly e-commerce platform in the region.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <Card className="shadow-sm h-100 border-0">
              <Card.Body>
                <h3 style={{ fontWeight: "bold", color: "#1abc9c" }}>Values</h3>
                <p>Integrity, Quality, Innovation, and Customer Satisfaction are at the heart of everything we do.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Why Choose Us */}
      <Container className="my-5 text-center">
        <h2 className="mb-4" style={{ color: "#0f2a4a", fontWeight: "bold" }}>Why Choose SmartShop?</h2>
        <Row className="justify-content-center">
          {[
            { icon: "🚚", title: "Fast Delivery", desc: "Receive your products quickly and safely." },
            { icon: "✅", title: "Quality Products", desc: "We ensure top-quality items for every purchase." },
            { icon: "💳", title: "Secure Payments", desc: "Your payment information is fully protected." },
            { icon: "📞", title: "24/7 Support", desc: "Our team is here to assist you anytime." },
          ].map((item, idx) => (
            <Col key={idx} xs={6} md={3} className="mb-4">
              <Card className="shadow-sm h-100 border-0 p-4">
                <h1>{item.icon}</h1>
                <h5 className="mt-3">{item.title}</h5>
                <p style={{ color: "#555" }}>{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </div>
  );
}
