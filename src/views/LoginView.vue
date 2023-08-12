<template>
  <div>
    <b-container>
      <h1 class="mb-4">Login</h1>
      <b-form @submit.prevent="login">
        <b-form-group label="Username:" label-for="username-input">
          <b-form-input v-model="userAccess" id="username-input" placeholder="Username" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password-input">
          <b-form-input v-model="passAccess" id="password-input" placeholder="Password" type="password"
            required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-container>
  </div>
</template>



<!-- <template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="userAccess" placeholder="Username" />
      <input v-model="passAccess" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
   -->
<script>
import { login } from '@/services/api';

export default {
  data() {
    return {
      userAccess: '',
      passAccess: '',
    };
  },
  methods: {
    async login() {
      try {
        const userData = await login(this.userAccess, this.passAccess);
        console.log('Logged in:', userData);

        if (userData.role === 'admin') {
          this.$router.push({ name: 'AdminDashboard' });
        } else if (userData.role === 'user') {
          this.$router.push({ name: 'UserDashboard' });
        } else {
          // Manejo de roles desconocidos
          console.error('Unknown role:', userData.role);
        }
      } catch (error) {
        this.$router.push({ name: 'UserDashboard' });
       //this.$router.push({ name: 'AdminDashboard' });
        console.error('Login error:', error);
      }
    }
  }
};
</script>
  