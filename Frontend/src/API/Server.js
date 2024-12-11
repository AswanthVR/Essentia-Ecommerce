import axios from 'axios';
import { getAuthorizationHeaders, getToken } from '../Security/TokenManager';
import toast from 'react-hot-toast';
import API from './ApiUrl';
import { useEffect } from 'react';
const BASE_URL = 'http://localhost:8080';

export const fetchCartCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/carts/user/${localStorage.getItem('uid')}`, {
      headers: {
        'Authorization': `Bearer ${getToken('token')}`
      }
    });
    return response.data.length;
  } catch (error) {
    throw new Error(`Error fetching cart count: ${error.message}`);
  }
};


export const addToCart = async (product) => {
  console.log(product)
  axios.post("http://localhost:8080/api/carts",
  {
    quantity:1,
    product:{
        productId:product.productId
    },
    user:{
        uid:localStorage.getItem('uid'),
        role:"USER"
    }},
  {
    headers: {
      'Authorization':`Bearer ${getToken('token')}` 
    }
  }
  ).then((response)=>{
      console.log(response.data);
      toast.success('Added to cart');
  fetchCartCount()  
  })
  .catch((error)=>{
    console.log(error);
  }) 
};

 
export const fetchWishListCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/wishlist/user/${localStorage.getItem('uid')}`, {
      headers: {
        'Authorization': `Bearer ${getToken('token')}`
      }
    });
    return response.data.length;
  } catch (error) {
    throw new Error(`Error fetching cart count: ${error.message}`);
  }
};

export const addToWishList = async (product) => {
  console.log(product)
  axios.post("http://localhost:8080/api/wishlist",
{
    product:{
        productId:product.productId
    },
    user:{
        uid:localStorage.getItem('uid'),
        role:"USER"
    }},
  {
    headers: {
      'Authorization':`Bearer ${getToken('token')}` 
    }
  }
  ).then((response)=>{
      console.log(response.data);
      toast.success('Added to Your WishList');
  fetchWishListCount()  
  })
  .catch((error)=>{
    console.log(error);
  }) 
};

 

export const getCartItems =  (id) => {
  console.log(id)
  
};


export const getOrders = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:8080/orders/get/${uid}`, {
      headers: {
        'Authorization':`Bearer ${getToken('token')}` 
      }
    });
    console.log(response.data);
    console.log("orders");
    if(response.data.length>0){
      return response.data;
    }
    else{
      return 0;
    }
  } catch (error) {
    console.log(error);
  }

};