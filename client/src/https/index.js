
import axios from 'axios';
const REACT_APP_API_URL="http://localhost:4000/api/v1"
const api = axios.create({
    baseURL:REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    // http://localhost:5500/api/send-otp
})





//List of all the endpoints


export const login =async(data)=>api.post('/local-login',data)
export const register =async(data)=>api.post('/local-register',data)
export const loadUser=async ()=>api.get('/login/success');

export const logout=async()=>api.post('/logout')

export const uploadPost=async(data)=>api.post('/create-post',data)

export const fetchPosts=async(data)=>api.post('/allPosts',data)

export const getAllDoctorConnection=async()=>api.get('/connections/getDoctors');

export const getAllChemistConnection=async()=>api.get('/connections/getChemists');

export const getAllPatientConnection=async()=>api.get('/connections/getPatients');

export const getAllRequets=async()=>api.get('/allConnection-requests')

export const sendConnectionRequest=async(userId)=>api.post(`/sendRequest/${userId}`)

export const acceptConnection=async(requestId)=>api.post(`/accept-connection/${requestId}`)

export const getAllAcceptedConnections=async()=>api.get('/getaccepted-connection')
export default api;
