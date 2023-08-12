
<template>
  <div>
    <HeaderView />
    <h1>Admin Dashboard</h1>

    <div class="container-fluid d-flex flex-column pt-0" style="height: 90vh;">
      <div class="row flex-grow-1">
        <div class="col-lg-2 bg-light">
          <b-nav vertical>
            <b-nav-item active>General</b-nav-item>
            <b-nav-item>Usuarios</b-nav-item>
            <b-nav-item>Tareas</b-nav-item>
            <b-nav-item>Accesos</b-nav-item>
          </b-nav>
        </div>

        <div class="col-lg-10">
          <UserRegistrationForm />
        </div>
      </div>
    </div>

    <FooterView class="fixed-bottom bg-primary text-light"></FooterView>
  </div>
</template>
<!-- <template>
  <div>
    <HeaderView />
    <h1>Admin Dashboard</h1>
    <div class="container-fluid d-flex flex-column pt-0" style="height: 90vh;">
      <div class="row flex-grow-1">
        <div class="col-lg-2 bg-secondary d-flex justify-content-center align-items-center">
          menu
        </div>
        <div class="col-lg-10  ">
          <UserRegistrationForm />
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
      </div>
    </div>
    <FooterView class="fixed-bottom bg-primary text-light"></FooterView>
  </div>
</template> -->
  
<script>
import UserRegistrationForm from '@/components/UserRegistrationForm';
import HeaderView from './HeaderView';
import FooterView from './FooterView';
import { getCustomers } from '@/services/api';

export default {
  components: {
    UserRegistrationForm,
    HeaderView,
    FooterView
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
  