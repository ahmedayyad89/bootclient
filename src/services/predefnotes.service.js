import axios from "axios";
const BASE_URL = "http://localhost:80/"

export function getAllPreDefs()
{
    return axios.get(BASE_URL+"admin/predefnotes/get", {withCredentials: true, headers: {'X-Requested-With': 'XMLHttpRequest'}});
}
export function saveAllPreDefs(preDefNotesDetails)
{
    return axios.post(BASE_URL+"admin/predefnotes", preDefNotesDetails, {withCredentials: true, headers: {'X-Requested-With': 'XMLHttpRequest'}});
}