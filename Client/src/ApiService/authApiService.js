import axios from 'axios';
import { baseUrl } from './baseUrl';

class ApiService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'auth/',
      timeout: 5000,
      withCredentials: true,
    });
  }

  login = async (data) => {
    //required: email and password
    try {
      const response = await this.api.post('login', data);
      console.log('authApi/login: ', response);
      return response?.data?.data?.user;
    } catch (error) {
      console.log('authApi/login: ', error);
      throw error;
    }
  };

  // signing up the user
  signup = async (data) => {
    try {
      const response = await this.api.post('signup', data);
      console.log('authApi/signup: ', response);
      return response?.data?.data?.user;
    } catch (error) {
      console.log('authApi/signup: ', error);
      throw error;
    }
  };

  // forgot password call
  userForgotPassword = async (data) => {
    //email
    try {
      const response = await this.api.post('forgotpassword', data, {
        timeout: 60000,
      });

      console.log(response);
      return response.status === 200;
    } catch (error) {
      console.error('Error authService: userForgotPassword: ', error);
      throw error;
    }
  };

  // reset password call
  userResetPassword = async (data) => {
    // resetToken, password, confirmpassword
    try {
      const response = await this.api.post('/resetpassword', data);

      console.log(response);
      return response.data?.data?.user;
    } catch (error) {
      console.error('Error authService: userResetPassword: ', error);
      throw error;
    }
  };
}

const authService = new ApiService(baseUrl);

export default authService;
