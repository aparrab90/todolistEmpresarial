<template>
  <div>
    <b-container>
      <div class="text-center">
        <h3 class="mb-4">Sign in</h3>
      </div>
      <div class="m-2">
        <span>Sign in and start managing your tasks!</span>
      </div>
      <b-form @submit.prevent="login">
        <b-form-group label-for="username-input">
          <b-form-input v-model="identificationUser" id="username-input" placeholder="Username" required></b-form-input>
        </b-form-group>
        <br>
        <b-form-group>
          <b-form-input v-model="passwordUser" placeholder="Password" type="password" required></b-form-input>
        </b-form-group>
        <div class="mt-2 text-end">
          <small :class="messageClass">{{ loginMessage }}</small>
          <b-button type="submit" variant="success">Login</b-button>
        </div>
      </b-form>
    </b-container>

    <!-- Agregar el componente WelcomeModal para mostrar el mensaje de bienvenida -->
    <welcome-modal
      v-if="showWelcomeModal"
      :user-name="loggedInUserName"
      :show-modal="showWelcomeModal"
      @closed="handleWelcomeModalClosed"
    />
    <HeaderView :name-user="loggedInUserName" />
  </div>
</template>

<script>
import { login } from '@/services/api';
import WelcomeModal from './WelcomeModal.vue';
import HeaderView from './general/HeaderView.vue';

export default {
  components: {
    WelcomeModal,
    HeaderView // Agregar el componente HeaderView
  },
  data() {
    return {
      identificationUser: '',
      passwordUser: '',
      loginMessage: '', // Mensaje a mostrar debajo del formulario
      showWelcomeModal: false, // Controla la visibilidad del modal de bienvenida
      loggedInUserName: '' // Nombre de usuario para mostrar en el mensaje de bienvenida
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
        console.log('Logged in:', userData.result.usuario);

        if (userData.isSuccess && userData.result && userData.result.usuario) {
          const userRole = userData.result.usuario.role;
          this.loggedInUserName = userData.result.usuario.nameUser; // Obtener el nombre del usuario
          if (userRole === 'admin') {
            this.$router.push({ name: 'AdminDashboard' });
          } else if (userRole === 'user') {
            this.$router.push({ name: 'UserDashboard' });
          } else {
            console.error('Unknown role:', userRole);
          }
          // Mostrar el modal de bienvenida
          this.showWelcomeModal = true;
        } else {
          // Manejo de respuestas con problemas
          console.error('Login error:', userData.errorMessages);
          // Mostrar mensaje de error
          this.loginMessage = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        // Manejo de errores de conexión o problemas en la solicitud
        console.error('Login error:', error);
        // Mostrar mensaje de error
        this.loginMessage = 'An error occurred. Please try again later.';
      }
    },
    handleWelcomeModalClosed() {
      // Este método se llama cuando se cierra el modal de bienvenida
      // Puedes realizar acciones adicionales si es necesario
    }
  }
};
</script>
