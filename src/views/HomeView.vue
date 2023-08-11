<template>
    <div id="app">
      <!-- Header -->
      <b-navbar variant="light" type="light">
        <b-navbar-brand class="mx-auto d-flex align-items-center">Welcome</b-navbar-brand>
      </b-navbar>
  
      <!-- Body -->
      <div class="container ">
        <div class="row">
          <!-- Parte izquierda con frase -->
          <div class="col-lg-8 bg-primary">
            <p class="lead">¡Organiza tus actividades!</p>
            <b-button variant="primary">Empezar</b-button>
          </div>
  
          <!-- Parte derecha con tab: login y register -->
          <div class="col-lg-4">
            <b-tabs pills>
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
      <FooterView class="fixed-bottom bg-light text-light" ></FooterView>
     
    </div>
</template>
  
<script>
import LoginInicial from './LoginView.vue'
import RegisterView from './RegisterView.vue';
import FooterView from './FooterView.vue';

export default {
    name: 'App',
    components: {
        LoginInicial,
        RegisterView,
        FooterView
    }
}
</script>
<style lang="scss">
@import "@/styles/inicio.scss";
</style>
  
  