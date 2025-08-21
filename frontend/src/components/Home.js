import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsActions";
import MetaData from "./layouts/Meta";
import Loader from "./layouts/Loader";
import { Carousel, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.productsState);
  const [currentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts(null, null, currentPage, null));
  }, [dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Buy Products" />

          {/* --- Banner Carousel with Styled Text --- */}
          <Container fluid className="p-0 mt-5 position-relative">
            {/* Welcome Text Above Carousel */}
            <div className="text-center py-5 bg-light">
              <h2 className="display-4 font-weight-bold mb-3" style={{ color: "#333" }}>
                Welcome to <span style={{ color: "#007bff" }}>SmartShop</span>
              </h2>
              <p className="lead mx-auto" style={{ maxWidth: "700px", color: "#555" }}>
                Your one-stop online store for electronics, fashion, books, home appliances, and more. 
                Top-quality products, best prices, fast delivery, and excellent support.
              </p>
            </div>

            {/* Carousel */}
            <Carousel>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img
                    className="d-block w-100"
                    src="/images/banner1.jpg"
                    alt="First slide"
                    style={{ maxHeight: "450px", objectFit: "cover", filter: "brightness(70%)" }}
                  />
                  <Carousel.Caption
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  >
                    <h3 className="display-5 font-weight-bold text-white text-shadow">
                      SmartShop Deals
                    </h3>
                    <p className="lead text-white text-shadow">
                      Get your favorite products at amazing prices!
                    </p>
                    <Button variant="primary" size="lg" onClick={() => navigate("/shop")}>
                      Shop Now
                    </Button>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img
                    className="d-block w-100"
                    src="/images/banner2.jpg"
                    alt="Second slide"
                    style={{ maxHeight: "450px", objectFit: "cover", filter: "brightness(70%)" }}
                  />
                  <Carousel.Caption
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  >
                    <h3 className="display-5 font-weight-bold text-white text-shadow">
                      Latest Arrivals
                    </h3>
                    <p className="lead text-white text-shadow">
                      Check out the newest products in our store.
                    </p>
                    <Button variant="primary" size="lg" onClick={() => navigate("/shop")}>
                      Explore
                    </Button>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            </Carousel>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}
