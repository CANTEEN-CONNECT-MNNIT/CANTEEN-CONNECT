import axios from 'axios';
import { baseUrl } from './baseUrl';

async function getExchangeRate() {
  const response = await axios.get(
    'https://api.exchangerate-api.com/v4/latest/INR'
  );
  return response.data.rates.USD;
}
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
        return response?.data?.data?.response;
      }
    } catch (error) {
      console.log('payment/generatetoken', error);
      throw error;
    }
  }

  async processpayment(data) {
    try {
      const exchangeRate = await getExchangeRate('INR', 'USD');
      const convertedAmount = data.total_amount * exchangeRate;
      const newdata = { ...data, total_amount: convertedAmount.toFixed(2) };
      const response = await this.api.post('/process/payment', newdata);
      console.log('payment/processpayment:', response);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log('payment/process:', error);
      throw error;
    }
  }
}

const paymentservice = new PaymentService(baseUrl);

export default paymentservice;
