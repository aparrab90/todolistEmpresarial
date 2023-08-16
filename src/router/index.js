import Vue from "vue";
import VueRouter from "vue-router";
import jwt_decode from "jwt-decode"; // Importa jwt-decode
import HomeView from "@/views/HomeView.vue"; // Ajusta la ruta a la ubicación de tu LoginView
// import FooterView from '@/views/FooterView.vue'; // Ajusta la ruta a la ubicación de tu LoginView
// import LoginView from '@/views/LoginView.vue'; // Ajusta la ruta a la ubicación de tu LoginView
import AdminDashboard from "@/views/AdminDashboard.vue"; // Ajusta la ruta a la ubicación de tu AdminDashboard
import UserDashboard from "@/views/UserDashboard.vue"; // Ajusta la ruta a la ubicación de tu UserDashboard
import RegisterView from "@/views/RegisterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },

  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" }, // Requiere autenticación y rol de administrador
  },
  {
    path: "/user",
    name: "UserDashboard",
    component: UserDashboard,
    meta: { requiresAuth: true }, // Requiere autenticación y rol de usuario
  },

  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
  }
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    console.log("token", localStorage); // Obtén el token de almacenamiento local
    if (token) {
      try {
        const decoded = jwt_decode(token);
        console.log("token decodificado", decoded);
        // Realiza las comprobaciones necesarias con el token decodificado
        next(); // Si el token es válido, permite el acceso a la ruta
      } catch (error) {
        // Error al decodificar el token
        next({ name: "Home" }); // Redirige a la página de inicio si hay un error
      }
    } else {
      // Token no presente, redirigir a la página de inicio de sesión
      next({ name: "Home" });
    }
  } else {
    // Rutas públicas, sin necesidad de autenticación
    next();
  }
});

export default router;
