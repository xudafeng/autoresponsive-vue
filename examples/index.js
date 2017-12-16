import Vue from 'vue';
import ForkeMeOnGithub from 'fork-me-on-github-vue';

import App from './app.vue';

Vue.use(ForkeMeOnGithub);

new Vue({
  el: '#app',
  render: h => h(App)
});
