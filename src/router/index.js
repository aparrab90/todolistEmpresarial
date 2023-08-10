import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView.vue'; // Ajusta la ruta a la ubicación de tu LoginView
import AdminDashboard from '@/views/AdminDashboard.vue'; // Ajusta la ruta a la ubicación de tu AdminDashboard
import UserDashboard from '@/views/UserDashboard.vue'; // Ajusta la ruta a la ubicación de tu UserDashboard
import RegisterView from '@/views/RegisterView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' } // Requiere autenticación y rol de administrador
  },
  {
    path: '/user',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' } // Requiere autenticación y rol de usuario
  },
  // Agrega más rutas aquí si es necesario

  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  }
];

const router = new VueRouter({
  mode: 'history', // O 'hash' si prefieres URLs con hash
  base: process.env.BASE_URL,
  routes
});

export default router;
