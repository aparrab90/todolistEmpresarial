<template>
  <div>
    <HeaderView />

    <div class="container-fluid d-flex flex-column pt-0 mt-5" style="height:50%">
      <div class="row flex-grow-1 mt-3">
        <!-- Usar el componente MenuView para mostrar el menú -->
        <MenuView :items="navigationItems" @selectItem="handleNavigation" class="col bg-light mt-2" />

        <div class="col-lg-8">
          <div v-show="activeNavItem === 'Today'">
            <TaskForm @show-task-detail="handleShowTaskDetail" />
          </div>
          <div v-show="activeNavItem === 'Important'">
            Elemento 2
          </div>
          <div v-show="activeNavItem === 'All Tasks'">
            Elemento 3
          </div>
        </div>
        <div class="col-lg-2">
          <div v-if="selectedTask">
            <TaskListDetail :selectedTask="selectedTask" />
          </div>

        </div>
      </div>
    </div>

    <FooterView class="fixed-bottom bg-primary text-light"></FooterView>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm';
import TaskListDetail from '@/components/TaskListDetail';
import HeaderView from './general/HeaderView';
import FooterView from './general/FooterView';
import MenuView from './general/MenuView'; // Importa el componente MenuView

export default {
  components: {
    TaskForm,
    HeaderView,
    FooterView,
    MenuView,
    TaskListDetail// Agrega el componente MenuView al registro de componentes
  },
  data() {
    return {
      // Array con objetos que contienen las propiedades id, name y to
      navigationItems: [
        { id: 1, name: 'Today', icon: 'book', color: 'success' },
        { id: 2, name: 'Important', icon: 'exclamation-circle', color: 'warning' },
        { id: 3, name: 'All Tasks', icon: 'list-ul', color: 'secondary' }
      ],
      activeNavItem: 'Today', // Inicialmente mostrar el elemento 1,
      showTaskDetail: false,
      selectedTask: null,
    };
  },
  methods: {
    // Manejar la selección de un elemento de navegación
    handleNavigation(selectedItem) {
      this.activeNavItem = selectedItem;
    },
    // handleEditTask(task) {
    //   this.selectedTask = task; // Set the selected task
    //   this.showTaskDetail = true; // Show the task detail component
    // },
    handleShowTaskDetail(task) {
      this.selectedTask = task; // Muestra el detalle de la tarea en UserDashboard


      console.log("detalleee", task)
    },
  }

  // Otras propiedades y lógica
};
</script>

<style scoped>
/* Estilos específicos de la vista */
</style>
