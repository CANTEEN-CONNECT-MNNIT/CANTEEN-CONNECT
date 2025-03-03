import axios from "axios";
import { baseUrl } from './baseUrl'

class ApiService{
    constructor(baseUrl) {
        this.api = axios.create({
          baseURL: baseUrl+"auth/",
          timeout: 5000,
          withCredentials: true,
    });
    }

    login=async (data)=> {
        try {
            const response=await this.api.post("login",data);
            console.log("authApi/login: ",response);
            return response?.data?.data;
        } catch (error) {
            console.log("authApi/login: ",error);
            throw error;
        }
    }

    signup=async (data)=> {
        try {
            const response=await this.api.post("signup",data);
            console.log("authApi/signup: ",response);
            return response?.data?.data;
        } catch (error) {
            console.log("authApi/signup: ",error);
            throw error;
        }
    }

}

const authService=new ApiService(baseUrl);

export default authService;