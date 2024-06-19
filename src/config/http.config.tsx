import axios, { AxiosError, AxiosResponse } from "axios";

// const BASE_URL = `${process.env.REACT_APP_LOCAL_SERVER_URL}`;
export const BASE_URL = `${process.env.REACT_APP_LIVE_SERVER_URL}`;

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request handlers
const requestHandler = (config: any): any => {
  const token: any = localStorage.getItem("token");

  if (token) {
    config["headers"].Authorization = `Bearer ${token}`;
  }
  return config;
};
const requestErrorHanlder = (error: AxiosError) => {
  console.log("Request Error", error);
  return Promise.reject(error);
};

// response handlers
const responseHandler = (response: AxiosResponse): AxiosResponse => {
  return response;
};
const responseErrorHandler = (error: AxiosError) => {
  console.log("Response Error", error);

  return Promise.reject(error);
};

API.interceptors.request.use(requestHandler, requestErrorHanlder);
API.interceptors.response.use(responseHandler, responseErrorHandler);
export default API;
