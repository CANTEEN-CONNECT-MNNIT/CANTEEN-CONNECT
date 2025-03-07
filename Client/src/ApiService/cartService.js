import axios from 'axios';
import { baseUrl } from './baseUrl';
import { Store } from '../Redux/Store.js';
import { logout } from '../Redux/Slices/UserSlice.jsx';

class CartService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'cart/',
      timeout: 5000,
      withCredentials: true,
    });

    // Add Response Interceptor
    this.api.interceptors.response.use(
    (response) => response, // Pass successful responses
    (error) => {
      if (error?.response && error.response?.status === 401) {
        console.warn('Unauthorized! Logging out user...');
        Store.dispatch(logout()); // Dispatch logout action
      }
      return Promise.reject(error); // Reject error for further handling
    }
  );
  }

  updateCart = async (data) => {
    try {
      const response = await this.api.patch(`update/${data?._id}`);
      console.log('cartApi/updateCart: ', response);
      if (response) {
        return response?.data?.data;
        //updated cart,
      } else return false;
    } catch (error) {
      console.log('cartApi/updateCart: ', error);
      throw error;
    }
  };

  get = async () => {
    try {
      const response = await this.api.get(`get`);
      console.log('cartApi/get: ', response);
      if (response) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log('cartApi/get: ', error);
      throw error;
    }
  };

  deleteCart = async (data) => {
    try {
      const response = await this.api.delete(`delete/${data?._id}`);
      console.log('cartApi/deleteCart: ', response);
      if (response) {
        return response?.data?.data?.cart; //updated cart
      }
      return false;
    } catch (error) {
      console.log('cartApi/deleteCart: ', error);
      throw error;
    }
  };

  createOrder = async () => {
    try {
      const response = await this.api.get(`order`);
      console.log('cartApi/createOrder: ', response);
      if (response) {
        return response?.data;
      }
      return false;
    } catch (error) {
      console.log('cartApi/createOrder: ', error);
      throw error;
    }
  };
}

const cartService = new CartService(baseUrl);

export default cartService;
