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

    async logout(data) {
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

    

}

const userService=new UserService(baseUrl);

export default userService;