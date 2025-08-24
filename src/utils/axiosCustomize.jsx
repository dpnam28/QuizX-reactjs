import axios from "axios";
import nProgress from "nprogress";
import { reduxStore } from "../redux/store";

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token =
      reduxStore?.getState()?.user?.account?.access_token ?? "";
    config.headers["Authorization"] = "Bearer " + access_token;
    nProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return error; /* ?? Promise.reject(error); */
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done();
    return response?.data ?? response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    return error; /* ?? Promise.reject(error); */
  }
);
export default instance;
