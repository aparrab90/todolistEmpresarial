<template>
  <div>
    <b-container>
      <div class="text-center">
        <h3 class="mb-4">Register</h3>
      </div>

      <b-form @submit.prevent="register">
        <b-form-group label="Identification:" label-for="identification-input">
          <b-form-input v-model="registrationData.identificationUser" id="identification-input"
            placeholder="Identification" required></b-form-input>
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
        <div class="mt-4 text-end">

          <b-button type="submit" variant="success" class="w-100">Register</b-button>
        </div>
      </b-form>
      <AvisoModal :aviso="aviso" />
    </b-container>
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
      },
      aviso: {
        titulo: '',
        texto: '',
        type: 'success' // Puedes cambiar el tipo de aviso según tus necesidades
      }

    };
  },
  methods: {
    async register() {
      try {
        console.log('data:', this.registrationData);
        const userData = await registerUser(this.registrationData);
        console.log('Registered:', userData.isSuccess);

        if (userData.isSuccess) {
          this.aviso.titulo = '¡Registrado!';
          this.aviso.texto = 'El registro se ha completado exitosamente.';
          this.aviso.type = 'success';
          // location.reload();
        } else {
          this.aviso.titulo = 'Error';
          this.aviso.texto = 'Hubo un problema con el registro.';
          this.aviso.type = 'error';
        }
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
