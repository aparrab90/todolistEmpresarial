<template>
    <div>
      <b-nav vertical class="bg-light">
        <b-nav-item
          v-for="item in items"
          :key="item.id"
          :to="item.to"
          :active="isActive(item)"
        >
          <b-icon :icon="item.icon" class="mr-2"></b-icon>
          {{ item.name }}
        </b-nav-item>
      </b-nav>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    methods: {
      isActive(item) {
        // Implementa la lógica para verificar si el elemento está activo
        // Puedes usar vue-router para obtener la ruta actual y compararla con item.to
        // Devuelve true si el elemento está activo, de lo contrario, false
        // Ejemplo simplificado:
        return this.$route.path === item.to;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del menú */
  </style>
  