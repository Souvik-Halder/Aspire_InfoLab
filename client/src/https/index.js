
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

export default api;
