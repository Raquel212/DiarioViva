import axios from "axios";

const api = axios.create({
    baseURL: "https://saude-conectada-api.onrender.com/api/",
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
});

export default api;