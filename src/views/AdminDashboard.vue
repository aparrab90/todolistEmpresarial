<template>
  <div>
    <h1>Admin Dashboard</h1>
    <!-- Agregar contenido específico para el dashboard de admin -->
    <UserRegistrationForm />
    <!-- Otros componentes y contenido -->

    <div v-if="customers.length">
      <h2>Customer List</h2>
      <ul>
        <li v-for="customer in customers" :key="customer.id">{{ customer }}</li>
      </ul>
    </div>
    <div v-else>
      <p>No customers found.</p>
    </div>
  </div>
</template>
  
<script>
import UserRegistrationForm from '@/components/UserRegistrationForm';
import { getCustomers } from '@/services/api';

export default {
  components: {
    UserRegistrationForm
  },

  data() {
    return {
      customers: []
    };
  },
  created() {
    // Obtén los datos de los clientes al cargar la vista
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      try {
        const customersData = await getCustomers();
        this.customers = customersData;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }
  }
  // Otras propiedades y lógica
};
</script>
  
<style scoped>
/* Estilos específicos de la vista */
</style>
  