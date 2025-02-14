import axios from "axios"

let axiosurl = "http://49.232.61.41:80" +
//     ""
// let axiosurl = "http://192.168.110.169" +
    ""
// let axiosurl = "http://192.168.110.169:80"

const service = axios.create({
  baseURL: axiosurl
})

service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
  // 对响应数据做点什么
      return response;
    },
    function (error) {
  // 错误状态码处理
  console.log("error:" + error);

  // 获取状态码
  let statusCode = error.response ? error.response.status : null;

  switch (statusCode) {
    case 400:
      alert("访问地址不存在！");
      break;
    case 500:
      alert("服务器内部错误！");
      break;
    default:
      alert("错误状态未知！");
      break;
  }

  return Promise.reject(error);
});

  export default service