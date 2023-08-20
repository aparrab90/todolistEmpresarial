<template>
  <div>
    <b-container>
      <div class="text-center">
        <h3 class="mb-4">Sign in</h3>

        <small class="mb-2">Sign in and start managing your tasks!</small>
      </div>
      <b-form @submit.prevent="login">
        <b-form-group label-for="username-input">
          <b-form-input v-model="identificationUser" id="username-input" placeholder="Username" required
            class="m-2"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="passwordUser" placeholder="Password" type="password" required class="m-2"></b-form-input>
        </b-form-group>
        <div class="text-end">
          <small :class="messageClass">{{ loginMessage }}</small>
          <b-button type="submit" variant="success" class="m-2 w-100">Login</b-button>
        </div>
      </b-form>
    </b-container>
    <AvisoModal :aviso="aviso" />

    <HeaderView :name-user="loggedInUserName" />
  </div>
</template>

<script>
import { login } from '@/services/api';
import HeaderView from './general/HeaderView.vue';
import { setAuthData } from '@/services/auth'; // Ajusta la ruta a tu ubicación

export default {
  components: {
    HeaderView // Agregar el componente HeaderView
  },
  data() {
    return {
      identificationUser: '',
      passwordUser: '',
      loginMessage: '', // Mensaje a mostrar debajo del formulario
      showWelcomeModal: false, // Controla la visibilidad del modal de bienvenida
      loggedInUserName: '',// Nombre de usuario para mostrar en el mensaje de bienvenida
      aviso: {
        titulo: '',
        texto: '',
        type: 'success' // Puedes cambiar el tipo de aviso según tus necesidades
      }
    };
  },
  computed: {
    messageClass() {
      return this.loginMessage.includes('error') ? 'text-danger' : 'text-danger';
    }
  },
  methods: {
    async login() {
      try {
        const userData = await login(this.identificationUser, this.passwordUser);
        console.log('Logged in:', userData);
        
        if (userData.isSuccess && userData.result && userData.result.usuario) {
          this.loggedInUserName = userData.result.usuario.nameUser; // Obtener el nombre del usuario
          console.log('LOEGEADOOOO:', this.loggedInUserName);
          
          localStorage.setItem('token', userData.result.token); // Asegúrate de adaptar el nombre del campo
          console.log('STORAGE:', userData.result.token);
          const loggedInUserName = userData.result.usuario.nameUser;
          const loggedIdUser = userData.result.usuario.idUser;
          setAuthData(userData.result.token, loggedInUserName, loggedIdUser);
          // Redireccionar a la ruta UserDashboard
          this.$router.push({ name: 'UserDashboard' });
          // this.showWelcomeModal = true;
        } else {
          // Manejo de respuestas con problemas
          console.error('Login error:', userData.errorMessages);
          // Mostrar mensaje de error
          this.loginMessage = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        // this.$router.push({ name: 'UserDashboard' });
        // Manejo de errores de conexión o problemas en la solicitud
        console.error('Login error:', error);
        // Mostrar mensaje de error
        this.loginMessage = 'An error occurred. Please try again later.';
      }
    },

  }
};
</script>
