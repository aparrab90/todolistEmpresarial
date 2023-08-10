<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="fullNameUser" placeholder="Full Name" />
        <input v-model="addressUser" placeholder="Address" />
        <!-- Otros campos de registro que necesites -->
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { registerUser } from '@/services/api';
  
  export default {
    data() {
      return {
        fullNameUser: '',
        addressUser: ''
      };
    },
    methods: {
      async register() {
        try {
          const userData = await registerUser(this.fullNameUser, this.addressUser);
          console.log('Registered:', userData);
          // Implementar lógica de redirección después del registro
        } catch (error) {
          console.error('Registration error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos de la vista */
  </style>
  