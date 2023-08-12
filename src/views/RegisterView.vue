<template>
  <div>
    <h1>Register</h1>
    <b-form @submit.prevent="register">
      <b-form-group label="Full Name:" label-for="fullname-input">
        <b-form-input
          v-model="fullNameUser"
          id="fullname-input"
          placeholder="Full Name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Address:" label-for="address-input">
        <b-form-input
          v-model="addressUser"
          id="address-input"
          placeholder="Address"
          required
        ></b-form-input>
      </b-form-group>
      <!-- Otros campos de registro utilizando b-form-group y b-form-input -->
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>
<!-- <template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="fullNameUser" placeholder="Full Name" />
        <input v-model="addressUser" placeholder="Address" />
      
        <button type="submit">Register</button>
      </form>
    </div>
  </template> -->
  
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
  