<template>
    <div>
        <b-table :items="tasks" :fields="filteredFields"  responsive head-variant="light" class="table table-sm">
            <template #cell(checkbox)="row">
                <div class="d-flex justify-content-center align-items-center">

                    <div class="form-check">
                        <input class="form-check-input form-check-input-lg" type="checkbox" v-model="row.item.selected"
                            style="transform: scale(2); border-radius: 5rem; ">
                        <!-- Ajusta el valor de scale según tu preferencia -->
                        <label class="form-check-label"></label>
                    </div>
                </div>
            </template>
            <template #cell(edit)="row">
                <div class="d-flex justify-content-center align-items-center">
                    <b-button size="sm" @click="editTask(row.item.id)" variant="light">
                        <b-icon icon="plus"></b-icon>
                    </b-button>
                </div>
            </template>
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
        perPage: Number,
        currentPage: Number,
    },
    data() {
        return {
            internalPage: this.currentPage,
            filteredFields: [
                { key: 'checkbox', label: 'Done', thClass: 'text-center' },
                { key: 'nameTask', label: 'Name' },
                { key: 'detailTask', label: 'Description' },
                { key: 'idTask', label: 'ID' },
                { key: 'statusTask', label: 'Status' },
                { key: 'limitTask', label: 'Limit' },
                { key: 'edit', label: 'Steps' },
            ],
        };
    },
    methods: {
        editTask(taskId) {
            // Emitir el evento para editar la tarea con el ID correspondiente
            this.$emit('editTask', taskId);
        },
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
