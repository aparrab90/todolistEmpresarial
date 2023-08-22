<template>
  <div class="mt-3">
    <b-card>
      {{ idUser }}
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

    </b-card>

  </div>
</template>
  
<script>
import { addTask } from '@/services/api';
import { getAuthData } from '@/services/auth'; // Ajusta la ruta a tu ubicación
import moment from 'moment';

export default {
  data() {
    return {


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
      selectedTask: null,
    };
  },
  computed: {
    idUser() {
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
          statusTask: 'false',
          limitTask: this.selectedLimitDate,
          priorityTask: 'false',
          idUser: this.idUser,
          idCategory: this.selectedGroup,
        };

        // await addTask(taskData); // Agregar la tarea a la API
        this.$emit('update-task', this.idUser);
        // Emitir el evento personalizado al agregar una tarea, pasando la lista actualizada
        const updatedTasks = await addTask(taskData); // Agregar la tarea y obtener la nueva lista
        this.$emit('task-added', updatedTasks);
        console.log('Task added successfully', this.idUser);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },




    selectGroup(value) {
      this.selectedGroup = value;
    },

    updateSelectedDate(date) {
      this.selectedLimitDate = moment(date).toISOString();
    },
    handleEditTask(task) {
      this.selectedTask = task; // Al hacer clic en "Editar", almacena la tarea seleccionada
      // Emitir el evento a UserDashboard para mostrar el detalle de la tarea
      this.$emit('show-task-detail', this.selectedTask);
    },

  },

  async mounted() {

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