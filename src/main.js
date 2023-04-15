import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import directives from './common/drag'

Vue.use(directives)

Vue.use(ElementUI)
Vue.config.devtools = false
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app')
