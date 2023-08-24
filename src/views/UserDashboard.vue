<template>
  <div>
    <HeaderView />

    <div class="container-fluid d-flex flex-column pt-0 mt-5" style="height:50%">
      <div class="row flex-grow-1 mt-3 m-2">
        <!-- Usar el componente MenuView para mostrar el menú -->
        <MenuView :items="navigationItems" @selectItem="handleNavigation" class="col bg-light mt-2" />

        <div :class="['col-lg-7', !selectedTask ? 'col-lg-10' : 'col-lg-7']">
          <div v-show="activeNavItem === 'Today'">
            <TaskForm @show-task-detail="handleShowTaskDetail" @task-added="handleTaskAdded" @update-task="actualizar" />
            <b-card class="mt-1">
              <TaskList :tasks="tasks" @edit-task="handleEditTask" :menu="activeNavItem" :selectedTask="selectedTask"
                :refresh="refresh" />

            </b-card>
          </div>
          <div v-show="activeNavItem === 'Important'">
            <b-card class="mt-3">
              <TaskList :tasks="tasks" @edit-task="handleEditTask" :menu="activeNavItem" :selectedTask="selectedTask"
                :refresh="refresh" />
              <!-- <TaskList :tasks="tasks" @edit-task="handleEditTask" :menu="activeNavItem" :selectedTask="selectedTask" /> -->
            </b-card>
          </div>
          <div v-show="activeNavItem === 'All Tasks'">
            <b-card class="mt-3">
              <TaskList :tasks="tasks" @edit-task="handleEditTask" :menu="activeNavItem" :selectedTask="selectedTask"
                :refresh="refresh" />
              <!-- <TaskList :tasks="tasks" @edit-task="handleEditTask" :menu="activeNavItem" :selectedTask="selectedTask" /> -->
            </b-card>
          </div>
        </div>
        <div class="col-lg-3">
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
import TaskList from '@/components/TaskList.vue'; // Agrega la importación del componente TaskList
import HeaderView from './general/HeaderView';
import FooterView from './general/FooterView';
import MenuView from './general/MenuView';
import store from '@/store/index';
export default {
  components: {
    TaskForm,
    HeaderView,
    FooterView,
    MenuView,
    TaskList,
    TaskListDetail
  },
  data() {
    return {
      navigationItems: [
        { id: 1, name: 'Today', icon: 'book', color: 'success' },
        { id: 2, name: 'Important', icon: 'exclamation-circle', color: 'warning' },
        { id: 3, name: 'All Tasks', icon: 'list-ul', color: 'secondary' }
      ],
      activeNavItem: 'Today',
      showTaskDetail: false,
      selectedTask: null,
      tasks: [], // Agrega esta propiedad para almacenar las tareas
      perPage: 10, // Define la cantidad de tareas por página
      currentPage: 1, // Define la página actual
      tareas: [],
      refresh: false,
      store
    };
  },
  watch: {
    tasks(newTasks) {
      // Se ejecuta cuando cambia la propiedad tasks
      console.log("Nuevas tareas:", newTasks);
      // Actualizar la lista de tareas y recalcular la página actual
      this.tasks = newTasks;
      this.internalPage = 1; // Volver a la primera página
    },
  },
  methods: {
    // Manejar la selección de un elemento de navegación
    handleNavigation(selectedItem) {
      this.activeNavItem = selectedItem;
    },
    handleEditTask(task) {
      this.selectedTask = task; // Set the selected task
      this.showTaskDetail = true; // Show the task detail component
    },
    actualizar(updatedTasks) {
      this.tasks = updatedTasks; // Actualizar la lista de tareas con la nueva lista
    },


    handleShowTaskDetail(task) {
      this.selectedTask = task; // Muestra el detalle de la tarea en UserDashboard


      console.log("detalleee", task)
    },

    handleTaskAdded(updatedTasks) {
      console.log("recibe userdash", updatedTasks)
      this.tasks = updatedTasks; // Actualizar el arreglo de tareas con las tareas actualizadas
      this.refresh = true;
    },
  }

  // Otras propiedades y lógica
};
</script>

<style scoped>
/* Estilos específicos de la vista */
</style>
