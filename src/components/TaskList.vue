<template>
    <div>
        <b-table :items="tasks" :fields="fields" striped bordered responsive head-variant="light" class="table table-sm">
            <!-- ... Resto de las columnas ... -->
        </b-table>
        <b-pagination v-model="internalPage" :total-rows="tasks.length" :per-page="perPage"
            aria-controls="my-table"></b-pagination>
    </div>
</template>
  
<script>
export default {
    name: 'TaskList',
    props: {
        tasks: Array,
        fields: Array,
        perPage: Number,
        currentPage: Number,
    },
    data() {
        return {
            internalPage: this.currentPage,
        };
    },
    watch: {
        internalPage(newPage) {
            this.$emit('update:currentPage', newPage);
        },
    },
};
</script>
  
<style scoped>
/* Estilos específicos de TaskListTable.vue */
</style>
  