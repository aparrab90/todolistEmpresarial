<template>
    <div class="mt-3">
      <!-- Your task detail content here -->
      <b-card>
        <h3>Task Detail</h3>
        <b-form-group label="ID">
          <b-form-input v-model="localTask.idTask" disabled />
        </b-form-group>
        <b-form-group label="Name Task">
          <b-form-input v-model="localTask.nameTask" />
        </b-form-group>
        <b-form-group label="Detail">
          <b-form-input v-model="localTask.detailTask" />
        </b-form-group>
        <b-form-group label="Status">
          <b-form-checkbox v-model="localTask.statusTask" />
        </b-form-group>
        <!-- Other task details... -->
      </b-card>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedTask: Object // The selected task object to display details
    },
    data() {
      return {
        localTask: { ...this.selectedTask } // Copy the selectedTask into local data
      };
    },
    watch: {
      selectedTask(newSelectedTask) {
        this.localTask = { ...newSelectedTask }; // Update localTask when selectedTask changes
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles for the task detail component */
  </style>
  