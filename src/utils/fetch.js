import axios from 'axios'

let baseURL_dev = 'http://localhost:8081'  // 解决跨域问题
// let baseURL_pro = ''  // 公司域名
// let baseURL_test = '' // 内网地址

// 创建axios实例
const fetch = axios.create({
  baseURL: baseURL_dev,
  timeout: 7000,  // 超时设置
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 封装请求拦截器
fetch.interceptors.request.use((config) => {
  // 在这里做一些检测或者包装等处理
  // console.log('请求拦截', config)
  // 鉴权 token添加
  config.headers.Authorization = localStorage.getItem('token') || ''
  return config
})

// 封装响应拦截器
fetch.interceptors.response.use((response) => {
  // 请求成功
  // console.log('响应拦截', response)
  // 数据过滤，根据后端标识字符来进行数据
  if (response.data && response.data.err==0) {
    return response.data.data
  } else {
    console.log('网络异步，请稍后再试')
  }
}, (error) => {
  // 请求失败
  return Promise.reject(error)
})

export default fetch