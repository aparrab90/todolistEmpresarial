<template>
  <div>
    <div class="tab-buttons">
      <button class="tab-button" :class="{ active: activeTab === 'option1' }" @click="activeTab = 'option1'">
        Login
        <div class="progress" v-show="activeTab === 'option1'">
          <div class="progress-bar"></div>
        </div>
      </button>
      <button class="tab-button" :class="{ active: activeTab === 'option2' }" @click="activeTab = 'option2'">
        Registro
        <div class="progress" v-show="activeTab === 'option2'">
          <div class="progress-bar"></div>
        </div>
      </button>
    </div>



    <div v-if="activeTab === 'option1'" class="mt-3">
      <h3 class="mb-3">Login</h3>
      <form @submit.prevent="login">
        <!-- Campos de login aquí -->
      </form>
    </div>

    <div v-if="activeTab === 'option2'" class="mt-3">
      <h3 class="mb-3">Registro</h3>
      <RegistrationForm />
    </div>
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
</template> -->
  
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
        // this.$router.push({ name: 'UserDashboard' });
        this.$router.push({ name: 'AdminDashboard' });
        console.error('Login error:', error);
      }
    }
  }
};
</script>
  
<style>
.tab-buttons {
  display: flex;
  /* margin-bottom: 15px; */
}

.tab-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  /* padding: 10px 20px; */
  font-size: 16px;
  color: #333;
}

.tab-button.active {
  background-color: #3498db;
  color: white;
}

.progress {
  height: 1px;
  background-color: #f0f0f0;
  /* margin-top: 10px; */
}

.progress-bar {
  height: 100%;
  background-color: #3498db;
  width: 0;
  transition: width 0.3s;
}
</style>
