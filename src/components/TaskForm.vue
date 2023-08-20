<template>
  <div class="mt-3">
    <b-card>
      <b-form @submit.prevent="addTask">
        <b-row>
          <b-col>
            <b-form-group id="taskNameGroup" label="New Task" class="no-border-input">
              <template #label>
                <div class="text-left">
                  <strong class="">New Task</strong>
                </div>
              </template>
              <b-form-input ref="taskNameInput" v-model="taskName" required placeholder="Name" />
            </b-form-group>
            <hr>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="descriptionGroup" class="no-border-input">
              <b-form-textarea v-model="taskDescription" placeholder="Description" rows="3" />
            </b-form-group>
          </b-col>
        </b-row>

        <div class="mt-1">
          <b-row>

            <b-col cols="4" class="text-start">
              <b-form-group id="limitTaskGroup">
                <b-form-datepicker v-model="selectedLimitDate" @input="updateSelectedDate" :min="currentDate" required
                  placeholder="Limit Task" class="small-datepicker" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="groupSelectGroup" class="mb-3" title="Select Category">
                <b-button-group>
                  <b-button v-for="category in groupOptions" :key="category.value"
                    :variant="selectedGroup === category.value ? 'primary' : 'outline-secondary'"
                    @click="selectedGroup = category.value">
                    {{ category.text }}
                  </b-button>
                </b-button-group>
              </b-form-group>
            </b-col>


            {{ selectedGroup }}

            <b-col class="text-end">
              <b-button type="submit" variant="success" :disabled="isButtonDisabled">Agregar Tarea</b-button>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </b-card>
    <b-card class="mt-2">
      <!-- <TaskList :tasks="dataTask" :fields="fields" :perPage="perPage" :currentPage="currentPage" /> -->
      <TaskList :tasks="tasks" :fields="fields" :perPage="perPage" :currentPage="currentPage" />


    </b-card>

  </div>
</template>
  
<script>
// import { addTask, getTasks } from '@/services/api';
import { addTask } from '@/services/api';
import { getAuthData } from '@/services/auth'; // Ajusta la ruta a tu ubicación
import TaskList from './TaskList.vue'; // Ajusta la ruta a tu ubicación
import moment from 'moment';

export default {
  components: {
    TaskList,
  },
  data() {
    return {

      idUser: '',
      currentPage: 1,
      tasks: [],
      dataTask: [],
      perPage: 4, // Número de tareas por página
      fields: [
        { key: 'idTask', label: '' },
        { key: 'nameTask', label: 'Name' },
        { key: 'detailTask', label: 'Detail' },
        { key: 'statusTask', label: 'Status' },
        { key: 'createTask', label: 'Created' },
        { key: 'limitTask', label: 'Limit' },
        { key: 'priorityTask', label: 'Priority' },
        { key: 'idCategory', label: 'Cat' }
      ],

      modalShow: false,
      taskName: '',
      taskDescription: '',
      selectedLimitDate: '',
      groupOptions: [
        { value: 1, text: 'Personal' },
        { value: 2, text: 'Estudio' },
        { value: 3, text: 'Trabajo' },
        { value: 4, text: 'Viaje' },
        { value: 5, text: 'Investigación' },
      ],
      selectedGroup: 1,

    };
  },
  computed: {
    sortedTasks() {
      // Crear una copia ordenada de las tareas sin modificar el array original
      return [...this.tasks].sort((a) => (a.statusTask ? -1 : 1));
    },
    // displayedTasks() {
    //   const startIndex = (this.currentPage - 1) * this.perPage;
    //   const endIndex = startIndex + this.perPage;
    //   return this.sortedTasks.slice(startIndex, endIndex);
    // },
    getUser() {
      const authData = getAuthData();
      return authData.idUser;
    },
    currentDate() {
      // Calcular la fecha actual utilizando moment.js
      return moment().format('YYYY-MM-DD');
    },
    isButtonDisabled() {
      // Evaluar si los campos están vacíos
      return this.taskName === '' || this.taskDescription === '';
    },

  },
  methods: {
    async addTask() {
      try {
        const taskData = {
          nameTask: this.taskName,
          detailTask: this.taskDescription,
          statusTask: '0',
          limitTask: this.selectedLimitDate,
          priorityTask: '0',
          idUser: this.userId,
          idCategory: this.selectedGroup,
        };

        this.dataTask.push(taskData);
        console.log("REGISTRO NEW TASK", taskData);
        // Llamar a la función addTask con el objeto taskData
        await addTask(taskData);
        console.log('Task added successfully');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },

    showModal() {
      this.modalShow = true;
    },


    async fetchTask() {
      try {
        // this.US
        // this.tasks = await getTasks(this.userId); // Supongamos que tienes el userId definido en algún lugar
        console.log('Tasks fetched successfully', this.tasks);
        return this.tasks; // Puedes retornar las tareas para usarlas en otros lugares si es necesario
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Puedes lanzar el error nuevamente para manejarlo en un nivel superior si es necesario
      }
    },
    selectGroup(value) {
      this.selectedGroup = value;
    },
    addRandomTasks() {
      // Generar 10 tareas aleatorias
      for (let i = 1; i <= 3; i++) {
        const task = {
          idTask: i,
          nameTask: `Task ${i}`,
          detailTask: `Details for Task ${i}`,
          statusTask: Math.random() < 0.5, // Generar aleatoriamente true o false
          createTask: new Date(), // Usar la fecha actual como fecha de creación
          limitTask: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Generar una fecha límite dentro de los próximos 7 días
          priorityTask: Math.random() < 0.3,// Generar aleatoriamente true (prioritario) o false
          idCategory: `${i}`,
        };
        this.tasks.push(task); // Agregar la tarea generada al array de tareas
      }
      console.log('Random tasks added successfully', this.tasks);
    },
    updateSelectedDate(date) {
      this.selectedLimitDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    },


  },
  mounted() {
    this.userId = this.getUser; // Asignar el valor de idUser a la variable userId al montar el componente
  },
  created() {
    this.fetchTask(); // Llamada a la función fetchTask al crear la instancia del componente
    this.addRandomTasks(); // Llamada a la función fetchTask al crear la instancia del componente
    this.selectedLimitDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
};
</script>
  
<style scoped>
.no-border-input .form-control {
  border: none;
  box-shadow: none;
}

.small-datepicker .datepicker-dropdown {
  font-size: 0.8rem;
  /* Ajusta el tamaño de fuente según tus necesidades */
}
</style>