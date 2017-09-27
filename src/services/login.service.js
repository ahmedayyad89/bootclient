import axios from "axios";
const BASE_URL = "http://localhost:80/user"

export function login(credentials) {
    return axios.get(BASE_URL + "/login", {
        withCredentials: true, auth: credentials, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}


export function logout() {
    return axios.get(BASE_URL + "/logout", {
        withCredentials: true, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}