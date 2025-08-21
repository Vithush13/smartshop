import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions"; 
import MetaData from "../layouts/Meta";  
import Loader from "../layouts/Loader";  
import Product from "./product"; 
import Pagination from "react-js-pagination";


export default function Shop() {
  const dispatch = useDispatch();
  const { products, loading, productsCount, resPerPage } = useSelector(state => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => setCurrentPage(pageNo);

  useEffect(() => {
    dispatch(getProducts(null, null, currentPage, null));
  }, [dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Shop" />

          {/* --- Latest Products Section (Existing Code) --- */}
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product => (
                <Product col={3} key={product._id} product={product} />
              ))}
            </div>
          </section>

          {/* --- Pagination --- */}
          {productsCount > 0 && productsCount > resPerPage && (
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
