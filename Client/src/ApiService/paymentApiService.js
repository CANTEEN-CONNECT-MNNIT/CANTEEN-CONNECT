import axios from 'axios';
import { baseUrl } from './baseUrl';

class PaymentService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl + 'payment/',
      timeout: 5000,
      withCredentials: true,
    });
  }

  async getClientToken() {
    try {
      const response = await this.api.get('generate/token');
      console.log('paymentapi/generatetoken', response);
      if (response) {
        return response?.data?.response;
      }
    } catch (error) {
      console.log('payment/generatetoken', error);
      throw error;
    }
  }

  async processpayment(data) {
    try {
      const response = await this.api.post('/process/payment', data);
      console.log('payment/processpayment:', response);
      if (response) {
        return response?.data?.response;
      }
    } catch (error) {
      console.log('payment/process:', error);
      throw error;
    }
  }
}

const paymentservice = new PaymentService(baseUrl);

export default paymentservice;
