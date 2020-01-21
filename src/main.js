import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { firestorePlugin } from 'vuefire'



Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(firestorePlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



