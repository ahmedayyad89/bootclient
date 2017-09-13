import axios from "axios";
const BASE_URL = "http://localhost:8080/"

export function getAllPreDefs()
{
    return axios.get(BASE_URL+"admin/predefnotes/get", {withCredentials: true, headers: {'X-Requested-With': 'XMLHttpRequest'}});
}
export function saveAllPreDefs(preDefNotesDetails)
{
    console.log(preDefNotesDetails);
    return axios.post(BASE_URL+"admin/predefnotes", preDefNotesDetails, {withCredentials: true, headers: {'X-Requested-With': 'XMLHttpRequest'}});
}