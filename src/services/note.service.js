import axios from "axios";
const BASE_URL = "http://bootapi/"

export function getTodaysNote() {
    return axios.get(BASE_URL + "user/note/date", {
        withCredentials: true, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}
export function saveTodaysNote(noteDetails) {
    return axios.post(BASE_URL + "admin/note/save", noteDetails, {
        withCredentials: true, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}
export function getAllNotes() {
    return axios.get(BASE_URL + "admin/note/all", {
        withCredentials: true, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}