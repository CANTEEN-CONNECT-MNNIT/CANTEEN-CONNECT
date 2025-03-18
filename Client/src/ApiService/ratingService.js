import axios from 'axios';
import { baseUrl } from './baseUrl';
import { Store } from '../Redux/Store.js';
import { logout } from '../Redux/Slices/UserSlice.jsx';

class RatingService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'rating/',
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

  getAll = async (data) => {
    //required: _id:canteen_id
    //query: page,limit
    const { page = 1, limit = 5 } = data || {};
    try {
      const response = await this.api.get(`all/${data?._id}`,{
        params: {page,limit}
      });
      console.log('ratingApi/getAll: ', response);
      if (response) {
        return response?.data?.data;
        //all review of items
      }
    } catch (error) {
      console.log('ratingApi/getAll: ', error);
      throw error;
    }
  };

  updateReview = async (data) => {
    //required: rating_id
    try {
      const response = await this.api.patch(`update/${data?._id}`, data);
      console.log('ratingApi/updateReview: ', response);
      if (response) {
        return response?.data?.updatedreview;
        //updatedReview
      }
    } catch (error) {
      console.log('ratingApi/updateReview: ', error);
      throw error;
    }
  };

  addReview = async (data) => {
    // required: canteen_id
    try {
      const response = await this.api.post(`create/${data?._id}`,data);
      console.log('ratingApi/addReview: ', response);
      if (response) {
        return response?.data?.data;
        // review
      }
    } catch (error) {
      console.log('ratingApi/addReview: ', error);
      throw error;
    }
  };

  deleteReview = async (data) => {
    //required: rating_id
    try {
      const response = await this.api.delete(`delete/${data?._id}`);
      console.log('ratingApi/deleteReview: ', response);
      if (response) {
        return response?.status===201;
      }
    } catch (error) {
      console.log('ratingApi/deleteReview: ', error);
      throw error;
    }
  };
  
  foodRatings = async (data) => {
    //required: array of fooditem_id:rating->  fooditem_ratings
    try {
      const response = await this.api.post(`fooditem_rating`,data);
      console.log('ratingApi/foodRatings: ', response);
      if (response) {
        return response?.status===201;
      }
    } catch (error) {
      console.log('ratingApi/foodRatings: ', error);
      throw error;
    }
  };
}

const ratingService = new RatingService(baseUrl);

export default ratingService;
