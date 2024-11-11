import axios from "axios";
import { baseUrl } from './baseUrl'

class CartService{
    constructor(baseUrl) {
        this.api = axios.create({
          baseURL: baseUrl+"cart/",
          timeout: 5000,
          withCredentials: true,
    });
    }

    async updateCart(data){
        try {
            const response=await this.api.patch(`update/${data?._id}`,data);
            console.log("cartApi/updateCart: ",response);
            if(response){
                return response?.data?.carts;
            }
            else return false;
        } catch (error) {
            console.log("cartApi/updateCart: ",error);
            throw error;
        }
    }

    async get(){
        try {
            const response=await this.api.get(`get`);
            console.log("cartApi/get: ",response);
            if(response){
                return response?.data?.data?.cart;
            }
        } catch (error) {
            console.log("cartApi/get: ",error);
            throw error;
        }
    }

    async deleteCart(data){
        try {
            const response=await this.api.delete(`delete/${data?._id}`);
            console.log("cartApi/deleteCart: ",response);
            if(response){
                return response?.data?.newcart;//updated cart
            }
            return false;
        } catch (error) {
            console.log("cartApi/deleteCart: ",error);
            throw error;
        }
    }

    async createOrder(){
        try {
            const response=await this.api.get(`order`);
            console.log("cartApi/createOrder: ",response);
            if(response){
                return response?.data;
            }
            return false;
        } catch (error) {
            console.log("cartApi/createOrder: ",error);
            throw error;
        }
    }
    

}

const cartService=new CartService(baseUrl);

export default cartService;