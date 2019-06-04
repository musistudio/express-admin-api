// 封装ajax请求

import axios from "axios";
// import { notification } from "ant-design-vue";
import qs from "qs";

const service = axios.create({
  baseURL: "http://127.0.0.1:3000/", // api的base_url
  timeout: 5000 // 请求超时时间
});

service.interceptors.request.use(
  config => {
    config.method === "get"
      ? (config.params = { ...config.params })
      : (config.data = qs.stringify({ ...config.data }));
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers["token"] = window.sessionStorage.getItem("token");
    return config;
  },
  error => {
    //请求错误处理
    Promise.reject(error);
  }
);

// function request(option) {
//   return axios(option)
//     .then(res => res)
//     .catch(error => {
//       const { status, statusText } = error;
//       notification.open({
//         message: status,
//         description: statusText
//       });
//       return Promise.reject(error);
//     });
// }

export default service;
// export default request;
