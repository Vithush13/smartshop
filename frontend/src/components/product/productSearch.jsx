import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import MetaData from "../layouts/Meta";
import Loader from "../layouts/Loader";
import Product from "./product";
import  Pagination  from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import  Tooltip  from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap.css'



export default function ProductSearch() {
  const dispatch = useDispatch();
  const{products,loading,productsCount,resPerPage} = useSelector((state)=> state.productsState)
  const[currentPage,setCurrentPage] = useState(1);
  const[price,setPrice] = useState([1,1000]);
  const[priceChanged,setPriceChanged] = useState(price);
  const[category,setCategory] = useState(null);
  const {keyword} = useParams();
  const categories = [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
  ];
  console.log(currentPage)
  const setCurrentPageNo = (pageNo) =>{
    setCurrentPage(pageNo)
  }
  useEffect(()=>{
    
    dispatch(getProducts(keyword,priceChanged,currentPage,category))    //sent request
  },[dispatch,currentPage,keyword,priceChanged,category]);    //dependecies
    return(
      <Fragment>
        {loading? <Loader/>:
            <Fragment>
                <MetaData title={'Buy Products'}/>
                    <h1 id="products_heading">Search Products</h1>
        
                  <section id="products" className="container mt-5">
                      <div className="row">
                        <div className="col-6 col-md-3 mb-5 mt-5">
                          <div className="px-5" onMouseUp={()=>setPriceChanged(price)}>
                            <Slider
                                range={true}
                                marks={
                                  {
                                    1:"$1",
                                    1000:"$1000"
                                  }
                                }
                                min={1}
                                max={1000}
                                defaultValue={price}
                                onChange={(price)=>{
                                  setPrice(price)
                                }}
                                handleRender={
                                  renderProp =>{
                                    return(
                                      <Tooltip overlay={`$${renderProp.props['aria-valuenow']}`}>
                                         <div{...renderProp.props}></div>
                                      </Tooltip>
                                    )
                                  }
                                }
                                />

                          </div>
                          <hr className="my-5"/>
                           <div className="mt-5">
                              <h3 className="mb-3">Categories</h3>
                              <ul className="pl-0">
                                {categories.map(category=>
                                <li style={{
                                  cursor:"pointer",
                                  listStyleType:"none"
                                }}
                                key={category}
                                onClick={() => setCategory(category)}
                                
                                >
                                  {category}
                                </li>
                              )}
                              </ul>
                           </div>
                        </div>
                        <div className="col-6 col-md-9">
                          <div className="row">
                          {products && products.map(product=>(
                                 <Product col={4} key={product._id} product={product}/>
                          ))}

                          </div>
                        </div>
                       </div>
                   </section>
                   {productsCount >0 && productsCount > resPerPage ?
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

                   </div> :null}
                   
          
              </Fragment>
            
        }
        </Fragment>
    )  
    }
  