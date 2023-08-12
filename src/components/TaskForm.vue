<template>
  <div class="mt-3">
    <b-card>
      <b-form @submit.prevent="addTask">
        <b-row>
          <b-col>
            <b-form-group id="taskNameGroup" label="Task Name">
              <b-form-input ref="taskNameInput" v-model="taskName" required placeholder="Enter Task Name" />
            </b-form-group>
          </b-col>



          <b-col cols="7">
            <b-form-group id="dateTimeGroup" label="Time Limit">
              <b-row>
                <b-col cols="5">
                  <b-form-datepicker v-model="selectedDate" required placeholder="Select Date" />
                </b-col>
                <!-- <b-col>
                  <b-form-timepicker v-model="selectedTime" required placeholder="Select Time" />
                </b-col> -->
                <b-col class="text-end ">
                  <b-button type="submit" variant="primary">Add Task</b-button>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>


        </b-row>
        <!-- <b-row>
          <b-col cols="10" >
            <b-form-group id="taskDescriptionGroup" label="Task Description">
              <b-form-textarea class="form-control" v-model="taskDescription" required placeholder="Enter Task Description" rows="2" />
            </b-form-group>
          </b-col>
          <b-col  class="text-end mt-4">
            <b-button  type="submit" variant="primary">Add Task</b-button>
          </b-col>
        </b-row> -->

      </b-form>
      <!-- 
      <form @submit.prevent="addTask">
        <input v-model="taskName" placeholder="Task Name" />
        <input v-model="taskDescription" placeholder="Task Description" />
        <button type="submit">Add Task</button>
        <br>
      </form> -->
    </b-card>

    <b-card class="mt-2">

      <b-button variant="primary" @click="addRandomTasks">Add Task random</b-button>

      <b-table :items="displayedTasks" :fields="fields" striped bordered responsive head-variant="light"></b-table>
      <b-pagination v-model="currentPage" :total-rows="tasks.length" :per-page="perPage"
        aria-controls="my-table"></b-pagination>
    </b-card>
  </div>
</template>
  
<script>
import { addTask, getTasks } from '@/services/api';

export default {
  data() {
    return {
      userId: 1,
      tasks: [],
      currentPage: 1,
      perPage: 4, // Número de tareas por página
      fields: [
        { key: 'idTask', label: 'ID' },
        { key: 'nameTask', label: 'Name' },
        { key: 'detailTask', label: 'Detail' },
        { key: 'statusTask', label: 'Status' },
        { key: 'createTask', label: 'Created' },
        { key: 'limitTask', label: 'Limit' },
        { key: 'priorityTask', label: 'Priority' }
      ],

      modalShow: false,
      taskName: '',
      taskDescription: ''
    };
  },
  computed: {
    sortedTasks() {
      // Crear una copia ordenada de las tareas sin modificar el array original
      return [...this.tasks].sort((a) => (a.statusTask ? -1 : 1));
    },
    displayedTasks() {
      // Calcular las tareas a mostrar en la página actual
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.sortedTasks.slice(startIndex, endIndex);
    }
  },
  methods: {
    async addTask() {
      try {
        await addTask(this.taskName, this.taskDescription);
        console.log('Task added successfully');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },

    showModal() {
      this.modalShow = true;
    },

    focusTaskName() {
      // Establecer el enfoque en el campo "Task Name" al abrir el modal
      this.$refs.taskNameInput.focus();
    },
    async fetchTask() {
      try {
        this.tasks = await getTasks(this.userId); // Supongamos que tienes el userId definido en algún lugar
        console.log('Tasks fetched successfully', this.tasks);
        return this.tasks; // Puedes retornar las tareas para usarlas en otros lugares si es necesario
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Puedes lanzar el error nuevamente para manejarlo en un nivel superior si es necesario
      }
    },
    addRandomTasks() {
      // Generar 10 tareas aleatorias
      for (let i = 1; i <= 5; i++) {
        const task = {
          idTask: i,
          nameTask: `Task ${i}`,
          detailTask: `Details for Task ${i}`,
          statusTask: Math.random() < 0.5, // Generar aleatoriamente true o false
          createTask: new Date(), // Usar la fecha actual como fecha de creación
          limitTask: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Generar una fecha límite dentro de los próximos 7 días
          priorityTask: Math.random() < 0.3 // Generar aleatoriamente true (prioritario) o false
        };
        this.tasks.push(task); // Agregar la tarea generada al array de tareas
      }
      console.log('Random tasks added successfully', this.tasks);
    }
  },
  created() {
    // this.fetchTask(); // Llamada a la función fetchTask al crear la instancia del componente
    this.addRandomTasks(); // Llamada a la función fetchTask al crear la instancia del componente
  }
};
</script>
  
<style scoped>
/* Estilos específicos del componente */
</style>
  