import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions"; 
import MetaData from "../layouts/Meta";  
import Loader from "../layouts/Loader";  
import Product from "./product"; 
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import Tooltip from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap.css';

export default function Shop() {
  const dispatch = useDispatch();
  const { products, loading, productsCount, resPerPage } = useSelector(state => state.productsState);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const setCurrentPageNo = (pageNo) => setCurrentPage(pageNo);

  useEffect(() => {
    dispatch(getProducts(null, priceChanged, currentPage, category));
  }, [dispatch, currentPage, priceChanged, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Shop" />
          <h1 id="products_heading">Shop Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {/* --- Filters Section --- */}
              <div className="col-6 col-md-3 mb-5 mt-5">
                <div className="px-5 p-4 shadow-sm rounded border"style={{ background: "#f9f9f9" }}
                    onMouseUp={() => setPriceChanged(price)}>
                  <h5 className="fw-bold text-primary">Filter by Price</h5>
                  <Slider
                    range
                    marks={{ 1: "Rs.1", 1000000: "Rs.1000000" }}
                    min={1}
                    max={1000000}
                    defaultValue={price}
                    onChange={(price) => setPrice(price)}
                    handleRender={(renderProps) => (
                      <Tooltip overlay={`Rs.${renderProps.props['aria-valuenow']}`}>
                        <div {...renderProps.props}
                           ></div>
                      </Tooltip>
                    )}
                  />
                </div>

                <hr className="my-5" />

                <div className="mt-5">
                  <h3 className="mb-3 text-secondary fw-bold">Categories</h3>
                  <ul className="pl-0">
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        style={{ cursor: "pointer", listStyleType: "none", padding: "4px 10px",
                         marginBottom: "6px", borderRadius: "6px", transition: "all 0.3s ease", }} className="hover-category"
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* --- Products Section --- */}
              <div className="col-6 col-md-9">
                <div className="row">
                  {products && products.map((product) => (
                    <Product col={4} key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- Pagination --- */}
          {productsCount > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
