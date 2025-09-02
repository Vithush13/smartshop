import axios from 'axios';
import { productRequest, productSuccess,productFail } from '../slices/productSlice';
import { createReviewFail,createReviewSuccess,createReviewRequest } from '../slices/productSlice';

export const getProduct = (id) => async (dispatch)=>{

    try{
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    }catch(error){
        //handle error
        dispatch(productFail(error.response.data.message))
    }
    
}


export const createReview = reviewData => async (dispatch) => {

    try {  
        dispatch(createReviewRequest()) 
        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        }
        const { data }  =  await axios.put(`/api/v1/review`,reviewData, config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        //handle error
        dispatch(createReviewFail(error.response.data.message))
    }
    
}