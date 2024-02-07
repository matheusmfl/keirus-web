import axios from "axios";
import  nookies, { parseCookies }  from "nookies";

export const api = axios.create({
  baseURL: 'http://localhost:3000',

})

api.interceptors.request.use((config) => {
  const cookies = parseCookies()
  const authToken = cookies.Auth
  
  console.log(cookies.Auth + 'authToken as')

  if (authToken) {
    config.headers.Authorization = `Bearer ${cookies}`;
  }

  return config;
});