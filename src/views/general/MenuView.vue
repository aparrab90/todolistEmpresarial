<template>
  <div class="mt-2 bg-white">
    <!-- Renderizar los elementos del menú con clases de Bootstrap Vue -->
    <b-nav class="flex-column mt-2">
      <b-nav-item v-for="item in items" :key="item.id" @click="handleItemClick(item.name)"
        :style="{ 'background-color': selectedMenuItem === item.name ? 'whitesmoke' : '' }">
        <b-icon :icon="item.icon" :variant="item.color" class="mr-2" />
        <span class="mr-3">
          {{ item.name }}
        </span>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: {
    items: Array, // Recibe los elementos del menú como prop
    activeItem: String // Recibe el elemento activo como prop
  },
  data() {
    return {
      selectedMenuItem: 'Todo' // Variable para almacenar el elemento seleccionado
    };
  },
  methods: {
    handleItemClick(itemName) {
      // Actualizar la variable selectedMenuItem con el elemento seleccionado
      this.selectedMenuItem = itemName;

      // Emitir el evento con el nombre del elemento seleccionado
      this.$emit('selectItem', itemName);
    }
  }
};
</script>
