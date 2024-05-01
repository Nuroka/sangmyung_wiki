import axios from "axios";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const BASE_URL = "http://localhost:9090";

const axiosAPI = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

// Auth Required
const axiosAuthAPI = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  instance.defaults.withCredentials = true;
  return instance;
};

export const defaultInstance = axiosAPI(BASE_URL);
export const authInstance = axiosAuthAPI(BASE_URL);

authInstance.interceptors.request.use(
  function (config) {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
