import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './api/index.js'
import uploadFile from './api/uploadFile'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$api = Api
Vue.prototype.$uploadFile = uploadFile

Vue.use(ElementUI);

new Vue({
  beforeCreate() {
    Api.initThis(this)
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
