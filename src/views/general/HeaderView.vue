<template>
    <div>
        <b-navbar variant="white" type="primary" class="fixed-top shadow">
            <b-navbar-brand class="d-flex align-items-center justify-content-between w-100 text-primary ">
                <div style="margin-left: 20px !important;">
                    <a href="/">
                        <img src="../../assets/logoTodoList2.png" width="70" alt="Logo" class="" />
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                            class="bi bi-ui-checks-grid" viewBox="0 0 16 16">
                            <path
                                d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z" />
                        </svg> -->
                    </a>
                </div>
                <h4 class="text-center mx-auto">TodoList Five!</h4>
                <div v-if="isAuthenticated">
                    <b-row>
                        <b-col class="mt-1">
                            <span><small class="text-muted"> Welcome,</small> {{ nameUser }}</span>
                        </b-col>
                        <b-col>

                            <div class="text-center">
                                <img src="../../assets/login.png" alt="" width="30">
                            </div>
                        </b-col>
                    </b-row>

                </div>

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
        },
        idUser() {
            const authData = getAuthData();
            return authData.idUser || this.loggedInUser;
        }
    }
};
</script>
