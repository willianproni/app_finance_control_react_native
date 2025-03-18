import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";


const api = axios.create({
    baseURL: "http://10.0.2.2:5000/",
})

api.interceptors.request.use(async (config: any) => {
    let newConfig = config
    try {
        const token = await AsyncStorage.getItem('@token')
        if (token) {
            newConfig.headers.Authorization = `Bearer ${token}`
        }else{
            
        }
        return newConfig
    } catch (error) {
        return error
    }
})

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401){
            return Promise.reject(error)
        }
        if(error.response.status === 403){
            return Promise.reject(error.response.status)
        }
    }
)

export default api;