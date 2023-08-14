<template>
    <div>
        <div class="text-center m-2">
            <h2>Todos los usuarios</h2>
        </div>
        <div class="row">
            <div class="col-4" v-for="user in userList" :key="user.id">
                <b-card class="mb-2">
                    <b-card-header>{{ user.nameUser }}</b-card-header>
                    <b-card-body>
                        <p> {{ user.id }}</p>
                        <p>{{ user.identificationUser }}</p>
                        <p>{{ user.emailUser }}</p>
                        <p>{{ user.createUser }}</p>
                    </b-card-body>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
import { getUsers } from '@/services/api';
export default {
    data() {
        return {
            userList: [], // Aquí almacenaremos la lista de usuarios obtenida de la API
        };
    },
    created() {
        // Llamar a la función para obtener la lista de usuarios cuando el componente se cree
        this.fetchUserList();
    },
    methods: {
        async fetchUserList() {
            try {
                // Realizar la llamada a la API para obtener la lista de usuarios
                const userList = await getUsers();
                this.userList = userList; // Asignar la lista de usuarios a la propiedad userList
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        },
        // Resto de tus métodos
    },
};
</script>
  
<style scoped>
/* Estilos específicos del componente */
</style>
  