<template>
  <div>
    <HeaderView />
    <h1>Admin Dashboard</h1>

    <div class="container-fluid d-flex flex-column pt-0" style="height: 90vh;">
      <div class="row flex-grow-1">
        <div class="col bg-light mt-2">
          <b-nav vertical class="bg-light">
            <b-nav-item v-for="item in navigationItems" :key="item.id" :to="item.to" :active="isActive(item)">
              <b-icon :icon="item.icon" class="mr-2"></b-icon>
              {{ item.name }}
            </b-nav-item>
          </b-nav>
        </div>

        <div class="col-lg-8">
          <TaskForm />
        </div>
        <div class="col-lg-2">
          <!-- PRIORIDAD -->
        </div>
      </div>
    </div>

    <FooterView class="fixed-bottom bg-primary text-light"></FooterView>
  </div>
</template>


<script>
import TaskForm from '@/components/TaskForm';
import HeaderView from './HeaderView';
import FooterView from './FooterView';
export default {
  components: {
    TaskForm,
    HeaderView,
    FooterView
  },
  data() {
    return {
      // Array con objetos que contienen las propiedades id, name y to
      navigationItems: [
        { id: 1, name: 'Today', to: '/user', icon: 'house-door' },
        { id: 2, name: 'Important', to: '/important', icon: 'exclamation-circle' },
        { id: 3, name: 'All Tasks', to: '/all-tasks', icon: 'list-ul' }
      ]
    };
  },
  methods: {
    // Método para verificar si un elemento de navegación está activo
    isActive(item) {
      // Implementar lógica para verificar si el elemento está activo, por ejemplo, basado en la ruta actual
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
  