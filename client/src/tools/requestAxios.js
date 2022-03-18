import axios from "axios";
import {getToken} from "./tokenTools.js";

const axiosInterceptors = () =>{
    axios.interceptors.request.use((config) =>{
        const token = getToken("token");
        if(token){
            config.headers.authorization = token;
        }
        return config;
    });
};

export default axiosInterceptors;