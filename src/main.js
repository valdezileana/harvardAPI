import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueExpandableImage from 'vue-expandable-image'
Vue.use(VueExpandableImage)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
