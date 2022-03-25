import axios from 'axios'

export function http(config, onUpload = () => {}) {
  const instance = axios.create({
    // 使用 process 前，需要 npm install process
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 60000,
    onUploadProgress: onUpload
  })

  // 请求拦截器
  instance.interceptors.request.use(config => {
    // test 接口用于前后端通信，无实际意义
    if (config.url === '/test') {
      return config;
    }

    config.headers.SecretKey = process.env.VUE_APP_SECRET_KEY;
    // 如果请求的是login接口，不添加token
    if (/login/.test(config.url)) {
      return config;
    } else {
      // 其他接口需要在请求头添加Authorization
      config.headers.Authorization = this.$store.state.token;
      return config;
    }
  },
    error => {
    console.log(error);
  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    if ([805, 806, 822, 823].includes(res.data.code)) {
      // 无法验证token，跳转到登录页
      this.$message.error(res.data.message);
      this.$router.push('/login');
    }

    return res;
  }, error => {
    console.log(error);
  })

  // 返回实例
  return instance(config);
}
