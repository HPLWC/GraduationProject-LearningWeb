import Vue from 'vue'
import App from './App.vue'
import router from './global/router'
import store from './global/store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'flex.css/dist/data-flex.css'
import './assets/css/base.scss'
import regComponents from './global/regComponents'

Vue.use(ElementUI, { size: 'small' })

// 注册全局组件
Vue.use(regComponents)

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
