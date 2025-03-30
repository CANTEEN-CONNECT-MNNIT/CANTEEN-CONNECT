import axios from 'axios';
import { baseUrl } from './baseUrl';
import { Store } from '../Redux/Store.js';
import { logout } from '../Redux/Slices/UserSlice.jsx';

class CanteenService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'canteen/',
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

  addCanteen = async (data) => {
    // name, description, canteenId, phone
    try {
      const response = await this.api.post('create', data);
      console.log('canteenApi/addCanteen: ', response);
      if (response) {
        return response?.data?.data;
        // newcanteen, updateduser
      }
      return false;
    } catch (error) {
      console.log('canteenApi/addCanteen: ', error);
      throw error;
    }
  };

  updateCanteen = async (data) => {
    // name, description, phone, _id:canteen
    console.log(data);

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
      console.log('canteenApi/updateCanteen: ', response);
      if (response) {
        return response?.data?.data?.updatedcanteen;
      } else return false;
    } catch (error) {
      console.log('canteenApi/updateCanteen: ', error);
      throw error;
    }
  };

  // Get current user canteen data
  getCanteen = async () => {
    try {
      const response = await this.api.get('getall');
      console.log('canteenApi/getAll: ', response);
      if (response) {
        return response?.data;
        // data: user_canteen, trending_items
      }
    } catch (error) {
      console.log('canteenApi/getAll: ', error);
      throw error;
    }
  };

  get = async (_id) => {
    // _id: canteenid
    try {
      const response = await this.api.get(`get/${_id}`);
      console.log('canteenApi/get: ', response);
      if (response) {
        return response?.data?.data?.reqcanteen;
        // getting current user canteen
      }
    } catch (error) {
      console.log('canteenApi/get: ', error);
      throw error;
    }
  };

  deleteCanteen = async (data) => {
    // c_id: canteen id
    try {
      const response = await this.api.delete(`delete/${data?._id}`);
      console.log('canteenApi/deleteCanteen: ', response);
      if (response) {
        return response?.data;
      }
      return false;
    } catch (error) {
      console.log('canteenApi/deleteCanteen: ', error);
      throw error;
    }
  };

  getCanteenData = async () => {
    try {
      const response = await this.api.get(`dashboard`);
      console.log('canteenApi/getCanteenData: ', response);
      if (response) {
        return response?.data?.data;
      }
      return false;
    } catch (error) {
      console.log('canteenApi/getCanteenData: ', error);
      throw error;
    }
  };

  //Mock API for testing
  getAnalyticsData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          revenue: {
            today: 12500,
            thisWeek: 85000,
            thisMonth: 320000,
            trends: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
              amount: Math.floor(Math.random() * 15000) + 8000,
            })).reverse(),
          },
          orders: {
            totalItemsSold: 425, 
            totalRevenue: 12500, // Total revenue for the day
            totalOrders: 50, // Total orders placed today
            cancelledOrders: 8, // Number of cancelled orders
            popularItems: [
              { name: "Masala Dosa", count: 156 },
              { name: "Samosa", count: 142 },
              { name: "Vada Pav", count: 128 },
              { name: "Chole Bhature", count: 98 },
              { name: "Butter Naan", count: 85 },
            ],
          },
          customers: {
            newToday: 12, // New customers today
          },
          inventory: {
            availableItems: 32,
          },
        });
      }, 1000);
    });
};

}

const canteenService = new CanteenService(baseUrl);

export default canteenService;
