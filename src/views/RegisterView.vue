<template>
  <div>
    <b-container>
      <div class="text-center">
        <h3 class="mb-4">Register</h3>
      </div>

      <b-form @submit.prevent="register">
        <b-form-group label-for="identification-input">
          <label for="identification-input">Identification</label>
          <small v-if="identificationError" class="text-danger">{{ identificationError }}</small>
          <b-form-input v-model="registrationData.identificationUser" id="identification-input" type="number"
            max="9999999999999" placeholder="Identification" required @input="restrictLength"></b-form-input>
        </b-form-group>
        <b-form-group label-for="name-input">
          <label for="name-input">Full Name</label>
          <b-form-input v-model="registrationData.nameUser" id="name-input" placeholder="Name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Email" label-for="email-input">
          <b-form-input v-model="registrationData.emailUser" id="email-input" placeholder="Email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password-input">
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
        type: 'success' 
      },
      identificationError: '',
      isRegistered: false

    };
  },
  methods: {
    async register() {
      try {
        const userData = await registerUser(this.registrationData);

        if (userData.isSuccess) {
          this.aviso.titulo = '¡Registrado!';
          this.aviso.texto = 'El registro se ha completado exitosamente.';
          this.aviso.type = 'success';
          this.isRegistered = true;
          this.vaciarCampos();
        } else {
          this.aviso.titulo = 'Error';
          this.aviso.texto = 'Hubo un problema con el registro.';
          this.aviso.type = 'error';
        }
      } catch (error) {
        this.vaciarCampos();
        this.aviso.titulo = 'Atención!';
        this.aviso.texto = error.response.data.errorMessages[0];
        this.aviso.type = 'warning';

        console.error('Registration error:', error.response.data.errorMessages[0]);
      }
    },
    vaciarCampos() {
      this.registrationData.identificationUser = '';
      this.registrationData.nameUser = '';
      this.registrationData.emailUser = '';
      this.registrationData.passwordUser = '';
    },
    restrictLength() {
      if (this.registrationData.identificationUser.length > 13) {
        this.registrationData.identificationUser = this.registrationData.identificationUser.slice(0, 13);
      }
    },
    reloadPageAfterNotification() {
      if (this.isRegistered) {
        setTimeout(() => {
          location.reload();
        }, 3000); 
      }
    }
  },
  watch: {
    aviso: {
      handler() {
        this.reloadPageAfterNotification();
      },
      deep: true
    }
  }
};
</script>
  
<style scoped>
/* Estilos específicos de la vista */
</style>
