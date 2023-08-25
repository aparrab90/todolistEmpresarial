<template>
    <div>
        {{ menu }}
        <div class="text-end">

            <span class="b text-primary font-weight-bold  rounded-circle h4">
                <small class="text-secondary">Tasks</small> | <span> {{ taskCount }}</span>
            </span>
        </div>
        <b-table :fields="filteredFields" :items="getTaskStore" responsive head-variant="light" class="table table-sm"
           >


            <template #cell(priorityTask)="row">
                <div class="text-center" @click="updatePriorityTask(row.item)">

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        :fill="getStarFill(row.item.priorityTask)" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                </div>
            </template>
            <template #cell(checkbox)="row">
                <div class="row">
                    <div class="col-12 d-flex justify-content-center align-items-center">
                        <div v-if="row.item.statusTask == 'false'" class="text-center">
                            <div class="form-check">
                                <input class="form-check-input form-check-input-lg" type="checkbox" variant="success"
                                    v-model="row.item.selected" style="transform: scale(2); border-radius: 5rem;"
                                    @change="handleCheckboxChange(row.item)">
                                <label class="form-check-label"></label>
                                <!-- <small>{{ reviewPriority }}</small> -->
                            </div>
                        </div>
                        <div v-else>
                            <div>
                                <b-icon icon="check-circle-fill" class="text-success h2"
                                    @click="handleCheckboxChange(row.item)"></b-icon>
                                <!-- <small>{{ reviewPriority }}</small> -->
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #cell(limitTask)="row">
                {{ formatDate(row.item.limitTask) }}
            </template>
            <template #cell(edit)="row">
                <div class="d-flex justify-content-center align-items-center">
                    <b-button @click="editTask(row.item)" variant="light">
                        <b-icon icon="pencil-square"></b-icon>
                    </b-button>
                    <!-- {{ row.item.idTask }} -->
                </div>
            </template>
            <template #cell(idTask)="row">
                <div v-if="getTaskCellClass(row.item.idTask)['ident']">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                        :fill="getTaskCellClass(row.item.idTask)['color']" class="bi bi-chevron-compact-right"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z" />
                    </svg>


                </div>
            </template>
        </b-table>


    </div>
</template>
  
<script>
import { getTasks, editStatusTask, editTaskPriority, getTasksPriority, getTasksTodo } from '@/services/api';
import { getAuthData } from '@/services/auth';
import moment from 'moment';
import { store } from "../store/index";
import { mapGetters } from 'vuex';
export default {
    name: 'TaskList',
    props: {
        menu: String,
        selectedTask: Object,
        refresh: Boolean
    },
    data() {
        return {
            internalPage: this.currentPage,
            filteredFields: [
                { key: 'priorityTask', label: '', thClass: 'col-md-1' },
                { key: 'checkbox', label: 'Done', thClass: 'text-center col-md-1', tdClass: 'text-center col-md-1' },
                { key: 'nameTask', label: 'Name', thClass: 'col-md-3' },
                { key: 'detailTask', label: 'Description', thClass: 'col-md-4' },
                { key: 'limitTask', label: 'Limit', thClass: 'col-md-3' },
                { key: 'edit', label: '', thClass: 'col-md' },
                { key: 'idTask', label: '', thClass: 'col-md' },
            ],
            tasks: [],
            perPage: 3, // Número de tareas por página
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
            menuLocal: this.menu,
            localArray: [],
            taskListStyle: '',
            reviewPriority: false,
            menuPriority: ''
        };
    },
    computed: {
        ...mapGetters('todoModule', ['getTaskStore']),
        tasksToShow() {
            const startIndex = (this.internalPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.tasks.slice(startIndex, endIndex);
        },

        idUser() {
            const authData = getAuthData();
            return authData.idUser;
        },
        taskCount() {
            return this.getTaskStore.length;
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
            await getTasks(this.$store, this.idUser);



            console.log("TODOS", this.tasks)
        },
        async fetchTaskImportant() {
            await getTasksPriority(this.$store, this.idUser);
        },
        async fetchTaskTodo() {
            await getTasksTodo(this.$store, this.idUser);
        },
        async updatePriorityTask(dataTask) {
            try {
                const oppositeStatus = dataTask.statusTask === "true" ? '"false"' : '"true"'; // Nota las comillas dobles
                const newTasks = await editTaskPriority(this.$store, dataTask.idTask, oppositeStatus);
                this.tasks = newTasks; //this.fetchTask();
            } catch (error) {
                console.error('Error updating task:', error);
            }
        },
        handleTaskAdded(userId) {
            console.log("addddd", userId)
            if (userId === this.idUser) {
                this.fetchTasks();
            }
        },
        handleCheckboxChange(item) {
            console.log("Checkbox cambiado para:", item);
            this.reviewPriority = true;

            this.updateStatusTask(item);
        },
        async updateStatusTask(dataTask) {
            console.log("new priority", dataTask)
            try {
                const oppositeStatus = dataTask.statusTask === "true" ? '"false"' : '"true"'; // Nota las comillas dobles
                const newTasks = await editStatusTask(this.$store, dataTask.idTask, oppositeStatus);
                this.tasks = newTasks; //this.fetchTask();
            } catch (error) {
                console.error('Error updating task:', error);
            }
        },
        formatDate(date) {
            return moment(date).format('ddd, D MMM [de] YYYY');
        },
        getStarFill(priority) {
            return priority === "false" ? "lightgray" : "yellow";
        },
        getTaskCellClass(idTask) {
            if (this.localArray == idTask) {
                return { ident: true, color: 'gray' };
            } else {
                return '';
            }
        },


    },
    watch: {
        internalPage(newPage) {
            this.$emit('update:currentPage', newPage);
        },
        menu(newMenuValue) {
            this.menuLocal = newMenuValue;
            this.taskListStyle = this.taskCount < 5 ? 'height: 300px; overflow-y: scroll;' : 'height: 700px; overflow-y: scroll;';

            if (this.menuLocal == 'Important') {
                this.fetchTaskImportant();
            }

            if (this.menuLocal == 'Todo') {
                this.fetchTaskTodo();
            }
            if (this.menuLocal == 'All Tasks') {
                this.fetchTask();
            }


        },
        selectedTask: {
            handler(newSelectedTask) {
                if (newSelectedTask) {
                    this.localArray = newSelectedTask.idTask;
                }
            }
        },
        refresh() {
            if (this.refresh) {
                this.fetchTaskTodo();
            }
        },
        reviewPriority: {

            handler() {

                this.menuPriority = this.menuLocal;
                console.log(this.menuLocal)
                // if (this.menuLocal == 'Important') {
                //     this.fetchTaskImportant();
                // }

                // if (this.menuLocal == 'Todo') {
                //     this.fetchTaskTodo();
                // }
                // if (this.menuLocal == 'All Tasks') {
                //     this.fetchTask();
                // }
            }
        }

    },
    mounted() {
        // this.fetchTask();

    },
    created() {
        console.log(store)
        this.fetchTaskTodo();
        // this.$root.$on('task-added', this.handleTaskAdded);
    },
};
</script>
  
<style scoped>
/* Estilos específicos de TaskListTable.vue */
</style>
