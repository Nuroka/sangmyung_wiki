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
  return instance;
};

export const defaultInstance = axiosAPI(BASE_URL);
export const authInstance = axiosAuthAPI(BASE_URL);

// 인증구현시 추가
// authInstance.interceptors.request.use(function () {
// });
