import axios from "axios";
import { baseUrl } from './baseUrl'

class UserService{
    constructor(baseUrl) {
        this.api = axios.create({
          baseURL: baseUrl+"user/",
          timeout: 5000,
          withCredentials: true,
    });
    }

    logout=async (data)=> {
        try {
            const response=await this.api.get("logout",data);
            console.log("userApi/logout: ",response);
            if(response){
                return true;
            }
            else return false;
        } catch (error) {
            console.log("userApi/logout: ",error);
            throw error;
        }
    }

    update=async (data)=>{
        try {
            const response=await this.api.patch("update",data);
            console.log("userApi/update: ",response);
            if(response){
                return true;
            }
            else return false;
        } catch (error) {
            console.log("userApi/update: ",error);
            throw error;
        }
    }

    getMe=async ()=>{
        try {
            const response=await this.api.get("me");
            console.log("userApi/getMe: ",response);
            if(response){
                return response?.data;
            }
        } catch (error) {
            console.log("userApi/getMe: ",error);
            throw error;
        }
    }


    deleteUser=async (data)=>{
        try {
            const response=await this.api.delete(`delete/${data?._id}`);
            console.log("userApi/deleteUser: ",response);
            if(response){
                return true;
            }
            return false;
        } catch (error) {
            console.log("userApi/deleteUser: ",error);
            throw error;
        }
    }
    

}

const userService=new UserService(baseUrl);

export default userService;