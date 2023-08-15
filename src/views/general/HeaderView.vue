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
                <!-- <span v-if="loggedInUser" class="ml-auto">Welcome, {{ loggedInUser }}</span> -->
            </b-navbar-brand>
        </b-navbar>
    </div>
</template>
  
<script>
export default {
    name: 'HeaderView',
    props: {
        loggedInUser: {
            type: String,
            default: 'SN'
        }
    }
};
</script>
  