<template>
  <div class="mt-3">
    <b-card>
      <b-row class="text-center">
        <b-col lg="6">
          <h3>Task Detail</h3>
        </b-col>
        <b-col lg="6">
          <b-button variant="light" @click="updatePriorityTask(localTask.priorityTask)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" :fill="getStarFill()" class="bi bi-star-fill"
              viewBox="0 0 16 16">
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </b-button>
        </b-col>
      </b-row>
      <!-- {{ localTask }} -->
      <b-form-group label="ID">
        <b-form-input v-model="localTask.idTask" disabled />
      </b-form-group>
      <b-form-group label="Name Task">
        <b-form-input v-model="localTask.nameTask" class="no-border-input" />
      </b-form-group>
      <b-form-group label="Detail">
        <b-form-input v-model="localTask.detailTask" />
      </b-form-group>
      <template #footer>
        <div class="text-end">
          <b-button @click="updateTask">Update Task</b-button>
        </div>
      </template>
    </b-card>
  </div>
</template>
  
<script>
import { getAuthData } from '@/services/auth'; // Ajusta la ruta a tu ubicación
import { editTask, editTaskPriority } from '@/services/api';
export default {
  props: {
    selectedTask: Object // The selected task object to display details
  },
  data() {
    return {
      localTask: { ...this.selectedTask } 
      
    };
  },
  computed: {

    idUser() {
      const authData = getAuthData();
      return authData.idUser;
    },


  },
  watch: {
    selectedTask(newSelectedTask) {
      this.localTask = { ...newSelectedTask }; // Update localTask when selectedTask changes
    }
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
    async updatePriorityTask(newPriority) {
      console.log("new priority", newPriority)
      try {
        const oppositePriority = newPriority === "true" ? '"false"' : '"true"'; // Nota las comillas dobles
        await editTaskPriority(this.localTask.idTask, oppositePriority);
        // Por ejemplo, actualiza la lista de tareas llamando a fetchTask
        console.log('Task updated successfully');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    getStarFill() {
      return this.localTask.priorityTask === "false" ? "lightgray" : "yellow";
    }
  },
};
</script>
  
<style scoped>
/* Styles for the task detail component */
</style>
  