import axios from "axios";

const token = localStorage.getItem("accessToken");


export const API_URL = "https://imagegallery.snehak.site";
export const api = axios.create({
    baseURL: "https://imagegallery.snehak.site",
  
  
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });