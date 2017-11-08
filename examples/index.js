import Vue from 'vue';
import App from './app.vue';
import ForkeMeOnGithub from 'fork-me-on-github-vue';

Vue.use(ForkeMeOnGithub);

new Vue({
  el: '#app',
  render: h => h(App)
});
