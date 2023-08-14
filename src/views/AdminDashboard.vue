<template>
  <div>
    <HeaderView />
    <h1>Admin Dashboard</h1>

    <div class="container-fluid d-flex flex-column pt-0" style="height: 90vh;">
      <div class="row flex-grow-1">
        <!-- Usar el componente MenuView para mostrar el menú -->
        <MenuView :items="navigationItems" class="col bg-light mt-2" />

        <div class="col-lg-8">
          <!-- Mostrar el componente TaskForm solo si la opción "Today" está activa -->
          <!-- <RegisterUser /> -->
          <UsersList />
        </div>
        <div class="col-lg-2">
          <!-- PRIORIDAD (Deja este espacio vacío) -->
        </div>
      </div>
    </div>

    <FooterView class="fixed-bottom bg-primary text-light"></FooterView>
  </div>
</template>

<script>
// import RegisterUser from '@/components/UserRegistrationForm.vue';
import UsersList from '@/components/UsersList.vue';
import HeaderView from './general/HeaderView';
import FooterView from './general/FooterView';
import MenuView from './general/MenuView'; // Importa el componente MenuView

export default {
  components: {
    // RegisterUser,
    UsersList,
    HeaderView,
    FooterView,
    MenuView // Agrega el componente MenuView al registro de componentes
  },
  data() {
    return {
      // Array con objetos que contienen las propiedades id, name y to
      navigationItems: [
        // { id: 1, name: 'Today', to: '/admin', icon: 'house-door' },
        { id: 2, name: 'All Users', to: '/all-users', icon: 'list-ul' }
      ]
    };
  },
  methods: {
    // Método para verificar si un elemento de navegación está activo
    isActive(item) {
      // Implementar lógica para verificar si el elemento está activo, basado en la ruta actual
      // Puedes usar vue-router para obtener la ruta actual y compararla con item.to
      // Devolver true si el elemento está activo, de lo contrario, false
      // Ejemplo simplificado:
      return this.$route.path === item.to;
    }
  }

  // Otras propiedades y lógica
};
</script>

<style scoped>
/* Estilos específicos de la vista */
</style>
