<template>
    <div>
        <b-navbar variant="primary" type="light" class="fixed-top ">
            <b-navbar-brand class="d-flex align-items-center justify-content-between w-100 text-light">
                <!-- Logo a la izquierda -->
                <a href="/">
                    <img src="../../assets/logoTodoList2.png" width="70" alt="Logo" class="" />
                </a>

                <!-- TodoList centrado -->
                <h4 class="text-center mx-auto">TodoList Five!</h4>
                <span v-if="isAuthenticated">Hi, {{ nameUser }}</span>
                <span v-else>Bienvenido, Invitado</span>
            </b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>
import { isAuthenticated, getAuthData } from '@/services/auth'; // Ajusta la ruta a tu ubicación

export default {
    name: 'HeaderView',
    props: {
        loggedInUser: {
            type: String,
            default: 'Invitado'
        }
    },
    computed: {
        isAuthenticated() {
            return isAuthenticated();
        },
        nameUser() {
            const authData = getAuthData();
            return authData.nameUser || this.loggedInUser;
        }
    }
};
</script>
