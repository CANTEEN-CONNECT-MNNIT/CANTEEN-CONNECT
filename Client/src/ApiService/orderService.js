import axios from 'axios';
import { baseUrl } from './baseUrl';

class OrderService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'order/',
      timeout: 5000,
      withCredentials: true,
    });
  }

  addOrder = async (data) => {
    // { allitemsbycanteen}
    try {
      const response = await this.api.post('create', data);
      console.log('orderApi/addOrder: ', response);
      if (response) {
        return response?.data?.data;
        // orders array of user_id,canteen_id,item
      }
      return false;
    } catch (error) {
      console.log('orderApi/addOrder: ', error);
      throw error;
    }
  };

  updateOrder = async (data) => {
    console.log(data);
    // _id:order_id, status
    try {
      const response = await this.api.patch(`update/${data?._id}`, data);
      console.log('orderApi/updateOrder: ', response);
      if (response) {
        return response?.data?.data?.updatedcanteen;
      } else return false;
    } catch (error) {
      console.log('orderApi/updateOrder: ', error);
      throw error;
    }
  };

  getOrder = async () => {
    try {
      const response = await this.api.get('all');
      console.log('orderApi/getOrder: ', response);
      if (response) {
        return response?.data?.data;
        //array of orders
      }
    } catch (error) {
      console.log('orderApi/getOrder: ', error);
      throw error;
    }
  };
}

const orderService = new OrderService(baseUrl);

export default orderService;
