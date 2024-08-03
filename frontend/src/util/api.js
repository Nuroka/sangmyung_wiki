import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

const BASE_URL = "/api";

const axiosAPI = (url, options = {}) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
    headers: {
      ...options.headers,
      "Content-Security-Policy": "upgrade-insecure-requests",
    },
  });
  return instance;
};

// Auth Required
const axiosAuthAPI = (url, options = {}) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
    headers: {
      ...options.headers,
      "Content-Security-Policy": "upgrade-insecure-requests",
    },
  });
  instance.defaults.withCredentials = true;

  // 요청 전에 Authorization 헤더를 추가하는 인터셉터
  instance.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.getItem("token"); // 또는 sessionStorage
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = axiosAPI(BASE_URL);
export const authInstance = axiosAuthAPI(BASE_URL);
