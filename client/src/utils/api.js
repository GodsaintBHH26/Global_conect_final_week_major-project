import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api", 
  headers:{
    "Content-Type":"application/json"
  }
 });

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
