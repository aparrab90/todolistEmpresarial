<template>
  <div class="mt-3">
    <b-card>
      <b-row class="text-end">
        <b-col lg="2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" :fill="getStarFill()" class="bi bi-star-fill"
            viewBox="0 0 16 16">
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </b-col>
        <b-col lg="">
          <!-- <h4>Edit Task</h4> -->
        </b-col>
        <b-col lg="5">
          <div class="m-1">
            <!-- {{ selectedGroup }} -->
            <b-form-group id="groupSelectGroup" class="sm ">
              <b-form-select v-model="localTask.idCategory" :options="groupOptions"
                class="form-select form-control"></b-form-select>
            </b-form-group>
          </div>
        </b-col>
      </b-row>
      <!-- {{ localTask }} -->
      <!-- <b-form-group label="ID">
        <b-form-input v-model="localTask.idTask" disabled />
      </b-form-group> -->
      <b-row>
        <b-col lg="12">
          <!-- <small>{{ localTask }}</small> -->
          <div class="m-1">

            <b-form-group>
              <b-form-input v-model="localTask.nameTask" class="no-border-input" />
            </b-form-group>
          </div>

        </b-col>
        <b-col lg="12">
          <div class="m-1">
            <b-form-group>
              <b-form-textarea v-model="localTask.detailTask" rows="4" />
            </b-form-group>
          </div>
        </b-col>

        <b-col lg="">
          <div class="m-1">
            Limit
            <!-- {{ selectedLimitDate }} -->
            <b-form-group id="limitTaskGroup">
              <b-form-datepicker v-model="selectedLimitDate" @input="updateSelectedDate(selectedLimitDate)"
                :min="currentDate" required placeholder="Limit Task" class="small-datepicker" />
            </b-form-group>
          </div>
        </b-col>
      </b-row>
      <b-row class="text-left">
        <b-col>
          <h4>Steps</h4>
        </b-col>
      </b-row>
      <b-form-group label="Name Step">
        <b-form-input v-model="localSteps.nameStepTask" placeholder="Name Step" />
      </b-form-group>

      <b-form-group label="Detail Step">
        <b-form-input v-model="localSteps.detailStepTask" placeholder="Detail Step" />
      </b-form-group>

      <template #footer>
        <div class="text-end">
          <b-button @click="updateTaskGeneral" variant="success">Save</b-button>
        </div>
      </template>
    </b-card>
  </div>
</template>
  
<script>
import { getAuthData } from '@/services/auth'; // Ajusta la ruta a tu ubicación
import { editTask } from '@/services/api';
import moment from 'moment';
export default {
  props: {
    selectedTask: Object // The selected task object to display details
  },
  data() {
    return {
      localTask: { ...this.selectedTask },
      localSteps:
      {
        nameStepTask: '',
        detailStepTask: '',
        statusStepTask: false,

        idTask: ''
      },
      groupOptions: [
        { value: 1, text: 'Personal' },
        { value: 2, text: 'Estudio' },
        { value: 3, text: 'Trabajo' },
        { value: 4, text: 'Viaje' },
        { value: 5, text: 'Investigación' },
      ],
      selectedGroup: 1,
      selectedLimitDate: ''
    };
  },
  computed: {

    idUser() {
      const authData = getAuthData();
      return authData.idUser;
    },
    currentDate() {
      return moment().format('YYYY-MM-DD');
    },

  },
  watch: {
    selectedTask(newSelectedTask) {
      this.localTask = { ...newSelectedTask }; // Update localTask when selectedTask changes
    },
    selectedLimitDate() {
      this.selectedLimitDate = this.localTask.limitTask
    },

  },
  methods: {
    async updateTask() {
      try {
        // Armar un objeto con todas las propiedades actualizadas
        const updatedTaskData = {
          ...this.localTask, // Copiar todas las propiedades existentes
          nameTask: this.localTask.nameTask,
          detailTask: this.localTask.detailTask,
          statusTask: this.localTask.statusTask,
          limitTask: this.localTask.limitTask, // Ejemplo de otra propiedad
          priorityTask: this.localTask.priorityTask, // Ejemplo de otra propiedad
        };
        this.$emit('task-updated', this.localTask.idTask);
        // Llamar a la función editTask con el ID de la tarea y los datos actualizados
        await editTask(this.localTask.idTask, updatedTaskData);

        // Por ejemplo, actualiza la lista de tareas llamando a fetchTask
        console.log('Task updated successfully');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },

    async updateTaskGeneral() {
      try {
        const updatedTaskData = {
          ...this.localTask,
          nameTask: this.localTask.nameTask,
          detailTask: this.localTask.detailTask,
          statusTask: this.localTask.statusTask,
          // limitTask: this.localTask.limitTask,
          priorityTask: this.localTask.priorityTask,
          idCategory: this.selectedGroup, // Agregar la propiedad idCategory
          limitTask: this.selectedLimitDate,
        };
        await editTask(this.$store, this.localTask.idTask, updatedTaskData);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },

    getStarFill() {
      this.selectedLimitDate = this.localTask.limitTask,
        this.selectedGroup = this.localTask.idCategory;
      return this.localTask.priorityTask === "false" ? "lightgray" : "yellow";
    },
    updateSelectedDate(date) {
      console.log("new valor limit", date)
      this.localTask.limitTask = date;
    },

  },
};
</script>
  
<style scoped>
/* Styles for the task detail component */
</style>
  