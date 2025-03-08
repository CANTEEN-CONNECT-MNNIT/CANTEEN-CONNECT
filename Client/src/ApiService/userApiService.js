import axios from 'axios';
import { baseUrl } from './baseUrl';
import { Store } from '../Redux/Store.js';
import { logout } from '../Redux/Slices/UserSlice.jsx';

class UserService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'user/',
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

  logout = async () => {
    try {
      const response = await this.api.get('logout');
      console.log('userApi/logout: ', response);
      if (response) {
        return true;
      } else return false;
    } catch (error) {
      console.log('userApi/logout: ', error);
      throw error;
    }
  };

  update = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await this.api.patch(`/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      });
      console.log('userApi/update: ', response);
      if (response) {
        return response?.data?.data?.updateduser;
      } else return false;
    } catch (error) {
      console.log('userApi/update: ', error);
      throw error;
    }
  };

  getMe = async () => {
    try {
      const response = await this.api.get('me');
      console.log('userApi/getMe: ', response);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log('userApi/getMe: ', error);
      throw error;
    }
  };

  deleteUser = async (data) => {
    try {
      const response = await this.api.delete(`delete/${data?._id}`);
      console.log('userApi/deleteUser: ', response);
      if (response) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('userApi/deleteUser: ', error);
      throw error;
    }
  };

  getFavourites = async () => {
    try {
      const response = await this.api.get(`favourite`);
      console.log('userApi/getFavourite: ', response);
      if (response) {
        return response?.data?.data;
        //array of items
      }
      return false;
    } catch (error) {
      console.log('userApi/getFavourite: ', error);
      throw error;
    }
  };

  removeFavourite = async (data) => {
    //_id:item_id
    try {
      const response = await this.api.patch(`removefavourite`, data);
      console.log('userApi/removeFavourite: ', response);
      if (response) {
        return response.data?.data;
        // newuser
      }
      return false;
    } catch (error) {
      console.log('userApi/removeFavourite: ', error);
      throw error;
    }
  };
  addFavourite = async (data) => {
    //_id:item_id
    try {
      const response = await this.api.patch(`addfavourite`, data);
      console.log('userApi/addFavourite: ', response);
      if (response) {
        return response.data?.data;
        //updated user
      }
      return false;
    } catch (error) {
      console.log('userApi/addFavourite: ', error);
      throw error;
    }
  };
}

const userService = new UserService(baseUrl);

export default userService;
