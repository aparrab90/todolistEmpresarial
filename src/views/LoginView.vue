<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="userAccess" placeholder="Username" />
      <input v-model="passAccess" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
<script>
import { login } from '@/services/api';

export default {
  data() {
    return {
      userAccess: '',
      passAccess: ''
    };
  },
  methods: {
    async login() {
      try {
        const userData = await login(this.userAccess, this.passAccess);
        console.log('Logged in:', userData);
        // Implementar redirección basada en el rol

        // Implementar redirección basada en el rol
        if (userData.role === 'admin') {
          this.$router.push({ name: 'AdminDashboard' });
        } else if (userData.role === 'user') {
          this.$router.push({ name: 'UserDashboard' });
        } else {
          // Manejo de roles desconocidos
          console.error('Unknown role:', userData.role);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  }
};
</script>
  
<style scoped>
/* Estilos específicos de la vista */
</style>
  */