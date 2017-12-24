import axios from "axios";
const BASE_URL = "http://bootapi/"

export function getAllPredefinedNotes() {
    return axios.get(BASE_URL + "admin/predefnotes/get", {
        withCredentials: true, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}
export function saveAllPredefinedNotes(preDefNotesDetails) {
    return axios.post(BASE_URL + "admin/predefnotes", preDefNotesDetails, {
        withCredentials: true, headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}