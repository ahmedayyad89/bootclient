import axios from "axios";
const BASE_URL = "http://localhost:8080/save/user"

export function register(credentials)
{
   return axios.post(BASE_URL,credentials,{withCredentials: false, headers: {'X-Requested-With': 'XMLHttpRequest'}});
}