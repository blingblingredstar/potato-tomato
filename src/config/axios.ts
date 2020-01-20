import axios from "axios";
import history from "./history";

const appID = "HsjvVF7uMwTNhonJVu7MgwAZ";
const appSecret = "zQYB3yzmQXW4AMvEjh36LM1j";
const baseURL = "https://gp-server.hunger-valley.com/";

const instance = axios.create({
  baseURL,
  headers: {
    "t-app-id": appID,
    "t-app-secret": appSecret
  }
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const xToken = localStorage.getItem("x-token");
    if (xToken) {
      config.headers["Authorization"] = `Bearer ${xToken}`;
    }
    return config;
  },
  error => {
    console.error("axios add request interceptor error", error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.headers["x-token"]) {
      localStorage.setItem("x-token", response.headers["x-token"]);
    }
    return response;
  },
  error => {
    console.error("axios add response interceptor error", error);
    if (error.response.status === 401) {
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
