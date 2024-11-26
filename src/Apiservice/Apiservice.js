import axios from "axios";

const token = localStorage.getItem("accessToken");


export const API_URL = "http://127.0.0.1:8000";
export const api = axios.create({
    baseURL: "http://localhost:8000",
  
  
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });