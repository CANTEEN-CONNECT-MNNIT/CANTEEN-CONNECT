import axios from "axios";
import { baseUrl } from './baseUrl'

class CanteenService{
    constructor(baseUrl) {
        this.api = axios.create({
          baseURL: baseUrl+"canteen/",
          timeout: 5000,
          withCredentials: true,
    });
    }

    async addCanteen(data) {
        try {
            const response=await this.api.post("addCanteen",data);
            console.log("canteenApi/addCanteen: ",response);
            if(response){
                return response?.data?.data;
            }
        } catch (error) {
            console.log("canteenApi/addCanteen: ",error);
            throw error;
        }
    }

    async updateCanteen(data){
        try {
            const response=await this.api.patch(`update/${data?._id}`,data);
            console.log("canteenApi/updateCanteen: ",response);
            if(response){
                return response?.data;
            }
            else return false;
        } catch (error) {
            console.log("canteenApi/updateCanteen: ",error);
            throw error;
        }
    }

    async getAll(){
        try {
            const response=await this.api.get("getall");
            console.log("canteenApi/getAll: ",response);
            if(response){
                return response?.data;
            }
        } catch (error) {
            console.log("canteenApi/getAll: ",error);
            throw error;
        }
    }

    async get(_id){
        try {
            const response=await this.api.get(`get/${_id}`);
            console.log("canteenApi/get: ",response);
            if(response){
                return response?.data?.data;
            }
        } catch (error) {
            console.log("canteenApi/get: ",error);
            throw error;
        }
    }

    async deleteCanteen(data){
        try {
            const response=await this.api.delete(`delete/${data?._id}`);
            console.log("canteenApi/deleteCanteen: ",response);
            if(response){
                return response?.data;
            }
            return false;
        } catch (error) {
            console.log("canteenApi/deleteCanteen: ",error);
            throw error;
        }
    }
    

}

const canteenService=new CanteenService(baseUrl);

export default canteenService;