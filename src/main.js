import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'; // Importa BootstrapVue y IconsPlugin
import AvisoModal from './views/AvisoModal.vue'; // Importa el componente AvisoModal
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

// Instala BootstrapVue y el complemento de iconos
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Registra el componente AvisoModal globalmente
Vue.component('AvisoModal', AvisoModal);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
