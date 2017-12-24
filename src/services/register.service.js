import axios from "axios";
const BASE_URL = "http://bootapi/save/user"

export function register(userData) {
    return axios.post(BASE_URL, userData, {
        withCredentials: false, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}