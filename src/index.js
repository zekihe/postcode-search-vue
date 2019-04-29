import Vue from 'vue'
import App from './app.vue'
import axios from 'axios'

import './assets/styles/global.styl'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios;

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)
}).$mount(root)