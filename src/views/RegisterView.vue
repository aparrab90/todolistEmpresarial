<template>
  <div>
    <div class="text-center">
      <h3 class="mb-4">Register</h3>
    </div>

    <b-form @submit.prevent="register">
      <b-form-group label="Identification:" label-for="identification-input">
        <b-form-input v-model="registrationData.identificationUser" id="identification-input" placeholder="Identification"
          required></b-form-input>
      </b-form-group>
      <b-form-group label="Name:" label-for="name-input">
        <b-form-input v-model="registrationData.nameUser" id="name-input" placeholder="Name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email:" label-for="email-input">
        <b-form-input v-model="registrationData.emailUser" id="email-input" placeholder="Email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password-input">
        <b-form-input v-model="registrationData.passwordUser" id="password-input" type="password" placeholder="Password"
          required></b-form-input>
      </b-form-group>
      <div class="mt-2 text-end">

        <b-button type="submit" variant="success">Register</b-button>
      </div>
    </b-form>
  </div>
</template>
  
<script>
import { registerUser } from '@/services/api';

export default {
  data() {
    return {
      registrationData: {
        identificationUser: '',
        nameUser: '',
        emailUser: '',
        passwordUser: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        console.log('data:', this.registrationData);
        const userData = await registerUser(this.registrationData);
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
