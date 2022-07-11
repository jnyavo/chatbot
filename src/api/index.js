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
export const forget = (email) => API.post("/user/forget", email);
export const resetPassword = (formData) => API.post("/user/reset", formData);
export const socialNetwork = (formData) => API.post("/user/socialNetwork", formData);
