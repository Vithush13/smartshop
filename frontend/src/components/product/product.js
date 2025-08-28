import { Link } from "react-router-dom";
import { FaShoppingCart} from "react-icons/fa";

export default function Product({product,col}){
    return(
                         <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                         <div className="card product-card shadow-sm border-0 rounded-3 overflow-hidden h-100 p-3">
                                {/* Image Section */}
                               <div className="position-relative">
                <img
            src={product.images[0].image}
            alt={product.name}
            className="card-img-top"
          />
          <span className="badge bg-success price-badge">
            Rs.{product.price}
          </span>
        </div>
                          <div className="card-body d-flex flex-column">
                             <h5 className="card-title ">
                                <Link to={`/product/${product._id}` }>{product.name}</Link>
                             </h5>
                              <div className="ratings mt-auto pb-2">
                                 <div className="rating-outer">
                                <div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}></div>
                                </div>
                              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                          </div>
         <div className="mt-auto d-flex">
  <Link
    to={`/product/${product._id}`}
    className="btn btn-outline-primary rounded-pill"
    style={{ flex: 1 }}
  >
    View Details
  </Link>
 
</div>

                        
                          </div>
                         </div>
                         </div>
               
    )
}
        