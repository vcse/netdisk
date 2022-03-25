// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import {http} from './util/http'
import {Message} from 'element-ui'

Vue.config.productionTip = false

// 添加全局信息通知
Vue.prototype.$message = (msg) => {
  return Message({
    message: msg,
    duration: 3000
  })
}

Vue.prototype.$message.success = (msg) => {
  return Message.success({
    message: msg,
    duration: 3000
  })
}

Vue.prototype.$message.error = (msg) => {
  return Message.error({
    message: msg,
    duration: 3000
  })
}

Vue.prototype.$message.warning = (msg) => {
  return Message.warning({
    message: msg,
    duration: 3000
  })
}

// 注册一个事件总线方法
Vue.prototype.$bus = new Vue();
// 注册一个网络请求方法
Vue.prototype.$http = http;
// element ui
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
