import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

const BASE_URL = "http://localhost:9090/api";

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
  return instance;
};

export const defaultInstance = axiosAPI(BASE_URL);
export const authInstance = axiosAuthAPI(BASE_URL);

// 요청 전에 Authorization 헤더를 추가하는 인터셉터
authInstance.interceptors.request.use(
  function (config) {
    const accessToken = getAuthToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
