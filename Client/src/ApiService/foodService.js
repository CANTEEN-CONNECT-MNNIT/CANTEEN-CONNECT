import axios from 'axios';
import { baseUrl } from './baseUrl';
import { Store } from '../Redux/Store.js';
import { logout } from '../Redux/Slices/UserSlice.jsx';

class FoodService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'item/',
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

  additem = async (data, canteenId) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await this.api.post(`create/${canteenId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      });
      console.log('itemApi/additem: ', response);
      if (response) {
        return response?.data?.data?.newitem;
      }
    } catch (error) {
      console.log('itemApi/additem: ', error);
      throw error;
    }
  };

  updateitem = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await this.api.patch(`update/${data?._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      });
      console.log('itemApi/updateitem: ', response);
      if (response) {
        return response?.data?.data?.updateditem;
      }
    } catch (error) {
      console.log('itemApi/updateitem: ', error);
      throw error;
    }
  };

  getAll = async (data) => {
    try {
      const query = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== '')
      );
      console.log(query);

      const response = await this.api.get('getall', { params: query });
      console.log('itemApi/getAll: ', response);
      if (response) {
        return response?.data?.data?.allitems;
      }
    } catch (error) {
      console.log('itemApi/getAll: ', error);
      throw error;
    }
  };

  get = async (_id) => {
    try {
      const response = await this.api.get(`get/${_id}`);
      console.log('itemApi/get: ', response);
      if (response) {
        return response?.data?.data?.reqitem;
      }
    } catch (error) {
      console.log('itemApi/get: ', error);
      throw error;
    }
  };

  deleteitem = async (data) => {
    try {
      const response = await this.api.delete(`delete/${data?._id}`);
      console.log('itemApi/deleteitem: ', response);
      return response?.status === 201;
    } catch (error) {
      console.log('itemApi/deleteitem: ', error);
      throw error;
    }
  };
}

const foodService = new FoodService(baseUrl);

export default foodService;
