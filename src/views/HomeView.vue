<template>
    <div id="app">
        <!-- Header -->
        <HeaderView />
        <br>
        <!-- Body -->
        <div class="container-fluid d-flex flex-column pt-4" style="height: 90vh;">
            <div class="row flex-grow-1">
                <div class="col-lg-8 bg-white d-flex justify-content-center align-items-center">
                    <div class="row text-center">

                        <div class="col-12">
                            <span class="lead">¡Organiza tus actividades!</span>

                        </div>
                        <div class="col-12">

                            <b-button variant="primary">Empezar</b-button>
                        </div>
                    </div>
                    <!-- <SliderHome /> -->
                </div>

                <div class="col-lg-4 p-3 ">
                    <b-tabs>
                        <b-tab title="Login">
                            <LoginInicial />
                        </b-tab>
                        <b-tab title="Register">
                            <RegisterView />
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <FooterView class="fixed-bottom bg-primary text-light"></FooterView>

    </div>
</template>
  
<script>
import LoginInicial from './LoginView.vue'
import RegisterView from './RegisterView.vue';
// import SliderHome from './SliderHome.vue';
import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';

export default {
    name: 'App',
    components: {
        LoginInicial,
        RegisterView,
        FooterView,
        HeaderView,
        // SliderHome
    }
}
</script>
<style lang="scss">
@import "@/styles/inicio.scss";
</style>
  
  