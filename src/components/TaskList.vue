<template>
    <div>
        SELECCIONADO {{ menuLocal }}
        <b-table :fields="filteredFields" :items="tasks" responsive head-variant="light" class="table table-sm">
            <template #cell(checkbox)="row">
                <div class="d-flex justify-content-center align-items-center">

                    <div class="form-check">
                        <input class="form-check-input form-check-input-lg" type="checkbox" v-model="row.item.selected"
                            style="transform: scale(2); border-radius: 5rem;" @change="handleCheckboxChange(row.item)">
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
import { getTasks, editStatusTask } from '@/services/api';
import { getAuthData } from '@/services/auth';
export default {
    name: 'TaskList',
    props: {
        menu: String
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
            tasks: [],
            perPage: 2, // Número de tareas por página
            fields: [
                { key: 'idTask', label: '' },
                { key: 'nameTask', label: 'Name' },
                { key: 'detailTask', label: 'Detail' },
                { key: 'statusTask', label: 'Status' },
                { key: 'createTask', label: 'Created' },
                { key: 'limitTask', label: 'Limit' },
                { key: 'priorityTask', label: 'Priority' },
                { key: 'idCategory', label: 'Cat' }
            ],
            menuLocal: this.menu
        };
    },
    computed: {
        tasksToShow() {
            const startIndex = (this.internalPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.tasks.slice(startIndex, endIndex);
        },

        idUser() {
            const authData = getAuthData();
            return authData.idUser;
        },
    },
    methods: {
        editTask(idTask) {
            this.$emit('edit-task', idTask);
        },
        handleEditTask(task) {
            this.editTask(task);
        },
        async fetchTask() {
            const original = await getTasks(this.idUser);
            console.log("taskssss", this.menuLocal, this.tasks)

            let filteredTasks = [...original]; // Copia del array original

            if (this.menuLocal === 'Today') {
                filteredTasks = original.filter(task => task.statusTask === 'false');
            }
            if (this.menuLocal === 'Important') {
                filteredTasks = original.filter(task => task.statusTask === 'true');
            }

            this.tasks = filteredTasks;
        },

        handleTaskAdded(userId) {
            console.log("addddd", userId)
            if (userId === this.idUser) {
                // Actualizar la lista de tareas solo si el evento es para el usuario actual
                this.fetchTasks();
            }
        },
        handleCheckboxChange(item) {
            console.log("Checkbox cambiado para:", item);
            this.updateStatusTask(item);
        },
        async updateStatusTask(dataTask) {
            console.log("new priority", dataTask)
            try {
                const oppositeStatus = dataTask.statusTask === "true" ? '"false"' : '"true"'; // Nota las comillas dobles
                await editStatusTask(dataTask.idTask, oppositeStatus);
                // Por ejemplo, actualiza la lista de tareas llamando a fetchTask
                this.fetchTask(); 
                console.log('Task updated successfully');
            } catch (error) {
                console.error('Error updating task:', error);
            }
        },
    },
    watch: {
        internalPage(newPage) {
            this.$emit('update:currentPage', newPage);
        },
        menu(newMenuValue) {
            // Actualizar la variable local `menuLocal` cuando la prop `menu` cambie
            this.menuLocal = newMenuValue;
            this.fetchTask(); 
            
        }
    },
    async mounted() {
        await this.fetchTask();
    },
    created() {
        this.fetchTask();
        // Escuchar el evento 'task-added' y llamar a handleTaskAdded cuando se emite
        this.$root.$on('task-added', this.handleTaskAdded);
    },
};
</script>
  
<style scoped>
/* Estilos específicos de TaskListTable.vue */
</style>
