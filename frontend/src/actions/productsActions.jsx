import axios from 'axios';
import { productsRequest, productsSuccess,productsFail,adminProductsFail,adminProductsRequest,adminProductsSuccess } from '../slices/productsSlice';

/*export const getProducts = async(dispatch)=>{

    try{
        dispatch(productsRequest())
        const {data} = await axios.get('/api/v1/products');
        dispatch(productsSuccess(data))
    }catch(error){
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}*/
// actions.js
export const getProducts = (keyword,price,currentPage,category) => async (dispatch) => {
    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`;
        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(price){
            link +=`&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category){
            link += `&category=${category}`
        }
        const {data} = await axios.get(link)
      //const data = await response.json();
     // dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
      dispatch(productsSuccess(data))
    } catch (error) {
     // dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error });
     dispatch(productsFail(error.response.data.message))
      
    }
  };

  export const getAdminProducts  =  async (dispatch) => {

    try {  
        dispatch(adminProductsRequest()) 
        const { data }  =  await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}

  