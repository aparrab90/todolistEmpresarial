<template>
    <form @submit.prevent="addTask">
      <input v-model="taskName" placeholder="Task Name" />
      <input v-model="taskDescription" placeholder="Task Description" />
      <button type="submit">Add Task</button>
    </form>
  </template>
  
  <script>
  import { addTask } from '@/services/api';
  
  export default {
    data() {
      return {
        taskName: '',
        taskDescription: ''
      };
    },
    methods: {
      async addTask() {
        try {
          await addTask(this.taskName, this.taskDescription);
          console.log('Task added successfully');
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  </style>
  