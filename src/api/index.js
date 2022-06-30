import axios from "axios";
// Database
export const API = axios.create({ baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
  const storeUser = JSON.parse(localStorage.getItem("profile"));
  if (storeUser) {
    req.headers.Authorization = `Bearer ${storeUser.token}`;
  }

  return req;
});

//user
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
