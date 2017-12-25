import axios from "axios";
const BASE_URL = "https://bootapi.kmt.orange.com/save/user"

export function register(userData) {
    return axios.post(BASE_URL, userData, {
        withCredentials: false, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}