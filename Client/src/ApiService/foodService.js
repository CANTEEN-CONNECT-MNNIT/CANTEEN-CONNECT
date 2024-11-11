import axios from "axios";
import { baseUrl } from './baseUrl'

class FoodService{
    constructor(baseUrl) {
        this.api = axios.create({
          baseURL: baseUrl+"item/",
          timeout: 5000,
          withCredentials: true,
    });
    }

    async additem(data,canteenId) {
        try {
            const response=await this.api.post(`create/${canteenId}`,data);
            console.log("itemApi/additem: ",response);
            if(response){
                return response?.data?.data?.newitem;
            }
        } catch (error) {
            console.log("itemApi/additem: ",error);
            throw error;
        }
    }

    async updateitem(data){
        try {
            const response=await this.api.patch(`update/${data?._id}`,data);
            console.log("itemApi/updateitem: ",response);
            if(response){
                return response?.data?.data?.updateditem;
            }
        } catch (error) {
            console.log("itemApi/updateitem: ",error);
            throw error;
        }
    }

    async getAll(){
        try {
            const response=await this.api.get("getall");
            console.log("itemApi/getAll: ",response);
            if(response){
                return response?.data?.allitems;
            }
        } catch (error) {
            console.log("itemApi/getAll: ",error);
            throw error;
        }
    }

    async get(_id){
        try {
            const response=await this.api.get(`get/${_id}`);
            console.log("itemApi/get: ",response);
            if(response){
                return response?.data?.data?.reqitem;
            }
        } catch (error) {
            console.log("itemApi/get: ",error);
            throw error;
        }
    }

    async deleteitem(data){
        try {
            const response=await this.api.delete(`delete/${data?._id}`);
            console.log("itemApi/deleteitem: ",response);
            return response?.status===201;
        } catch (error) {
            console.log("itemApi/deleteitem: ",error);
            throw error;
        }
    }
    

}

const foodService=new FoodService(baseUrl);

export default foodService;