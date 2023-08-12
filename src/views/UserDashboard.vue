<template>
  <div>
    <HeaderView />
    <h1>Admin Dashboard</h1>

    <div class="container-fluid d-flex flex-column pt-0" style="height: 90vh;">
      <div class="row flex-grow-1">
        <div class="col-lg-2 bg-light">
          <!-- <b-nav vertical>
            <b-nav-item active>General</b-nav-item>
            <b-nav-item>Usuarios</b-nav-item>
            <b-nav-item>Tareas</b-nav-item>
            <b-nav-item>Accesos</b-nav-item>
          </b-nav> -->
        </div>

        <div class="col-lg-10">
          <TaskForm />
        </div>
      </div>
    </div>

    <FooterView class="fixed-bottom bg-primary text-light"></FooterView>
  </div>
</template>

<!-- <template>
    <div>
      <h1>User Dashboard</h1>
     
      <TaskForm />
 
    </div>
  </template> -->
  
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
  // Otras propiedades y lógica
};
</script>
  
<style scoped>
/* Estilos específicos de la vista */
</style>
  