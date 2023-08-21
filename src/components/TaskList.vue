<template>
    <div>
        <b-table :items="sortedTasks" :fields="filteredFields" responsive head-variant="light" class="table table-sm">
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
                    <b-button @click="editTask(row.item)" variant="outline-primary">
                        <b-icon icon="plus"></b-icon>
                    </b-button>
                    {{ row.item.idTask }}
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
        task: Object  
    },
    data() {
        return {
            internalPage: this.currentPage,
            filteredFields: [
                { key: 'checkbox', label: 'Done', thClass: 'text-center' },
                { key: 'nameTask', label: 'Name' },
                { key: 'detailTask', label: 'Description' },
                { key: 'idUser', label: 'ID' },
                { key: 'statusTask', label: 'Status' },
                { key: 'priorityTask', label: 'Priority' },
                { key: 'limitTask', label: 'Limit' },
                { key: 'edit', label: 'Steps' },
            ],
        };
    },
    computed: {
        // Computed property para obtener la matriz ordenada de tareas
        sortedTasks() {
            return this.tasks.slice().sort((taskA, taskB) => {
                // Ordenar en función de priorityTask
                if (taskA.priorityTask === taskB.priorityTask) {
                    return 0;
                } else if (taskA.priorityTask === true) {
                    return -1;
                } else {
                    return 1;
                }
            });
        },
    },

    methods: {
        editTask(idTask) {
            console.log("enviar", idTask)
            this.$emit('edit-task', idTask); // Emitir el evento 'edit-task' con la tarea seleccionada
        },
        // Agrega el método handleEditTask para emitir el evento
        handleEditTask(task) {
            this.editTask(task);
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
