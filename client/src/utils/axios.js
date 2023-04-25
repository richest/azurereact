import axios from "axios";

import { store } from "redux/store";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:5001/api/";
  // axios.defaults.baseURL = "http://167.172.209.57:3235/api/";

  // axios.defaults.baseURL = "http://192.168.100.26:5000/api/";
} else {
  // axios.defaults.baseURL = "http://167.172.209.57:3235/api/";
  axios.defaults.baseURL = "http://localhost:5001/api/";

  // axios.defaults.baseURL = "http://64.227.22.105/api/";
}

axios.interceptors.request.use(
  (config) => {
    const {
      auth: { token },
    } = store.getState();
    if (token) {
      config.headers = { authorization: token };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (successRes) => {
    return successRes;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
